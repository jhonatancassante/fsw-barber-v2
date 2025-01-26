"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

interface CreateBookingParams {
    userId: string;
    serviceId: string;
    date: Date;
}

export const createBooking = async (params: CreateBookingParams) => {
    const session = await getServerSession(authOptions);

    if (!session) throw new Error("Usuário não autenticado!");

    if (session.user.id !== params.userId)
        throw new Error("Usuário não autorizado!");

    await db.booking.create({
        data: params,
    });

    revalidatePath("/pages/barbershops/[id]");
    revalidatePath("/pages/bookings");
};
