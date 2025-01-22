"use client";

import { Barbershop, BarbershopService, Booking } from "@prisma/client";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import { set } from "date-fns";
import { useSession } from "next-auth/react";
import { createBooking } from "../_actions/create-booking";
import { toast } from "sonner";
import { getBookings } from "../_actions/get-bookings";
import { Dialog, DialogContent } from "./ui/dialog";
import SignInDialog from "./sign-in-dialog";
import { getTimeList } from "../_utils/get-time-list";
import BookingSummary from "./booking-summary";

interface ServiceItemProps {
    service: BarbershopService;
    barbershop: Pick<Barbershop, "name">;
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
    const { data } = useSession();
    const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false);
    const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string | undefined>(
        undefined,
    );
    const [dayBookings, setDayBookings] = useState<Booking[]>([]);

    const timeList = useMemo(() => {
        if (!selectedDay) return [];
        return getTimeList(dayBookings, selectedDay);
    }, [dayBookings, selectedDay]);

    useEffect(() => {
        const fetch = async () => {
            if (!selectedDay) return;
            const bookings = await getBookings({
                date: selectedDay,
                serviceId: service.id,
            });
            setDayBookings(bookings);
        };
        fetch();
    }, [selectedDay, service.id]);

    const handleSignInDialogOpen = () =>
        setSignInDialogIsOpen(!signInDialogIsOpen);

    const handleBookingSheetOpen = () => {
        setBookingSheetIsOpen(!bookingSheetIsOpen);
        setSelectedDay(undefined);
        setSelectedTime(undefined);
        setDayBookings([]);
    };

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedTime(undefined);
        setSelectedDay(date);
    };

    const handleTimeSelect = (time: string | undefined) => {
        setSelectedTime(time);
    };

    const handleCreateBooking = async () => {
        try {
            if (!selectedDay) throw new Error("Dia não selecionado!");
            if (!selectedTime) throw new Error("Horário não selecionado!");
            if (!data?.user.id) throw new Error("Usuário não logado!");

            const hour = Number(selectedTime.split(":")[0]);
            const minute = Number(selectedTime.split(":")[1]);

            const newDate = set(selectedDay, {
                hours: hour,
                minutes: minute,
            });

            await createBooking({
                serviceId: service.id,
                userId: data.user.id,
                date: newDate,
            });
            toast.success("Reserva criada com sucesso!");
        } catch (error) {
            console.error(error);
            toast.error(`Erro ao criar reserva!`);
        }
    };

    return (
        <div>
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
                        <div className="w-full space-y-2">
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

                                <Sheet
                                    open={bookingSheetIsOpen}
                                    onOpenChange={(open) =>
                                        setBookingSheetIsOpen(open)
                                    }
                                >
                                    <Button
                                        variant={"secondary"}
                                        size={"sm"}
                                        onClick={
                                            data?.user
                                                ? handleBookingSheetOpen
                                                : handleSignInDialogOpen
                                        }
                                    >
                                        Reservar
                                    </Button>
                                    <SheetContent className="px-0">
                                        <SheetHeader className="border-b border-solid pb-5">
                                            <SheetTitle>
                                                Fazer reserva
                                            </SheetTitle>
                                            <SheetDescription>
                                                Faça sua reserva aqui.
                                            </SheetDescription>
                                        </SheetHeader>

                                        <div className="border-b border-solid py-5">
                                            <Calendar
                                                mode="single"
                                                locale={ptBR}
                                                selected={selectedDay}
                                                onSelect={handleDateSelect}
                                                fromDate={new Date()}
                                                styles={{
                                                    head_cell: {
                                                        width: "100%",
                                                        textTransform:
                                                            "capitalize",
                                                    },
                                                    cell: {
                                                        width: "100%",
                                                    },
                                                    button: {
                                                        width: "100%",
                                                    },
                                                    nav_button_previous: {
                                                        width: "32px",
                                                        height: "32px",
                                                    },
                                                    nav_button_next: {
                                                        width: "32px",
                                                        height: "32px",
                                                    },
                                                    caption: {
                                                        textTransform:
                                                            "capitalize",
                                                    },
                                                }}
                                            />
                                        </div>

                                        {selectedDay && (
                                            <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                                                {timeList.length > 0 ? (
                                                    timeList.map((time) => (
                                                        <Button
                                                            key={time}
                                                            variant={
                                                                selectedTime ===
                                                                time
                                                                    ? "default"
                                                                    : "outline"
                                                            }
                                                            className="rounded-full border border-input"
                                                            onClick={() =>
                                                                handleTimeSelect(
                                                                    time,
                                                                )
                                                            }
                                                        >
                                                            {time}
                                                        </Button>
                                                    ))
                                                ) : (
                                                    <p className="text-xs">
                                                        Não há horários
                                                        disponíveis para essa
                                                        data!
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {selectedTime && selectedDay && (
                                            <div className="p-5 pb-0">
                                                <BookingSummary
                                                    serviceName={service.name}
                                                    price={Number(
                                                        service.price,
                                                    )}
                                                    date={selectedDay}
                                                    time={selectedTime}
                                                    barbershopName={
                                                        barbershop.name
                                                    }
                                                />
                                            </div>
                                        )}

                                        <SheetFooter className="p-5">
                                            <SheetClose asChild>
                                                <Button
                                                    onClick={
                                                        handleCreateBooking
                                                    }
                                                    disabled={
                                                        !selectedDay ||
                                                        !selectedTime
                                                    }
                                                >
                                                    Confirmar
                                                </Button>
                                            </SheetClose>
                                        </SheetFooter>
                                    </SheetContent>
                                </Sheet>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Dialog
                open={signInDialogIsOpen}
                onOpenChange={(open) => setSignInDialogIsOpen(open)}
            >
                <DialogContent className="rounded-lg">
                    <SignInDialog />
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ServiceItem;
