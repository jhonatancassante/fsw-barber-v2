"use client";

import { Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import BookingSummary from "./booking-summary";
import PhoneItem from "./phone-item";
import { Button, buttonVariants } from "./ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";
import { cn } from "../_lib/utils";
import { deleteBooking } from "../_actions/delete-booking";
import { toast } from "sonner";
import { useState } from "react";

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: { service: { include: { barbershop: true } } };
    }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const isFinished = isPast(booking.date);
    const {
        service: { barbershop },
    } = booking;

    const handleSheetOpendChange = (isOpen: boolean) => setIsSheetOpen(isOpen);

    const handleCancelBooking = async () => {
        try {
            await deleteBooking(booking.id);
            setIsSheetOpen(false);
            toast.success("Agendamento cancelado com sucesso!");
        } catch (error) {
            console.log(error);
            toast.error("Não foi possível cancelar o agendamento!");
        }
    };

    return (
        <Sheet open={isSheetOpen} onOpenChange={handleSheetOpendChange}>
            <SheetTrigger asChild>
                <Card>
                    <CardContent className="flex justify-between p-0">
                        <div className="flex flex-col gap-2 py-5 pl-5">
                            <Badge
                                className="w-fit rounded-xl"
                                variant={isFinished ? "secondary" : "default"}
                            >
                                {isFinished ? "Finalizado" : "Confirmado"}
                            </Badge>
                            <h3 className="font-semibold">
                                {booking.service.name}
                            </h3>
                            <div className="flex gap-2">
                                <Avatar className="h-6 w-6">
                                    <AvatarImage
                                        src={barbershop.imageUrl}
                                        alt="Avatar"
                                    />
                                </Avatar>
                                <p className="text-sm">{barbershop.name}</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 border-l-2 border-solid px-5">
                            <p className="text-sm capitalize">
                                {format(booking.date, "MMMM", {
                                    locale: ptBR,
                                })}
                            </p>
                            <p className="text-2xl">
                                {format(booking.date, "dd", {
                                    locale: ptBR,
                                })}
                            </p>
                            <p className="text-sm">
                                {format(booking.date, "HH':'mm", {
                                    locale: ptBR,
                                })}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </SheetTrigger>
            <SheetContent className="w-[80%]">
                <SheetHeader className="border-b border-solid pb-6 text-left">
                    <SheetTitle>Informações da Reserva</SheetTitle>
                    <SheetDescription>
                        Verifique as informações da sua reserva.
                    </SheetDescription>
                </SheetHeader>

                <div className="relative flex h-[180px] w-full items-end">
                    <Image
                        src="/map.png"
                        fill
                        className="rounded-xl object-cover"
                        alt={`Mapa da barbearia ${barbershop.name}`}
                    />
                    <Card className="z-10 mx-5 mb-3 w-full">
                        <CardContent className="flex items-center gap-3 px-5 py-3">
                            <Avatar>
                                <AvatarImage src={barbershop.imageUrl} />
                            </Avatar>
                            <div className="flex flex-col gap-1">
                                <h3 className="font-bold">{barbershop.name}</h3>
                                <p className="text-xs">{barbershop.address}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mb-3 mt-6">
                    <Badge
                        className="w-fit rounded-xl"
                        variant={isFinished ? "secondary" : "default"}
                    >
                        {isFinished ? "Finalizado" : "Confirmado"}
                    </Badge>
                </div>

                <BookingSummary
                    serviceName={booking.service.name}
                    price={Number(booking.service.price)}
                    date={booking.date}
                    barbershopName={barbershop.name}
                />

                <div className="mt-6 space-y-3">
                    {barbershop.phones.map((phone, index) => (
                        <PhoneItem key={`${index}-${phone}`} phone={phone} />
                    ))}
                </div>

                <SheetFooter className="mt-6">
                    <div className="flex items-center justify-between gap-3">
                        <SheetClose asChild>
                            <Button variant={"secondary"} className="w-full">
                                Voltar
                            </Button>
                        </SheetClose>
                        {!isFinished && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant={"destructive"}
                                        className="w-full"
                                    >
                                        Cancelar Reserva
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="w-[90%] rounded-xl">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Você quer cancelar sua reserva?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Você tem certeza que deseja
                                            realmente fazer o cancelamento? Essa
                                            ação não poderá ser revertida.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="flex flex-row items-center gap-3">
                                        <AlertDialogCancel className="m-0 w-full">
                                            Cancelar
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            className={`${cn(
                                                buttonVariants({
                                                    variant: "destructive",
                                                }),
                                            )} m-0 w-full`}
                                            onClick={handleCancelBooking}
                                        >
                                            Confirmar
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default BookingItem;

// TODO: 01:48:00
