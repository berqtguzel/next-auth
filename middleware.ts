import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        const isLoggedIn = !!token;
        const isAdmin = token?.role === "admin";

        // /admin sayfası sadece admin rolü olanlara açık
        if (pathname.startsWith("/admin")) {
          return isAdmin;
        }

        // Diğer tüm sayfalarda login yeterli
        return isLoggedIn;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/admin/:path*"],
};
