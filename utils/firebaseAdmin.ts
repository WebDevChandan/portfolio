import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const firebaseSingleton = () => {
    if (getApps().length > 0) {
        return getAuth();
    }

    const admin = initializeApp({
        credential: cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: `${process.env.FIREBASE_PRIVATE_KEY}`.replace(/\\n/g, '\n'),
        }),
    });

    const authAdmin = getAuth(admin);

    return authAdmin;
}

declare global {
    var firebaseGlobal: undefined | ReturnType<typeof firebaseSingleton>
}

const authAdmin = globalThis.firebaseGlobal ?? firebaseSingleton()

export default authAdmin

if (process.env.NODE_ENV !== 'production') globalThis.firebaseGlobal = authAdmin