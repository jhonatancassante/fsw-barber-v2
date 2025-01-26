"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "../../_components/header";

const AdminPage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session?.user || session.user.role !== "admin") {
            router.push("/pages/home");
        }
    }, [session, router]);

    if (!session) {
        return <p>Usuário não logado!</p>;
    }

    if (session?.user && session.user.role !== "admin") {
        return <p>Usuário não autorizado!</p>;
    }

    return (
        <div>
            <Header />
            <div className="p-5 lg:px-28">
                <h1>Página de Administração</h1>
                <p>Bem-vindo, administrador!</p>
            </div>
        </div>
    );
};

export default AdminPage;
