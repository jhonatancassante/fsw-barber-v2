"use server";

import { db } from "../_lib/prisma";

export const updateBarbershopRate = async (barbershopId: string) => {
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: barbershopId,
        },
        include: {
            ratings: true,
        },
    });

    if (!barbershop) return;

    const ratings = barbershop.ratings || [];
    const totalRatings = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating =
        ratings.length > 0 ? (totalRatings / ratings.length).toFixed(1) : 0;

    await db.barbershop.update({
        where: {
            id: barbershopId,
        },
        data: {
            averageRating: averageRating,
            amountRatings: ratings.length,
        },
    });
};
