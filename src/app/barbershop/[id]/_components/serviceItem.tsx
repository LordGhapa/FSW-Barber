/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type Service } from "@prisma/client";
import { signIn } from "next-auth/react";
import Image from "next/image";
interface ServiceItemProps {
  service: Service;
  isAuthenticaded: boolean;
}

export default function ServiceItem({
  service,
  isAuthenticaded,
}: ServiceItemProps) {
  const handleBookingClick = async () => {
    if (!isAuthenticaded) {
      await signIn("google");
    }

    // TODO: abrir modal de agendamento
  };

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex w-full items-center gap-4">
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px] gap-4">
            <Image
              className="rounded-lg"
              src={service.imageUrl}
              alt={service.name}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className=" flex w-full flex-col">
            <h2 className="font-bold">{service.name}</h2>
            <p className="text-sm text-gray-400">{service.description}</p>

            <div className="mt-3 flex items-center justify-between">
              <p className="text-lg font-bold text-primary">
                {" "}
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>
              <Button variant={"secondary"} onClick={handleBookingClick}>
                Reservar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
