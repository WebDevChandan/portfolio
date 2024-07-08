import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // console.log(request.nextUrl.pathname)
    const pathname = request.nextUrl.pathname;
    const headers = new Headers(request.headers);
    headers.set('x-pathname', pathname);
    
    return NextResponse.next({
        request: {
            headers,
        },
    });
    //   return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
    matcher: ['/dashboard/:path*'],
}