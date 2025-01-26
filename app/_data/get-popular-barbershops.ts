"use server";

import { db } from "../_lib/prisma";

export const getPopularBarbershops = async () => {
    const barbershops = await db.barbershop.findMany({
        orderBy: {
            name: "desc",
        },
        include: {
            services: {
                include: {
                    bookings: true,
                },
            },
        },
    });

    const barbershopsWithCount = barbershops.map((barbershop) => {
        const bookingCount = barbershop.services.reduce(
            (total, service) => total + service.bookings.length,
            0,
        );
        return {
            ...barbershop,
            averageRating: Number(barbershop.averageRating),
            bookingCount,
        };
    });

    barbershopsWithCount.sort((a, b) => b.bookingCount - a.bookingCount);

    return barbershopsWithCount;
};
