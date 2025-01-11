import FormatedTitle from "@/app/_components/formated-title";
import PhoneItem from "@/app/_components/phone-item";
import ServiceItem from "@/app/_components/service-item";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const BarbershopPage = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;

    const barbershop = await db.barbershop.findUnique({
        where: { id: id },
        include: { services: true },
    });

    if (!barbershop) {
        return notFound();
    }

    return (
        <div>
            {/* IMAGEM */}
            <div className="relative h-[250px] w-full">
                <Image
                    src={barbershop.imageUrl}
                    fill
                    sizes="250px"
                    className="object-cover"
                    alt={`Imagem da barbearia ${barbershop.name}`}
                    priority
                />
                <Button
                    size="icon"
                    className="absolute left-4 top-4"
                    variant="secondary"
                    asChild
                >
                    <Link href="/">
                        <ChevronLeftIcon />
                    </Link>
                </Button>
                <Button
                    size="icon"
                    className="absolute right-4 top-4"
                    variant="secondary"
                >
                    <MenuIcon />
                </Button>
            </div>

            {/* NOME E ENDEREÇO */}
            <div className="flex flex-col gap-2 border-b border-solid p-5">
                <h1 className="mb-1 text-xl font-bold">{barbershop.name}</h1>
                <div className="flex items-center gap-2">
                    <MapPinIcon className="text-primary" size={18} />
                    <p className="text-sm">{barbershop.address}</p>
                </div>

                <div className="flex items-center gap-2">
                    <StarIcon className="fill-primary text-primary" size={18} />
                    <p className="text-sm">5,0 (889 avaliações)</p>
                </div>
            </div>

            {/* DESCRIÇÃO */}
            <div className="border-b border-solid p-5">
                <FormatedTitle title="Sobre nós" className="mt-0" />
                <p className="text-sm">{barbershop.description}</p>
            </div>

            {/* SERVIÇOS */}
            <div className="border-b border-solid p-5">
                <FormatedTitle title="Serviços" className="mt-0" />
                <div className="grid grid-cols-1 gap-2">
                    {barbershop.services.map((service) => (
                        <ServiceItem key={service.id} service={service} />
                    ))}
                </div>
            </div>

            {/* CONTATO */}
            <div className="space-y-3 p-5">
                {barbershop.phones.map((phone) => (
                    <PhoneItem key={phone} phone={phone} />
                ))}
            </div>
        </div>
    );
};

export default BarbershopPage;
