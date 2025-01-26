"use client";

import { StarIcon } from "lucide-react";
import {
    DialogClose,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { updateRating } from "../_actions/update-rating";
import { toast } from "sonner";

interface RateDialogProps {
    barbershopId: string;
    rating: number;
}

const RateDialog = ({ barbershopId, rating }: RateDialogProps) => {
    const handleRateClick = async (event: React.MouseEvent<SVGElement>) => {
        const starId = Number((event.target as HTMLElement)?.id);
        try {
            await updateRating(barbershopId, starId + 1);
            toast.success("Avaliação registrada com sucesso!");
        } catch (error) {
            console.log(error);
            toast.error("Não foi possível registrar a avalição!");
        }
    };

    return (
        <div className="flex w-full flex-col gap-5">
            <DialogHeader>
                <DialogTitle>Faça sua avaliação</DialogTitle>
                <DialogDescription>
                    Clique na estrela correspondente a nota que queira deixar
                    para a barbearia
                </DialogDescription>
            </DialogHeader>
            <div className="flex w-full justify-center gap-2 py-4">
                {[...Array(5)].map((_, i) => (
                    <DialogClose key={`star-${i}-${barbershopId}`} asChild>
                        <StarIcon
                            className={`cursor-pointer ${rating >= i + 1 ? "fill-primary text-primary" : ""}`}
                            size={30}
                            id={i.toString()}
                            onClick={handleRateClick}
                        />
                    </DialogClose>
                ))}
            </div>
        </div>
    );
};

export default RateDialog;
