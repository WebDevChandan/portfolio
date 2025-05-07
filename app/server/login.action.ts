'use server';
import { isFirebaseAuthError } from '@/utils/firebaseAuthError';
import { firebaseConfig } from '@/utils/firebaseConfig';
import { getApps, initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { cookies } from 'next/headers';
import { z, ZodError } from 'zod';
import { createSessionCookie } from './cookies.action';

const loginFormSchema = z.object({
    email: z.string({
        invalid_type_error: 'Invalid Email',
    })
        .email({ message: 'Invalid Email' })
        .endsWith('@gmail.com', { message: 'Invalid Email' }),

    password: z.string({
        invalid_type_error: 'Invalid Password',
    })
        .min(8, { message: 'Invalid Password' })
        .max(20, { message: 'Invalid Password' })
        .refine((password) => /[A-Z]/.test(password), {
            message: "Invalid Password",
        })
        .refine((password) => /[a-z]/.test(password), {
            message: "Invalid Password",
        })
        .refine((password) => /\d/.test(password), {
            message: "Invalid Password",
        })
        .refine((password) => /[@$!%*?&]/.test(password), {
            message: "Invalid Password",
        })
})

type LoginState = {
    message?: string;
    errorMessage?: string;
}

export async function login(prevState: LoginState, formData: FormData): Promise<LoginState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) return { errorMessage: "Email and Password are required" };

    try {
        const validatedFields = loginFormSchema.safeParse({
            email: email,
            password: password,
        })

        if (!validatedFields.success) {
            if (validatedFields.error instanceof ZodError) {
                return { errorMessage: validatedFields.error.errors[0].message };
            }
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
            return { errorMessage: "Unauthorized Access!" };
        }

        const idToken = await user.getIdToken();

        const expiresIn = 60 * 60 * 2 * 1000; // 2 hours in ms
        const sessionCookie = await createSessionCookie(idToken, expiresIn);

        const options = { maxAge: expiresIn, httpOnly: true, secure: true, path: '/' };
        (await cookies()).set('session', sessionCookie, {
            ...options,
            sameSite: "strict",
        });

        return { message: "Login Successful" };

    } catch (error) {
        if (isFirebaseAuthError(error)) {
            if (["auth/invalid-email", "auth/invalid-password", "auth/invalid-credential"].includes(error.code)) {
                return { errorMessage: "Invalid email or password" };
            }

            if (["auth/too-many-requests"].includes(error.code)) {
                return { errorMessage: "Too Many Requests" };
            }
        }

        return { errorMessage: "Internal Server Error" };
    }

}