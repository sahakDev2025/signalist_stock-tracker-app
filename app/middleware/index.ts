import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
const sessionCookie = getSessionCookie(request);

 // Check cookie presence - prevents obviously unauthorized users
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up|assets).*)',
  ],
};

// import { NextRequest, NextResponse } from "next/server";
// import { getSessionCookie } from "better-auth/cookies";

// export async function middleware(request: NextRequest) {
//   const sessionCookie = getSessionCookie(request);
//   const pathname = request.nextUrl.pathname;

//   if (sessionCookie && (pathname === "/sign-in" || pathname === "/sign-up")) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   if (!sessionCookie && !["/sign-in", "/sign-up", "/favicon.ico"].includes(pathname) && !pathname.startsWith("/_next")) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   return NextResponse.next();
// }
