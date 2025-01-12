import BarbershopItem from "../_components/barbershop-item";
import FormatedTitle from "../_components/formated-title";
import Header from "../_components/header";
import Search from "../_components/search";
import { db } from "../_lib/prisma";

interface BarbershopsPageProps {
    searchParams: {
        search?: string;
    };
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
    const { search } = await searchParams;

    if (!search) return <h1>Nenhum nome de barbearia foi digitado.</h1>;

    const barbershops = await db.barbershop.findMany({
        where: {
            name: {
                contains: search,
                mode: "insensitive",
            },
        },
    });

    return (
        <div>
            <Header />
            <div className="p-5">
                <Search />
                <FormatedTitle title={`Resultados para "${search}"`} />
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
