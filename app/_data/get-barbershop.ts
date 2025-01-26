"use server";

import { db } from "../_lib/prisma";

export const getBarbershop = async (id: string) => {
    const barbershop = await db.barbershop.findUnique({
        where: { id: id },
        include: {
            services: true,
            rating: true,
        },
    });

    if (!barbershop) return;

    const ratings = barbershop.rating || [];
    const totalRatings = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating =
        ratings.length > 0 ? (totalRatings / ratings.length).toFixed(1) : 0;

    return {
        ...barbershop,
        services: barbershop.services.map((service) => ({
            ...service,
            price: Number(service.price),
        })),
        averageRating,
        amountRatings: ratings.length,
    };
};
