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
            <div className="p-5">
                <h1 className="text-xl font-bold">Agendamentos</h1>

                <FormatedTitle title="Confirmados" />
                {confirmedBookings.length > 0 ? (
                    confirmedBookings.map((booking) => (
                        <div key={booking.id} className="pb-6">
                            <BookingItem booking={booking} />
                        </div>
                    ))
                ) : (
                    <h2>Nenhum agendamento confirmado!</h2>
                )}

                <FormatedTitle title="Finalizados" />
                {concludedBookings.length > 0 ? (
                    concludedBookings.map((booking) => (
                        <div key={booking.id} className="pb-6">
                            <BookingItem booking={booking} />
                        </div>
                    ))
                ) : (
                    <h2>Nenhum agendamento finalizado!</h2>
                )}
            </div>
        </div>
    );
};

export default BookingsPage;
