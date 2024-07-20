import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the request is for the login page
    const isLoginPage = pathname === '/login' || pathname.startsWith('/login/');

    try {
        const jwtCookie = request.cookies.get("jwt");

        if (!jwtCookie) {
            if (!isLoginPage) {
                return NextResponse.redirect(new URL('/login', request.url));
            }
            return NextResponse.next();
        }

        const jwt = jwtCookie.value;
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jose.jwtVerify(jwt, secret);

        if (!payload.id || !payload.firstName || !payload.lastName || !payload.email) {
            if (!isLoginPage) {
                return NextResponse.redirect(new URL('/login', request.url));
            }
            return NextResponse.next();
        }

        // Redirect from login page to dashboard if already authenticated
        if (isLoginPage && payload) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        return NextResponse.next();

    } catch (error) {
        if (!isLoginPage) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/login/:path*'],
};
