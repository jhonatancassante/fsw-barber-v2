import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import SidebarSheet from "./sidebar-sheet";
import Link from "next/link";

const Header = () => {
    return (
        <Card className="rounded-none shadow-md">
            <CardContent className="flex flex-row items-center justify-between p-5">
                <Link href={"/"}>
                    <Image
                        src="/logo.png"
                        alt="logo FSW Barber"
                        width={120}
                        height={20}
                    />
                </Link>
                <SidebarSheet>
                    <Button size="icon" variant="outline">
                        <MenuIcon />
                    </Button>
                </SidebarSheet>
            </CardContent>
        </Card>
    );
};

export default Header;
