
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (!session) {
        const registerUrl = new URL("/register", request.url);

        registerUrl.searchParams.set(
            "callbackURL",
            request.nextUrl.pathname + request.nextUrl.search
        );

        return NextResponse.redirect(registerUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/add-book",
        "/my-books/:path*",
        "/my-borrows",
        "/books/:path*",
    ],
};
