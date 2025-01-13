import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOptions } from "./_constants/quick-search";
import BookingItem from "./_components/booking-item";
import FormatedTitle from "./_components/formated-title";
import Search from "./_components/search";
import GreetingItem from "./_components/greeting-item";
import Link from "next/link";

const Home = async () => {
    const barbershop = await db.barbershop.findMany({});
    const popularBarbershop = await db.barbershop.findMany({
        orderBy: {
            name: "desc",
        },
    });

    return (
        <div>
            <Header />
            <div className="p-5">
                {/* SAUDAÇÃO */}
                <GreetingItem />

                {/* PESQUISA */}
                <div className="mt-6">
                    <Search />
                </div>

                {/* BUSCA RÁPIDA */}
                <div className="mt-6 flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {quickSearchOptions.map((option) => (
                        <Button
                            key={option.label}
                            variant="secondary"
                            className="gap-2 px-5"
                            asChild
                        >
                            <Link href={`/barbershops?service=${option.label}`}>
                                <Image
                                    src={option.icon}
                                    height={16}
                                    width={16}
                                    alt={`icone de ${option.label}`}
                                />
                                {option.label}
                            </Link>
                        </Button>
                    ))}
                </div>

                {/* BANNER */}
                <div className="relative mt-6 h-[150px] w-full">
                    <Image
                        src="/banner-01.png"
                        alt="Agende nos melhores com FSW Barber banner"
                        fill
                        className="rounded-xl object-cover"
                    />
                </div>

                {/* AGENDAMENTOS */}
                <FormatedTitle title="Agendamentos" />
                <BookingItem />

                {/* BARBEARIAS */}
                <FormatedTitle title="Recomendados" />
                <div className="flex flex-row gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {barbershop.map((barbershop) => (
                        <BarbershopItem
                            key={barbershop.id}
                            barbershop={barbershop}
                        />
                    ))}
                </div>

                {/* POPULARES */}
                <FormatedTitle title="Populares" />
                <div className="flex flex-row gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {popularBarbershop.map((barbershop) => (
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

export default Home;

// TODO: Implementar ranking de barbearias
