"use server";

import { db } from "../_lib/prisma";

export const getAllBarbershops = async () => {
    const barbershops = await db.barbershop.findMany({});

    return barbershops.map((barbershop) => ({
        ...barbershop,
        averageRating: Number(barbershop.averageRating),
    }));
};
