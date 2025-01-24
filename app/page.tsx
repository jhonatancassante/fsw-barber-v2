"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingIndicator from "./_components/loading-indicator";

const Home = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        router.push("/pages/home");
        setIsLoading(true);
    }, [router]);

    return <>{isLoading ? <LoadingIndicator /> : null}</>;
};

export default Home;

// TODO: Implementar ranking de barbearias
// TODO: 01:17:00
