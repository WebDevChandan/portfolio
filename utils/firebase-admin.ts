import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { cert } from "firebase-admin/app";
import serviceAccount from '../constant/firebase/serviceAccountKey.json';
import type { ServiceAccount } from "firebase-admin";

const firebaseSingleton = () => {
    const admin = initializeApp({
        credential: cert(serviceAccount as ServiceAccount),
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