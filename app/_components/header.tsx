import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import SidebarSheet from "./sidebar-sheet";
import Link from "next/link";
import MainMenu from "./main-menu";

const Header = () => {
    return (
        <Card className="rounded-none shadow-md">
            <CardContent className="flex flex-row items-center justify-between p-5 lg:px-28">
                <Link href={"/pages/home"}>
                    <Image
                        src="/logo.png"
                        alt="logo FSW Barber"
                        width={120}
                        height={20}
                        className="lg:h-[40px] lg:w-auto"
                    />
                </Link>
                <div className="block lg:hidden">
                    <SidebarSheet>
                        <Button size="icon" variant="outline">
                            <MenuIcon />
                        </Button>
                    </SidebarSheet>
                </div>
                <div className="hidden lg:block">
                    <MainMenu />
                </div>
            </CardContent>
        </Card>
    );
};

export default Header;
