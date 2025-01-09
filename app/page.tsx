import { SearchIcon } from "lucide-react";
import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import { Input } from "./_components/ui/input";
import Image from "next/image";

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
            </div>
        </div>
    );
};

export default Home;
