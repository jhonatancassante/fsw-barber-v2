"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { revalidatePath } from "next/cache";
import { updateBarbershopRate } from "./update-barbershop-rate";

export const updateRatings = async (
    barbershopId: string,
    rate: number,
): Promise<void> => {
    const session = await getServerSession(authOptions);

    if (!session) throw new Error("Usuário não autenticado!");

    const barbershopRating = await db.barbershopRating.findFirst({
        where: {
            userId: session.user.id,
            barbershopId: barbershopId,
        },
    });

    if (barbershopRating) {
        await db.barbershopRating.update({
            where: {
                id: barbershopRating.id,
            },
            data: {
                rating: rate,
            },
        });
    } else {
        await db.barbershopRating.create({
            data: {
                barbershopId: barbershopId,
                userId: session.user.id,
                rating: rate,
            },
        });
    }

    await updateBarbershopRate(barbershopId);

    revalidatePath("/pages/barbershops/[id]", "page");
};
