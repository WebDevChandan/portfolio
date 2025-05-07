'use server';
import { cookies } from "next/headers";
import { revokeAllSession } from "./cookies.action";
import { isFirebaseAuthError } from "@/utils/firebaseAuthError";

type LoginState = {
    message?: string;
    errorMessage?: string;
}

export async function logout(): Promise<LoginState> {
     try {
            const cookieStore = await cookies();
            const session = cookieStore.get('session')?.value as string;
    
            if (!session)
                return { errorMessage: "Session not found!" };
    
            cookieStore.delete('session');
    
            const hasAllSessionRevoked = await revokeAllSession(session).catch((error) => {
                console.log("Error Revoking AllSession" + error);
                return { errorMessage: "Logout Failed!" };
            });
    
            if (!hasAllSessionRevoked)
                return { errorMessage: "Logout Failed!" };

            return { message: "Logout Successful!" };
    
        } catch (error) {
            if (isFirebaseAuthError(error)) {
                console.log("Firebase Auth Error: ", error.code);
                return { errorMessage: error.code };
            }
            
            console.log("Error: ", error);
            return { errorMessage: "Internal Server Error" };
        }

}