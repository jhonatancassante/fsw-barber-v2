"use client";

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
import Header from "../_components/header";

const AdminPage = () => {
    // const { data: session } = useSession();
    // const router = useRouter();

    // useEffect(() => {
    //     if (!session?.user || session.user.role !== "admin") {
    //         router.push("/");
    //     }
    // }, [session, router]);

    // if (!session) {
    //     return <p>Carregando...</p>;
    // }

    // if (session?.user && session.user.role !== "admin") {
    //     return null;
    // }

    return (
        <div>
            <Header />
            <h1>Página de Administração</h1>
            <p>Bem-vindo, administrador!</p>
            {/* Adicione aqui o conteúdo da página de administração */}
        </div>
    );
};

export default AdminPage;
