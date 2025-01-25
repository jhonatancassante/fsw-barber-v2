"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "../../_components/header";

const ProfilePage = () => {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session?.user) {
            router.push("/pages/home");
        }
    }, [session, router]);

    if (!session) {
        return <p>Usuário não logado!</p>;
    }

    return (
        <div>
            <Header />
            <h1>Página de perfil</h1>
            <p>Bem-vindo, usuário!</p>
            {/* Adicione aqui o conteúdo da página de administração */}
        </div>
    );
};

export default ProfilePage;
