"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";

export const getConfirmedBookings = async () => {
    const session = await getServerSession(authOptions);

    if (!session) return [];

    const user = session.user;

    const bookings = await db.booking.findMany({
        where: {
            userId: user.id,
            date: {
                gte: new Date(),
            },
        },
        include: {
            service: { include: { barbershop: true } },
        },
        orderBy: {
            date: "asc",
        },
    });

    if (bookings.length === 0) return [];

    return bookings.map((booking) => {
        return {
            ...booking,
            service: {
                ...booking.service,
                price: Number(booking.service.price),
            },
        };
    });
};
