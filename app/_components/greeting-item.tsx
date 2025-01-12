"use client";

import { useSession } from "next-auth/react";
import greeting from "../_utils/greeting";

const GreetingItem = () => {
    const { data } = useSession();
    const name = data?.user?.name?.split(" ");

    return (
        <div>
            <h2 className="text-xl font-bold">
                {greeting() + (name ? `, ${name[0]}!` : `!`)}
            </h2>
            <p>Quinta-feira, 9 de janeiro de 2025.</p>
        </div>
    );
};

export default GreetingItem;
