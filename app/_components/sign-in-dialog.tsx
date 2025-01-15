import Image from "next/image";
import { Button } from "./ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { signIn } from "next-auth/react";

const SignInDialog = () => {
    const handleLoginWithGoogleClick = () => signIn("google");

    return (
        <div className="flex w-full flex-col gap-5">
            <DialogHeader>
                <DialogTitle>Faça seu login</DialogTitle>
                <DialogDescription>
                    Conecte-se usando sua conta do Google
                </DialogDescription>
            </DialogHeader>

            <Button
                className="gap-1 font-bold"
                variant={"outline"}
                onClick={handleLoginWithGoogleClick}
            >
                <Image
                    src={"/google.svg"}
                    height={16}
                    width={16}
                    alt="logo google"
                />
                Google
            </Button>
        </div>
    );
};

export default SignInDialog;
