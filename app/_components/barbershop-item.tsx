import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";

interface BarbershopItemProps {
    barbershop: {
        id: string;
        name: string;
        address: string;
        phones: string[];
        description: string;
        imageUrl: string;
        averageRating: number;
        amountRatings: number;
        createdAt: Date;
        updatedAt: Date;
    };
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
    return (
        <Card className="min-w-[167px] rounded-2xl p-2">
            <CardContent className="p-0">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={`/pages/barbershops/${barbershop.id}`}>
                                <div className="relative h-[159px] w-full">
                                    <Image
                                        src={barbershop.imageUrl}
                                        fill
                                        sizes="159px"
                                        className="rounded-2xl object-cover"
                                        alt={`Imagem da barbearia ${barbershop.name}`}
                                    />

                                    <Badge
                                        className="absolute left-2 top-2 z-10 space-x-1 rounded-xl"
                                        variant="secondary"
                                    >
                                        <StarIcon
                                            size={12}
                                            className="fill-primary text-primary"
                                        />
                                        <p className="text-xs">
                                            {Number(
                                                barbershop.averageRating,
                                            ).toFixed(1)}
                                        </p>
                                    </Badge>
                                </div>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent className="w-52">
                            <p className="text-center">
                                {`Clique para ir a página da barbearia
                                ${barbershop.name} e ver os serviços disponíveis.`}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <div className="pt-3">
                    <h3 className="truncate font-semibold">
                        {barbershop.name}
                    </h3>
                    <p className="truncate text-sm text-gray-400">
                        {barbershop.address}
                    </p>
                    <Button variant="secondary" className="mt-3 w-full" asChild>
                        <Link href={`/pages/barbershops/${barbershop.id}`}>
                            Reservar
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default BarbershopItem;
