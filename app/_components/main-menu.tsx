"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { signOut, useSession } from "next-auth/react";
import {
    CalendarIcon,
    ChevronDown,
    LogInIcon,
    LogOutIcon,
    UserIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import SignInDialog from "./sign-in-dialog";
import { adminRole } from "../_constants/roles";
import { quickSearchOptions } from "../_constants/quick-search";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import { Separator } from "./ui/separator";
import MenuButton from "./menu-button";

const MainMenu = () => {
    const { data } = useSession();
    const DROPDOWN_MENU_STYLE =
        "flex flex-row items-center gap-3 text-base cursor-pointer py-3 px-6";
    const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const handleServiceMenuClick = () => {
        setIsServiceMenuOpen(!isServiceMenuOpen);
    };

    const handleProfileMenuClick = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const handleSingOutClick = () => signOut();

    return (
        <div className="flex items-center">
            <MenuButton href="/pages/home">Início</MenuButton>

            <DropdownMenu
                open={isServiceMenuOpen}
                onOpenChange={handleServiceMenuClick}
            >
                <MenuButton>
                    <DropdownMenuTrigger>
                        Serviços
                        <ChevronDown
                            className={`relative top-[1px] ml-1 h-3 w-3 transition duration-300 ${isServiceMenuOpen ? "rotate-180" : ""}`}
                            aria-hidden="true"
                        />
                    </DropdownMenuTrigger>
                </MenuButton>
                <DropdownMenuContent onMouseLeave={handleServiceMenuClick}>
                    {quickSearchOptions.map((option) => (
                        <Link
                            href={`/pages/barbershops?service=${option.label}`}
                            key={option.label}
                            legacyBehavior
                            passHref
                        >
                            <DropdownMenuItem className={DROPDOWN_MENU_STYLE}>
                                <Image
                                    src={option.icon}
                                    height={18}
                                    width={18}
                                    alt={`icone de ${option.label}`}
                                />
                                {option.label}
                            </DropdownMenuItem>
                        </Link>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            {data?.user.role === adminRole && (
                <MenuButton href="/pages/admin">Administração</MenuButton>
            )}

            <Separator orientation="vertical" className="w-5" />

            {data?.user ? (
                <DropdownMenu
                    open={isProfileMenuOpen}
                    onOpenChange={handleProfileMenuClick}
                >
                    <DropdownMenuTrigger asChild>
                        <Avatar className="h-[40px] w-[40px] cursor-pointer">
                            <AvatarImage
                                src={
                                    data?.user?.image ??
                                    "/avatar-placeholder.jpg"
                                }
                            />
                            <AvatarFallback>
                                {data?.user?.name ? data.user.name[0] : "A"}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="relative right-10"
                        onMouseLeave={handleProfileMenuClick}
                    >
                        <DropdownMenuLabel className="flex items-center justify-center px-6 text-lg font-bold">
                            {data.user.name}
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href="/pages/profile" legacyBehavior passHref>
                            <DropdownMenuItem className={DROPDOWN_MENU_STYLE}>
                                <UserIcon size={24} />
                                Perfil
                            </DropdownMenuItem>
                        </Link>
                        <Link href="/pages/bookings" legacyBehavior passHref>
                            <DropdownMenuItem className={DROPDOWN_MENU_STYLE}>
                                <CalendarIcon size={24} />
                                Agendamentos
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className={DROPDOWN_MENU_STYLE}
                            onClick={handleSingOutClick}
                        >
                            <LogOutIcon size={18} />
                            Sair da Conta
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            Login
                            <LogInIcon />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="w=[90%] rounded-lg">
                        <SignInDialog />
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default MainMenu;
