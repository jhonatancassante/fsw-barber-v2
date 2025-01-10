import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

//TODO: receber agendamento como propriedade
const BookingItem = () => {
    return (
        <Card>
            <CardContent className="flex justify-between p-0">
                <div className="flex flex-col gap-2 py-5 pl-5">
                    <Badge className="w-fit rounded-xl">Confirmado</Badge>
                    <h3 className="font-semibold">Corte de Cabelo</h3>
                    <div className="flex">
                        <Avatar className="h-6 w-6">
                            <AvatarImage
                                src="https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png"
                                alt="Avatar"
                            />
                        </Avatar>
                        <p className="text-sm">Barbearia FSW</p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 border-l-2 border-solid px-5">
                    <p className="text-sm">Agosto</p>
                    <p className="text-2xl">05</p>
                    <p className="text-sm">20:00</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default BookingItem;
