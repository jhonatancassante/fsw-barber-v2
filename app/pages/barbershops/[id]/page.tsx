import { getBarbershop } from "@/app/_data/get-barbershop";
import FormatedTitle from "@/app/_components/formated-title";
import PhoneItem from "@/app/_components/phone-item";
import ServiceItem from "@/app/_components/service-item";
import SidebarSheet from "@/app/_components/sidebar-sheet";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getConcludedBookings } from "@/app/_data/get-concluded-bookings";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/app/_components/ui/dialog";
import RateDialog from "@/app/_components/rate-dialog";
import Header from "@/app/_components/header";

interface BarbershopPageProps {
    params: Promise<{ id: string }>;
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    const barbershop = await getBarbershop(id);
    const concludedBookings = await getConcludedBookings();

    if (!barbershop) return notFound();

    const hasBooking =
        session &&
        concludedBookings.some(
            (booking) =>
                booking.service.barbershop.id === id &&
                booking.userId === session?.user.id,
        );

    const userRating = barbershop?.ratings?.find(
        (rating) => rating.userId === session?.user.id,
    );

    return (
        <div>
            {/* IMAGEM */}
            <div className="relative h-[250px] w-full lg:h-auto">
                <div className="block lg:hidden">
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
                        <Link href="/pages/home">
                            <ChevronLeftIcon />
                        </Link>
                    </Button>

                    <SidebarSheet>
                        <Button
                            size="icon"
                            className="absolute right-4 top-4"
                            variant="secondary"
                        >
                            <MenuIcon />
                        </Button>
                    </SidebarSheet>
                </div>
                <div className="z-10 hidden lg:block">
                    <Header />
                    <div className="px-28">
                        <div className="relative h-[300px]">
                            <Image
                                src={barbershop.imageUrl}
                                fill
                                sizes="300px"
                                className="object-cover"
                                alt={`Imagem da barbearia ${barbershop.name}`}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5 lg:px-28">
                <div className="grid grid-cols-1 gap-4 border-solid lg:grid-cols-2 lg:border-b">
                    <div>
                        {/* NOME E ENDEREÇO */}
                        <div className="flex flex-col gap-2 border-b border-solid py-5">
                            <h1 className="mb-1 text-xl font-bold">
                                {barbershop.name}
                            </h1>

                            <div className="flex items-center gap-2">
                                <MapPinIcon
                                    className="text-primary"
                                    size={18}
                                />
                                <p className="text-sm">{barbershop.address}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <StarIcon
                                    className="fill-primary text-primary"
                                    size={18}
                                />
                                <p className="text-sm">
                                    {`${Number(barbershop.averageRating).toFixed(1)}
                            (${barbershop.amountRatings}
                            avaliaç${barbershop.amountRatings === 1 ? "ão" : "ões"})`}
                                </p>
                                {hasBooking ? (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                size={"sm"}
                                                className="px-2 py-1 text-xs"
                                            >
                                                {userRating
                                                    ? "Avaliado"
                                                    : "Avaliar"}
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="w-[90%] rounded-lg">
                                            <RateDialog
                                                barbershopId={barbershop.id}
                                                rating={Number(
                                                    userRating?.rating,
                                                )}
                                            />
                                        </DialogContent>
                                    </Dialog>
                                ) : null}
                            </div>
                        </div>

                        {/* DESCRIÇÃO */}
                        <div className="border-b border-solid py-5 lg:border-none">
                            <FormatedTitle title="Sobre nós" className="mt-0" />
                            <p className="text-sm">{barbershop.description}</p>
                        </div>
                    </div>

                    {/* CONTATO */}
                    <div className="space-y-3 border-b border-solid py-5 lg:border-none">
                        {barbershop.phones.map((phone) => (
                            <PhoneItem key={phone} phone={phone} />
                        ))}
                    </div>
                </div>
            </div>

            {/* SERVIÇOS */}
            <div className="border-b border-solid p-5 lg:px-28">
                <FormatedTitle title="Serviços" className="mt-0" />
                <div className="grid grid-cols-1 gap-2">
                    {barbershop.services.map(
                        (service: {
                            name: string;
                            id: string;
                            description: string;
                            imageUrl: string;
                            price: number;
                            barbershopId: string;
                            createdAt: Date;
                            updatedAt: Date;
                        }) => (
                            <ServiceItem
                                key={service.id}
                                barbershop={barbershop}
                                service={service}
                            />
                        ),
                    )}
                </div>
            </div>
        </div>
    );
};

export default BarbershopPage;
