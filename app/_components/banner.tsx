import Image from "next/image";

const Banner = () => {
    return (
        <div className="flex items-center">
            <div className="relative mt-6 h-[150px] w-full">
                <Image
                    src="/banner-01.png"
                    alt="Agende nos melhores com FSW Barber banner"
                    fill
                    className="rounded-xl object-cover"
                />
            </div>
        </div>
    );
};

export default Banner;
