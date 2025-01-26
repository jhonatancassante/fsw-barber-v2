"use server";

import { db } from "../_lib/prisma";

export const getRecommendedBarbershops = async () => {
    const barbershops = await db.barbershop.findMany({
        orderBy: {
            averageRating: "desc",
        },
    });

    return barbershops.map((barbershop) => ({
        ...barbershop,
        averageRating: Number(barbershop.averageRating),
    }));
};
