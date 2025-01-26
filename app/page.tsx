"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingIndicator from "./_components/loading-indicator";

const Home = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/pages/home");
    }, [router]);

    return <LoadingIndicator />;
};

export default Home;
