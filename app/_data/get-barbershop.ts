"use server";

import { db } from "../_lib/prisma";

export const getBarbershop = async (id: string) => {
    const barbershop = await db.barbershop.findUnique({
        where: { id: id },
        include: {
            services: true,
            ratings: true,
        },
    });

    if (!barbershop) return;

    return {
        ...barbershop,
        services: barbershop.services.map((service) => ({
            ...service,
            price: Number(service.price),
        })),
        averageRating: Number(barbershop.averageRating),
    };
};
