"use client";
import { type Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale/pt-BR";
import { isFuture } from "date-fns";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Image from "next/image";
import { Button } from "../ui/button";
import { cancelBooking } from "@/app/_actions/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";

import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

export default function BookingItem({ booking }: BookingItemProps) {
  const [isBookingDeleteLoading, setIsDeleteLoading] = useState(false);

  const isBookingConfirmed = isFuture(booking.date);

  const handleCancelClick = async () => {
    setIsDeleteLoading(true);

    try {
      await cancelBooking(booking.id);
      toast("Reserva cancelada com sucesso");
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-[99%]">
          <CardContent className="flex  justify-between  p-0 ">
            <div className="flex flex-[3] flex-col gap-2  py-5 pl-5">
              <Badge
                variant={isBookingConfirmed ? "default" : "secondary"}
                className="w-fit "
              >
                {isBookingConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h2 className="font-bold ">{booking?.service.name}</h2>
              <div className="flex items-center gap-2 ">
                <Avatar className=" h-6 w-6">
                  <AvatarImage src={booking?.barbershop?.imageUrl} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <h3 className="text-sm">{booking?.barbershop.name}</h3>
              </div>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center border-l border-solid border-secondary  ">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-xl">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p>{format(booking.date, "hh:mm", { locale: ptBR })}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="p-0">
        <SheetHeader className="border-b border-solid border-secondary px-5 pb-6 pt-4  text-left ">
          <SheetTitle>Informações da Reserva</SheetTitle>
        </SheetHeader>
        <div className="px-5">
          <div className="relative mt-6 h-[180px] w-full">
            <Image
              alt={booking.barbershop.name}
              src={"/map.png"}
              fill
              style={{
                objectFit: "cover",
              }}
            />
            <div className="absolute bottom-4 left-0 w-full px-5 ">
              <Card className="mx-5">
                <CardContent className=" flex gap-3 p-3">
                  <Avatar>
                    <AvatarImage src={booking.barbershop.imageUrl} />
                  </Avatar>
                  <div>
                    <h2 className="font-bold">{booking.barbershop.name}</h2>
                    <h3 className="line-clamp-1 w-full   text-xs">
                      {booking.barbershop.address}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <Badge
            variant={isBookingConfirmed ? "default" : "secondary"}
            className="mb-6 mt-3 w-fit"
          >
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <Card>
            <CardContent className="flex flex-col gap-3 p-3">
              <div className="flex justify-between ">
                <h2 className="font-bold">{booking.service.name}</h2>
                <h3 className="text-sm font-bold">
                  {" "}
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </h3>
              </div>

              <div className="flex justify-between">
                <h3 className="text-sm text-gray-400">Date</h3>
                <h4 className=" text-sm ">
                  {format(booking.date, "dd 'de' MMMM", { locale: ptBR })}
                </h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-sm text-gray-400">Horário</h3>
                <h4 className=" text-sm ">{format(booking.date, "hh:mm")}</h4>
              </div>

              <div className="flex justify-between">
                <h3 className="text-sm text-gray-400">Barbearia</h3>
                <h4 className=" text-sm ">{booking.barbershop.name}</h4>
              </div>
            </CardContent>
          </Card>
          <SheetFooter className="mt-6 w-full flex-row gap-3">
            <SheetClose asChild>
              <Button className="w-full " variant={"secondary"}>
                Voltar
              </Button>
            </SheetClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  className="w-full"
                  disabled={!isBookingConfirmed || isBookingDeleteLoading}
                  variant={"destructive"}
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                >
                  Cancelar Reserva
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Deseja mesmo cancelar essa reserva
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Uma vez cancelada, não será possível reverter essa ação
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-row gap-3">
                  <AlertDialogCancel className="mt-0 w-full">
                    Voltar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="w-full"
                    disabled={isBookingDeleteLoading}
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={handleCancelClick}
                  >
                    {isBookingDeleteLoading && (
                      <Loader2 className="size-4 mr-2 animate-spin" />
                    )}
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
