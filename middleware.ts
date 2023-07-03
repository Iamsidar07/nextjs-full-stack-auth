import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // first grab the pathname from request
    const pathname = request.nextUrl.pathname;

    // check if it is public path (/login, /signup)
    const isPublicPath = pathname === '/login' || pathname === '/signup';

    // get the token from request
    const token = request.cookies.get('token')?.value || '';

    // if there is public path and have token then can not access this public path
    if (isPublicPath && token) {
        // redirect to home page
        return NextResponse.redirect(new URL('/', request.url));
    }

    // if there is no public path and there is no token then redirect to login

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login',request.url));
    }


}

export const config = {
    matcher: [
        '/',
        '/login',
        '/profile/:path*',
        '/signup'
    ],
}