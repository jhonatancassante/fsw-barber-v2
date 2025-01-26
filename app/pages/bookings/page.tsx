import FormatedTitle from "../../_components/formated-title";
import Header from "../../_components/header";
import BookingItem from "../../_components/booking-item";
import { getConcludedBookings } from "../../_data/get-concluded-bookings";
import { getConfirmedBookings } from "../../_data/get-confirmed-bookings";

const BookingsPage = async () => {
    const concludedBookings = await getConcludedBookings();

    const confirmedBookings = await getConfirmedBookings();

    return (
        <div>
            <Header />
            <div className="p-5 lg:px-28">
                <h1 className="text-xl font-bold">Agendamentos</h1>

                <FormatedTitle title="Confirmados" />
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {confirmedBookings.length > 0 ? (
                        confirmedBookings.map((booking) => (
                            <div key={booking.id} className="pb-6 lg:pb-0">
                                <BookingItem booking={booking} />
                            </div>
                        ))
                    ) : (
                        <h2>Nenhum agendamento confirmado!</h2>
                    )}
                </div>

                <FormatedTitle title="Finalizados" />
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {concludedBookings.length > 0 ? (
                        concludedBookings.map((booking) => (
                            <div key={booking.id} className="pb-6 lg:pb-0">
                                <BookingItem booking={booking} />
                            </div>
                        ))
                    ) : (
                        <h2>Nenhum agendamento finalizado!</h2>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookingsPage;
