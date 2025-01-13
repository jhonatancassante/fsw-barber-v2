import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminRole } from "./app/_constants/roles";

export async function middleware(request: NextRequest) {
    const secret = process.env.NEXTAUTH_SECRET;
    const token = await getToken({ req: request, secret });

    console.log("JSON Web Token", token?.role);

    if (request.nextUrl.pathname.startsWith("/admin")) {
        // Verificar se o token está presente e se a role é "admin"
        if (!token || token.role !== adminRole) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    // Permite a requisição continuar se o token estiver presente e a role for "admin"
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin"],
};
