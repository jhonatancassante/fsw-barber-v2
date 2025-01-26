"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";

export const getConcludedBookings = async () => {
    const session = await getServerSession(authOptions);

    if (!session) return [];

    const bookings = await db.booking.findMany({
        where: {
            userId: session.user.id,
            date: {
                lt: new Date(),
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
            date: "desc",
        },
        take: 10,
    });

    return bookings.map((booking) => ({
        ...booking,
        service: {
            ...booking.service,
            price: Number(booking.service.price),
        },
    }));
};
