import Header from "../../_components/header";
import { Button } from "../../_components/ui/button";
import Image from "next/image";
import BarbershopItem from "../../_components/barbershop-item";
import { quickSearchOptions } from "../../_constants/quick-search";
import BookingItem from "../../_components/booking-item";
import FormatedTitle from "../../_components/formated-title";
import Search from "../../_components/search";
import GreetingItem from "../../_components/greeting-item";
import Link from "next/link";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../_components/ui/carousel";
import { getConfirmedBookings } from "../../_data/get-confirmed-bookings";
import Banner from "@/app/_components/banner";
import { getPopularBarbershops } from "@/app/_data/get-popular-barbershops";
import { getRecommendedBarbershops } from "@/app/_data/get-recommended-barbershops";

const HomePage = async () => {
    const barbershop = await getRecommendedBarbershops();
    const popularBarbershop = await getPopularBarbershops();

    const bookings = await getConfirmedBookings();

    return (
        <div>
            <Header />
            <div className="p-5 lg:px-28">
                <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
                    {/* SAUDAÇÃO */}
                    <GreetingItem />

                    <div className="flex flex-col">
                        {/* PESQUISA */}
                        <div className="mt-6 lg:mt-3">
                            <Search />
                        </div>

                        {/* BUSCA RÁPIDA */}
                        <div className="mt-6 flex gap-3 overflow-auto lg:mt-3 [&::-webkit-scrollbar]:hidden">
                            {quickSearchOptions.map((option) => (
                                <Button
                                    key={option.label}
                                    variant="secondary"
                                    className="gap-2 px-5"
                                    asChild
                                >
                                    <Link
                                        href={`/pages/barbershops?service=${option.label}`}
                                    >
                                        <Image
                                            src={option.icon}
                                            height={16}
                                            width={16}
                                            alt={`icone de ${option.label}`}
                                        />
                                        {option.label}
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* BANNER */}
                    <Banner />

                    {/* AGENDAMENTOS */}
                    {bookings.length > 0 ? (
                        <div>
                            <FormatedTitle title="Agendamentos" />
                            <div className="flex flex-row items-center justify-center">
                                <Carousel className="w-[90%] lg:w-[85%]">
                                    <CarouselContent>
                                        {bookings.map((booking) => (
                                            <CarouselItem key={booking.id}>
                                                <BookingItem
                                                    booking={booking}
                                                />
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious
                                        size="icon"
                                        className="-left-6 lg:-left-10"
                                    />
                                    <CarouselNext
                                        size="icon"
                                        className="-right-6 lg:-right-10"
                                    />
                                </Carousel>
                            </div>
                        </div>
                    ) : (
                        <Banner />
                    )}
                </div>

                {/* BARBEARIAS */}
                <FormatedTitle title="Recomendados" />
                <div className="flex flex-row gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {barbershop.map((barbershop) => (
                        <BarbershopItem
                            key={barbershop.id}
                            barbershop={barbershop}
                        />
                    ))}
                </div>

                {/* POPULARES */}
                <FormatedTitle title="Populares" />
                <div className="flex flex-row gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
                    {popularBarbershop.map((barbershop) => (
                        <BarbershopItem
                            key={barbershop.id}
                            barbershop={barbershop}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
