"use server";

import { endOfDay, startOfDay } from "date-fns";
import { db } from "../_lib/prisma";

interface GetBookingsProps {
    serviceId: string;
    date: Date;
}

export const getBookings = async ({ date, serviceId }: GetBookingsProps) => {
    return await db.booking.findMany({
        where: {
            AND: [
                {
                    date: {
                        lte: endOfDay(date),
                        gte: startOfDay(date),
                    },
                },
                {
                    serviceId: serviceId,
                },
            ],
        },
    });
};
