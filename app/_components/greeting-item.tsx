"use client";

import { useSession } from "next-auth/react";
import greeting from "../_utils/greeting";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const GreetingItem = () => {
    const { data } = useSession();
    const name = data?.user?.name?.split(" ");

    return (
        <div>
            <h2 className="text-xl font-bold">
                {greeting() + (name ? `, ${name[0]}!` : `!`)}
            </h2>
            <p>
                <span className="capitalize">
                    {format(new Date(), "EEEE", {
                        locale: ptBR,
                    })}
                </span>
                {format(new Date(), "', 'dd' de 'MMMM'.'", {
                    locale: ptBR,
                })}
            </p>
        </div>
    );
};

export default GreetingItem;
