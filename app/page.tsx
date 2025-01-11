import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import greeting from "./_utils/greeting";
import { quickSearchOptions } from "./_constants/quick-search";
import BookingItem from "./_components/booking-item";
import FormatedTitle from "./_components/formated-title";

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
                <h2 className="text-xl font-bold">
                    {`${greeting()}, Jhonatan!`}
                </h2>
                <p>Quinta-feira, 9 de janeiro de 2025.</p>

                {/* PESQUISA */}
                <div className="mt-6 flex flex-row items-center gap-2">
                    <Input placeholder="Pesquisar" id="search" />
                    <Button>
                        <SearchIcon />
                    </Button>
                </div>

                {/* BUSCA RÁPIDA */}
                <div className="mt-6 flex gap-3 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {quickSearchOptions.map((option) => (
                        <Button
                            key={option.label}
                            variant="secondary"
                            className="gap-2 px-5"
                        >
                            <Image
                                src={option.icon}
                                height={16}
                                width={16}
                                alt={`icone de ${option.label}`}
                            />
                            {option.label}
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
