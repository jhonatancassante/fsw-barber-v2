import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
    return (
        <Card className="rounded-none shadow-md">
            <CardContent className="flex flex-row items-center justify-between p-5">
                <Image
                    src="/logo.png"
                    alt="logo FSW Barber"
                    width={120}
                    height={18}
                />
                <Button size="icon" variant="outline">
                    <MenuIcon />
                </Button>
            </CardContent>
        </Card>
    );
};

export default Header;
