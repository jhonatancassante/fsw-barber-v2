import { notFound } from "next/navigation";
import BarbershopItem from "../_components/barbershop-item";
import FormatedTitle from "../_components/formated-title";
import Header from "../_components/header";
import Search from "../_components/search";
import { db } from "../_lib/prisma";

interface BarbershopsPageProps {
    searchParams: Promise<{
        name?: string;
        service?: string;
    }>;
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
    const { name, service } = await searchParams;

    if (!name && !service) return notFound();

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

    return (
        <div>
            <Header />
            <div className="p-5">
                <Search />
                <FormatedTitle title={`Resultados para "${name ?? service}"`} />
                <div className="mb-6 grid grid-cols-2 gap-4">
                    {barbershops.map((barbershop) => (
                        <BarbershopItem
                            key={barbershop.id}
                            barbershop={barbershop}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BarbershopsPage;
