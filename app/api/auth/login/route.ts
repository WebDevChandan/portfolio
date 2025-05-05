import { verifyCSRFToken } from "@/app/server/auth.action";
import { createSessionCookie, getCookieToken } from "@/app/server/cookies.action";
import { firebaseConfig } from "@/utils/firebaseConfig";
import { isFirebaseAuthError } from "@/utils/firebaseAuthError";
import { getApps, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { cookies } from "next/headers";
import validator from 'validator';

export async function POST(req: Request) {
    try {
        const csrfCookie = await getCookieToken('csrf');

        const { email, password, clientCSRFToken } = await req.json();

        const errors: string[] = [];

        // Validation
        const validationSchema = [
            {
                valid: validator.isLength(email, { min: 10 }),
                errorMessage: "Invalid Email",
            },
            {
                valid: validator.isEmail(email),
                errorMessage: "Invalid email format",
            },
            {
                valid: validator.isStrongPassword(password),
                errorMessage: "Password must be strong",
            },
        ];

        validationSchema.forEach(check => {
            if (!check.valid) errors.push(check.errorMessage);
        });

        if (errors.length > 0) {
            return Response.json({ errorMessage: errors[0] }, { status: 401 });
        }

        // CSRF PROTECTION
        const isValidCSRFToken = await verifyCSRFToken(clientCSRFToken, csrfCookie);
        if (!isValidCSRFToken) {
            return Response.json({ errorMessage: "CSRF Expolition Found" }, { status: 401 });
        }

        // Initialize Firebase
        if (getApps().length === 0) {
            initializeApp(firebaseConfig);
        }

        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const { claims } = await user.getIdTokenResult();

        // Check admin  verification
        if (claims.user_id !== process.env.ADMIN_USER_UID || !claims.email_verified || !claims.isAdmin) {
            return Response.json({ errorMessage: "Unauthorized Access!" }, { status: 401 });
        }

        const idToken = await user.getIdToken();

        const expiresIn = 60 * 60 * 2 * 1000; // 2 hours in ms
        const sessionCookie = await createSessionCookie(idToken, expiresIn);

        const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };
        (await cookies()).set('session', sessionCookie, {
            ...options,
            sameSite: "strict",
        });

        return Response.json({ message: "Login Successful" }, { status: 200 });

    } catch (error) {
        if (isFirebaseAuthError(error)) {
            if (["auth/invalid-email", "auth/invalid-password", "auth/invalid-credential"].includes(error.code)) {
                return Response.json({ errorMessage: "Invalid email or password" }, { status: 401 });
            }

            if (["auth/too-many-requests"].includes(error.code)) {
                return Response.json({ errorMessage: "Too Many Requests" }, { status: 403 });
            }
        }

        return Response.json({ errorMessage: "Internal Server Error" }, { status: 503 });
    }
}