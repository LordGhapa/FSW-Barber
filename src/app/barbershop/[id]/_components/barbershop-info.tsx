"use client";

import SideMenu from "@/components/side-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

import { type Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

export default function BarbershopInfo({ barbershop }: BarbershopInfoProps) {
  const router = useRouter();
  const handleBackClick = () => {
    router.replace("/");
  };
  return (
    <div>
      <div className="relative h-[250px] w-full ">
        <Button
          onClick={handleBackClick}
          size={"icon"}
          variant={"outline"}
          className="absolute left-4 top-4 z-10"
        >
          <ChevronLeftIcon />
        </Button>

        <Sheet>
          <SheetTrigger>
            <Button
              size={"icon"}
              variant={"outline"}
              className="absolute right-4 top-4 z-10"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>

        <Image
          className="opacity-90"
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="border-b border-solid border-secondary px-5 pb-6 pt-3">
        <h1 className="text-xl font-bold  ">{barbershop.name}</h1>
        <div className="mt-2 flex items-center gap-1">
          <MapPinIcon className=" text-primary " size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="mt-2 flex items-center gap-1 ">
          <StarIcon className="fill-primary text-primary " size={18} />
          <p className="text-sm">5.0 (354 Avaliações)</p>
        </div>
      </div>
    </div>
  );
}
