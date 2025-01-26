"use server";

import { db } from "../_lib/prisma";

export const getBarbershopsSearch = async (name?: string, service?: string) => {
    const barbershops = await db.barbershop.findMany({
        where: {
            OR: [
                name
                    ? {
                          name: {
                              contains: name,
                              mode: "insensitive",
                          },
                      }
                    : {},
                service
                    ? {
                          services: {
                              some: {
                                  name: {
                                      contains: service,
                                      mode: "insensitive",
                                  },
                              },
                          },
                      }
                    : {},
            ],
        },
    });

    return barbershops.map((barbershop) => ({
        ...barbershop,
        averageRating: Number(barbershop.averageRating),
    }));
};
