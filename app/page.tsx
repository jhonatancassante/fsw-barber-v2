import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./_components/ui/card";
import { Badge } from "./_components/ui/badge";
import { Avatar, AvatarImage } from "./_components/ui/avatar";

const Home = () => {
    return (
        <div>
            <Header />
            <div className="p-5">
                <h2 className="text-xl font-bold">Bom dia, Jhonatan!</h2>
                <p>Quinta-feira, 9 de janeiro de 2025.</p>

                <div className="mt-6 flex flex-row items-center gap-2">
                    <Input placeholder="Pesquisar" />
                    <Button>
                        <SearchIcon />
                    </Button>
                </div>

                <div className="relative mt-6 h-[150px] w-full">
                    <Image
                        src="/banner-01.png"
                        alt="Agende nos melhores com FSW Barber banner"
                        fill
                        className="rounded-xl object-cover"
                    />
                </div>

                <Card className="mt-6">
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
            </div>
        </div>
    );
};

export default Home;
