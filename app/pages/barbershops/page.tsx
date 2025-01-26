import { notFound } from "next/navigation";
import BarbershopItem from "../../_components/barbershop-item";
import FormatedTitle from "../../_components/formated-title";
import Header from "../../_components/header";
import Search from "../../_components/search";
import { getBarbershopsSearch } from "@/app/_data/get-barbershops-search";

interface BarbershopsPageProps {
    searchParams: Promise<{
        name?: string;
        service?: string;
    }>;
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
    const { name, service } = await searchParams;

    if (!name && !service) return notFound();

    const barbershops = await getBarbershopsSearch(name, service);

    return (
        <div>
            <Header />
            <div className="p-5 lg:px-28">
                <Search />
                <FormatedTitle title={`Resultados para "${name ?? service}"`} />
                <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
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
