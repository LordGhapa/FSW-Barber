"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type Barbershop } from "@prisma/client";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

export default function BarbershopItem({ barbershop }: BarbershopItemProps) {
  const Router = useRouter();
  const handleBookingClick = () => {
    Router.push(`/barbershop/${barbershop.id}`);
  };
  return (
    <Card className="min-w-full max-w-full rounded-2xl">
      <CardContent className=" p-0 px-1 pt-1 ">
        <div className="relative h-[159px] w-full overflow-hidden rounded-2xl">
          <Badge
            variant={"secondary"}
            className="absolute left-2 top-2 z-10 flex items-center justify-center gap-1 opacity-90 "
          >
            <Star size={12} className="fill-primary text-primary" />
            <span className="text-xs">5,0</span>
          </Badge>

          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
        <div className="px-3 pb-3">
          <h2 className="text-nowrap mt-2 overflow-hidden  text-ellipsis font-bold">
            {barbershop.name}
          </h2>
          <p className="text-nowrap  overflow-hidden text-ellipsis text-sm text-gray-400">
            {barbershop.address}
          </p>
          <Button
            onClick={handleBookingClick}
            className="mt-3 w-full"
            variant={"secondary"}
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
