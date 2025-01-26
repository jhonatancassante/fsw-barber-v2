"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";

export const getConfirmedBookings = async () => {
    const session = await getServerSession(authOptions);

    if (!session) return [];

    const bookings = await db.booking.findMany({
        where: {
            userId: session.user.id,
            date: {
                gte: new Date(),
            },
        },
        include: {
            service: {
                include: {
                    barbershop: true,
                },
            },
        },
        orderBy: {
            date: "asc",
        },
    });

    return bookings.map((booking) => ({
        ...booking,
        service: {
            ...booking.service,
            price: Number(booking.service.price),
            barbershop: {
                ...booking.service.barbershop,
                averageRating: Number(booking.service.barbershop.averageRating),
            },
        },
    }));
};
