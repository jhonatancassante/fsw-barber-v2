import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Esse middleware verifica a presença do cookie 'next-auth.session-token'
// e redireciona se ele não estiver presente.

export function middleware(request: NextRequest) {
    const sessionToken = request.cookies.get("next-auth.session-token");

    if (request.nextUrl.pathname.startsWith("/admin")) {
        // Se não houver token, redirecionar para a página inicial
        if (!sessionToken) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    // Permite a requisição continuar se o token estiver presente
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin"],
};
