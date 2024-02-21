/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { type Barbershop, type Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { format } from "date-fns/format";
interface ServiceItemProps {
  service: Service;
  isAuthenticaded: boolean;
  barbershop: Barbershop;
}

export default function ServiceItem({
  service,
  isAuthenticaded,
  barbershop,
}: ServiceItemProps) {
  const handleBookingClick = async () => {
    if (!isAuthenticaded) {
      await signIn("google");
    }

    // TODO: abrir modal de agendamento
  };
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>("");

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : [];
  }, [date]);

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
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
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={"secondary"} onClick={handleBookingClick}>
                    Reservar
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0">
                  <SheetHeader className="border-b border-solid border-secondary px-5 py-6 text-left">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>
                  <div className="py-6">
                    <Calendar
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                      mode="single"
                      fromDate={new Date(Date.now() + 1000 * 60 * 60 * 24)}
                      locale={ptBR}
                      selected={date}
                      onSelect={handleDateClick}
                    />{" "}
                  </div>
                  {/* {mostra lista de hoararios se data tiver selecionada } */}

                  {date && (
                    <div className="scroll flex gap-3 overflow-x-auto border-t border-solid border-secondary px-5 py-6">
                      {timeList.map((time) => (
                        <Button
                          onClick={() => {
                            handleHourClick(time);
                          }}
                          variant={hour === time ? "default" : "outline"}
                          className="rounded-full border border-secondary"
                          key={time}
                        >
                          {" "}
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}
                  <div className="border-t border-solid border-secondary px-5 py-6">
                    <Card>
                      <CardContent className="flex flex-col gap-3 p-3">
                        <div className="flex justify-between ">
                          <h2 className="font-bold">{service.name}</h2>
                          <h3 className="text-sm font-bold">
                            {" "}
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </h3>
                        </div>
                        {date && (
                          <div className="flex justify-between">
                            <h3 className="text-sm text-gray-400">Date</h3>
                            <h4 className=" text-sm ">
                              {format(date, "dd 'de' MMMM", { locale: ptBR })}
                            </h4>
                          </div>
                        )}
                        {hour && (
                          <div className="flex justify-between">
                            <h3 className="text-sm text-gray-400">Horário</h3>
                            <h4 className=" text-sm ">{hour}</h4>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <h3 className="text-sm text-gray-400">Barbearia</h3>
                          <h4 className=" text-sm ">{barbershop.name}</h4>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <SheetFooter>
                    <Button disabled={!hour || !date} className="px-5">Confirmar Reservar</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
