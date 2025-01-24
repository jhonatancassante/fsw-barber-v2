"use client";

import { Button } from "./ui/button";
import {
    CalendarIcon,
    FileSlidersIcon,
    HomeIcon,
    LogInIcon,
    LogOutIcon,
} from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import { quickSearchOptions } from "../_constants/quick-search";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { signOut, useSession } from "next-auth/react";
import { adminRole } from "../_constants/roles";
import SignInDialog from "./sign-in-dialog";

interface SidebarSheetProps {
    children: ReactNode;
}

const SidebarSheet = ({ children }: SidebarSheetProps) => {
    const { data } = useSession();
    const handleSingOutClick = () => signOut();

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-left">Menu</SheetTitle>
                    <SheetDescription className="text-left">
                        Acesse rapidamente as principais funcionalidades
                    </SheetDescription>
                </SheetHeader>

                <div className="border-b border-solid py-5">
                    {data?.user ? (
                        <div className="flex flex-row items-center gap-3">
                            <Avatar>
                                <AvatarImage
                                    src={
                                        data?.user?.image ??
                                        "/avatar-placeholder.jpg"
                                    }
                                />
                            </Avatar>
                            <div>
                                <p className="text-sm font-semibold">
                                    {data?.user?.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {data?.user?.email}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-row items-center justify-between gap-3">
                            <h2 className="font-bold">Olá, faça seu login!</h2>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size={"icon"}>
                                        <LogInIcon />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="w=[90%] rounded-lg">
                                    <SignInDialog />
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-2 border-b border-solid py-5">
                    <SheetClose asChild>
                        <Button
                            className="justify-start gap-2"
                            variant={"ghost"}
                            asChild
                        >
                            <Link href="/pages/home">
                                <HomeIcon size={18} />
                                Início
                            </Link>
                        </Button>
                    </SheetClose>
                    <SheetClose asChild>
                        <Button
                            className="justify-start gap-2"
                            variant={"ghost"}
                            asChild
                        >
                            <Link href="/pages/bookings">
                                <CalendarIcon size={18} />
                                Agendamentos
                            </Link>
                        </Button>
                    </SheetClose>
                    {data?.user.role === adminRole && (
                        <SheetClose asChild>
                            <Button
                                className="justify-start gap-2"
                                variant={"ghost"}
                                asChild
                            >
                                <Link href={"/pages/admin"}>
                                    <FileSlidersIcon size={18} />
                                    Administração
                                </Link>
                            </Button>
                        </SheetClose>
                    )}
                </div>

                <div className="flex flex-col gap-2 border-b border-solid py-5">
                    {quickSearchOptions.map((option) => (
                        <SheetClose key={option.label} asChild>
                            <Button
                                className="justify-start gap-2"
                                variant={"ghost"}
                                asChild
                            >
                                <Link
                                    href={`/pages/barbershops?service=${option.label}`}
                                >
                                    <Image
                                        src={option.icon}
                                        height={16}
                                        width={16}
                                        alt={`icone de ${option.label}`}
                                    />
                                    {option.label}
                                </Link>
                            </Button>
                        </SheetClose>
                    ))}
                </div>
                {data?.user && (
                    <div className="flex flex-col gap-2 py-5">
                        <Button
                            className="justify-start gap-2"
                            variant={"ghost"}
                            onClick={handleSingOutClick}
                        >
                            <LogOutIcon size={18} />
                            Sair da Conta
                        </Button>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};

export default SidebarSheet;
