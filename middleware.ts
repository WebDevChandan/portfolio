import * as jose from 'jose';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const returnUrl = encodeURIComponent(request.nextUrl.pathname);

    const isLoginPage = decodeURIComponent(returnUrl) === '/login';

    try {
        const sessionCookies = await cookies();
        const sessionToken = sessionCookies.get('session')?.value as string;

        if (!sessionToken) {
            if (!isLoginPage) {
                return NextResponse.redirect(new URL(`/login?returnUrl=${returnUrl}`, request.url));
            }
            return NextResponse.next();
        }

        const { alg, kid } = jwt.decode(sessionToken, { complete: true })?.header as { alg: string, kid: string };

        if (!alg || !kid) {
            if (!isLoginPage) {
                return NextResponse.redirect(new URL(`/login?returnUrl=${returnUrl}`, request.url));
            }
            return NextResponse.next();
        }

        const publicKeysResponse = await fetch('https://www.googleapis.com/identitytoolkit/v3/relyingparty/publicKeys');
        const publicKeys = await publicKeysResponse.json();

        const x509Cert = publicKeys[kid];

        if (!x509Cert) {
            if (!isLoginPage) {
                return NextResponse.redirect(new URL(`/login?returnUrl=${returnUrl}`, request.url));
            }
            return NextResponse.next();
        }

        const publicKey = await jose.importX509(x509Cert, alg);

        const { payload } = await jose.jwtVerify(sessionToken, publicKey, {
            issuer: `https://session.firebase.google.com/${process.env.FIREBASE_PROJECT_ID}`,
            audience: process.env.FIREBASE_PROJECT_ID,
        });

        if (!payload.email_verified && payload.user_id !== process.env.ADMIN_USER_UID && !payload.isAdmin) {
            if (!isLoginPage) {
                return NextResponse.redirect(new URL(`/login?returnUrl=${returnUrl}`, request.url));
            }
            return NextResponse.next();
        }


        // Redirect from login page to dashboard if already authenticated
        if (isLoginPage && payload.email_verified && payload.user_id === process.env.ADMIN_USER_UID && payload.isAdmin) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        return NextResponse.next();

    } catch (error) {
        if (!isLoginPage) {
            return NextResponse.redirect(new URL(`/login?returnUrl=${returnUrl}`, request.url));
        }
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/login/:path*'],
};
