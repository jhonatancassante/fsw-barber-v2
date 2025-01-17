import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";

export const getConcludedBookings = async () => {
    const session = await getServerSession(authOptions);

    if (!session) return [];

    const user = session.user;

    const bookings = await db.booking.findMany({
        where: {
            userId: user.id,
            date: {
                lt: new Date(),
            },
        },
        include: {
            service: { include: { barbershop: true } },
        },
        orderBy: {
            date: "desc",
        },
        take: 10,
    });

    if (bookings.length === 0) return [];

    return bookings;
};
