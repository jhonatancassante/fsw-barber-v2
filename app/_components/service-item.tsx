import { BarbershopService } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface ServiceItemProps {
    service: BarbershopService;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
    return (
        <Card>
            <CardContent className="p-3">
                <div className="flex flex-row items-center gap-3">
                    <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
                        <Image
                            src={service.imageUrl}
                            fill
                            sizes="110px"
                            alt={`Imagem do serviço ${service.name}`}
                            className="rounded-lg object-cover"
                        />
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-gray-400">
                            {service.description}
                        </p>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-primary">
                                {Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(Number(service.price))}
                            </p>

                            <Button variant={"secondary"} size={"sm"}>
                                Reservar
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ServiceItem;
