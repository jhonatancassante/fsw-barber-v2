import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import SidebarSheet from "./sidebar-sheet";

const Header = () => {
    return (
        <Card className="rounded-none shadow-md">
            <CardContent className="flex flex-row items-center justify-between p-5">
                <Image
                    src="/logo.png"
                    alt="logo FSW Barber"
                    width={120}
                    height={20}
                />
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
