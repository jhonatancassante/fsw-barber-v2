import { FC, ReactNode } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface MenuButtonProps {
    children: ReactNode;
    className?: string;
    href?: string;
}

const MenuButton: FC<MenuButtonProps> = ({ children, className, href }) => {
    return (
        <Button
            variant={"ghost"}
            className={`h-[40px] rounded-none px-5 py-6 text-base uppercase ${className}`}
            asChild
        >
            {href ? <Link href={href}>{children}</Link> : children}
        </Button>
    );
};

export default MenuButton;
