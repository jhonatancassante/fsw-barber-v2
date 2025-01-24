"use server";

import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { revalidatePath } from "next/cache";

export const deleteBooking = async (bookingId: string) => {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Usuário não logado!");
    const user = session.user;

    await db.booking.delete({
        where: {
            id: bookingId,
            userId: user.id,
        },
    });

    revalidatePath("/pages/bookings");
};
