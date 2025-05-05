import { revokeAllSession } from "@/app/server/cookies.action";
import { isFirebaseAuthError } from "@/utils/firebaseAuthError";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get('session')?.value as string;

        if (!session)
            return Response.json({ errorMessage: "Session not found!" }, { status: 404 });

        cookieStore.delete('session');

        const hasAllSessionRevoked = await revokeAllSession(session).catch((error) => {
            console.log("Error Revoking AllSession" + error);
            return Response.json({ errorMessage: "Logout Failed!" }, { status: 401 });
        });

        if (!hasAllSessionRevoked)
            return Response.json({ errorMessage: "Logout Failed!" }, { status: 401 });

        console.log("hasAllSessionRevoked: ", hasAllSessionRevoked);


        return Response.json({ message: "Logout Successful" }, { status: 200 });

    } catch (error) {
        if (isFirebaseAuthError(error)) {
            console.log("Firebase Auth Error: ", error.code);
            return Response.json({ errorMessage: "Internal Server Error" }, { status: 503 });
        }
        return Response.json({ errorMessage: "Internal Server Error" }, { status: 503 });
    }
}