import { Booking } from "@prisma/client";
import { isPast, set } from "date-fns";

const TIME_LIST = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
];

export const getTimeList = (bookings: Booking[], pickedDay: Date) => {
    return TIME_LIST.filter((time) => {
        const hours = Number(time.split(":")[0]);
        const minutes = Number(time.split(":")[1]);

        const isOnThePast = isPast(set(pickedDay, { hours, minutes }));

        const hasBookingOnCurrentTime = bookings.some(
            (booking) =>
                booking.date.getHours() === hours &&
                booking.date.getMinutes() === minutes,
        );

        return !(hasBookingOnCurrentTime || isOnThePast);
    });
};
