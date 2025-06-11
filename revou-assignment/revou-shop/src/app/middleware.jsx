import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    
    if (req.nextUrl.pathname.startsWith('/admin') && req.nextauth.token?.role !== 'admin') {
     
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
       
        return !!token;
      },
    },
    pages: {
      signIn: '/login', 
    },
  }
);


export const config = {
  matcher: ['/checkout', '/admin/:path*'], 