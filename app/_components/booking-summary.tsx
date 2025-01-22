import { format } from "date-fns";
import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";

interface BookingSummaryParams {
    serviceName: string;
    price: number;
    date: Date;
    time?: string;
    barbershopName: string;
}

const BookingSummary = (params: BookingSummaryParams) => {
    return (
        <Card>
            <CardContent className="flex flex-col gap-4 p-3">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold">{params.serviceName}</h2>
                    <p className="text-sm font-bold">
                        {Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        }).format(params.price)}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <h2 className="text-sm text-gray-400">Data</h2>
                    <p className="text-sm">
                        {format(params.date, "dd 'de' MMMM", {
                            locale: ptBR,
                        })}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <h2 className="text-sm text-gray-400">Horário</h2>
                    <p className="text-sm">
                        {params.time
                            ? params.time
                            : format(params.date, "HH:mm", { locale: ptBR })}
                    </p>
                </div>

                <div className="flex items-center justify-between">
                    <h2 className="text-sm text-gray-400">Barbearia</h2>
                    <p className="text-sm">{params.barbershopName}</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default BookingSummary;
