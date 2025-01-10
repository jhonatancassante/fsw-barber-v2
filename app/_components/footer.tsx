import { Card, CardContent } from "./ui/card";

const Footer = () => {
    return (
        <footer>
            <Card className="flex h-full w-full justify-center rounded-none px-5 py-6">
                <CardContent className="p-0">
                    <p className="text-sm text-gray-400">
                        &copy; 2023 Copyright <strong>FSW Barber</strong>
                    </p>
                </CardContent>
            </Card>
        </footer>
    );
};

export default Footer;
