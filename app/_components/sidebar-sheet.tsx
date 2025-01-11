import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon } from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import { quickSearchOptions } from "../_constants/quick-search";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

interface SidebarSheetProps {
    children: ReactNode;
}

const SidebarSheet = ({ children }: SidebarSheetProps) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>

                <div className="flex flex-row items-center gap-3 border-b border-solid py-5">
                    <Avatar>
                        <AvatarImage src="/avatar-placeholder.jpg" />
                    </Avatar>
                    <div>
                        <p className="text-sm font-semibold">
                            Jhonatan Cassante
                        </p>
                        <p className="text-xs text-gray-400">
                            jhonatan.cassante@live.com
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 border-b border-solid py-5">
                    <SheetClose asChild>
                        <Button
                            className="justify-start gap-2"
                            variant={"ghost"}
                            asChild
                        >
                            <Link href="/">
                                <HomeIcon size={18} />
                                Início
                            </Link>
                        </Button>
                    </SheetClose>
                    <Button className="justify-start gap-2" variant={"ghost"}>
                        <CalendarIcon size={18} />
                        Agendamentos
                    </Button>
                </div>

                <div className="flex flex-col gap-2 border-b border-solid py-5">
                    {quickSearchOptions.map((option) => (
                        <Button
                            className="justify-start gap-2"
                            variant={"ghost"}
                            key={option.label}
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
                <div className="flex flex-col gap-2 py-5">
                    <Button className="justify-start gap-2" variant={"ghost"}>
                        <LogOutIcon size={18} />
                        Sair da Conta
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default SidebarSheet;
