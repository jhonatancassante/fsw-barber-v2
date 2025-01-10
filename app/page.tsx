import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarImage } from "./_components/ui/avatar";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import Footer from "./_components/footer";
import greeting from "./_lib/greeting";

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
                    <Button variant="secondary" className="gap-2 px-5">
                        <Image
                            src="/cabelo.svg"
                            height={16}
                            width={16}
                            alt="icone de cabelo"
                        />
                        Cabelo
                    </Button>
                    <Button variant="secondary" className="gap-2 px-5">
                        <Image
                            src="/barba.svg"
                            height={16}
                            width={16}
                            alt="icone de barba"
                        />
                        Barba
                    </Button>
                    <Button variant="secondary" className="gap-2 px-5">
                        <Image
                            src="/acabamento.svg"
                            height={16}
                            width={16}
                            alt="icone de acabamento"
                        />
                        Acabamento
                    </Button>
                    <Button variant="secondary" className="gap-2 px-5">
                        <Image
                            src="/hidratacao.svg"
                            height={16}
                            width={16}
                            alt="icone de hidratacao"
                        />
                        Hidratação
                    </Button>
                    <Button variant="secondary" className="gap-2 px-5">
                        <Image
                            src="/massagem.svg"
                            height={16}
                            width={16}
                            alt="icone de massagem"
                        />
                        Massagem
                    </Button>
                    <Button variant="secondary" className="gap-2 px-5">
                        <Image
                            src="/sobrancelha.svg"
                            height={16}
                            width={16}
                            alt="icone de sobrancelha"
                        />
                        Sobrancelha
                    </Button>
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
                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                    Agendamentos
                </h2>
                <Card>
                    <CardContent className="flex justify-between p-0">
                        <div className="flex flex-col gap-2 py-5 pl-5">
                            <Badge className="w-fit rounded-xl">
                                Confirmado
                            </Badge>
                            <h3 className="font-semibold">Corte de Cabelo</h3>
                            <div className="flex">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage
                                        src="https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png"
                                        alt="Avatar"
                                    />
                                </Avatar>
                                <p className="text-sm">Barbearia FSW</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 border-l-2 border-solid px-5">
                            <p className="text-sm">Agosto</p>
                            <p className="text-2xl">05</p>
                            <p className="text-sm">20:00</p>
                        </div>
                    </CardContent>
                </Card>

                {/* BARBEARIAS */}
                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                    Recomendados
                </h2>
                <div className="flex flex-row gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {barbershop.map((barbershop) => (
                        <BarbershopItem
                            key={barbershop.id}
                            barbershop={barbershop}
                        />
                    ))}
                </div>

                {/* POPULARES */}
                <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
                    Populares
                </h2>
                <div className="flex flex-row gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {popularBarbershop.map((barbershop) => (
                        <BarbershopItem
                            key={barbershop.id}
                            barbershop={barbershop}
                        />
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Home;
