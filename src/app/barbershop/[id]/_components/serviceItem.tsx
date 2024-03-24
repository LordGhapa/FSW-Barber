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
import { type Booking, type Barbershop, type Service } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { generateDayTimeList } from "../_helpers/hours";
import { format } from "date-fns/format";
import { saveBooking } from "../_actions/save-booking";
import { setHours, setMinutes } from "date-fns";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getDayBookings } from "../_actions/get-day-booking";
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

  const { data } = useSession();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [dayBooking, setDayBooking] = useState<Booking[]>([]);

  const router = useRouter();

  const timeList = useMemo(() => {
    if (!date) return;
    return generateDayTimeList(date).filter((time) => {
      const timeHour = Number(time.split(":")[0]);
      const timeMinutes = Number(time.split(":")[1]);

      const bookings = dayBooking.find((bookings) => {
        const bookingHour = bookings.date.getHours();
        const bookingMinutes = bookings.date.getMinutes();

        return bookingHour === timeHour && bookingMinutes === timeMinutes;
      });
      if (!bookings) return true;
      return false;
    });
  }, [date, dayBooking]);

  const handleHourClick = (time: string) => {
    setHour(time);
  };

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  useEffect(() => {
    if (!date) return;
    const refreshAvailableHours = async () => {
      const _dayBookings = await getDayBookings(barbershop.id, date);
      setDayBooking(_dayBookings);
    };
    void refreshAvailableHours();
  }, [date, barbershop.id]);

  const handleBookingSubmit = async () => {
    setLoadingSubmit(true);
    try {
      if (!hour || !date || !data?.user) return;

      const dateHour = Number(hour.split(":")[0]);
      const dateMinutes = Number(hour.split(":")[1]);
      const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

      await saveBooking({
        serviceId: service.id,
        barbeshopId: barbershop.id,
        date: newDate,
        userId: (data.user as any).id,
      });
      setSheetIsOpen(false);
      toast("Reservar realizada com sucesso!", {
        description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.'", {
          locale: ptBR,
        }),
        action: {
          label: "Visualizar",
          onClick: () => {
            router.push("/bookings");
          },
        },
      });
      setHour(undefined);
      setDate(undefined);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSubmit(false);
    }
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
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })
                  .format(Number(service.price))
                  .toString()}
              </p>
              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                <SheetTrigger asChild>
                  <Button variant={"secondary"} onClick={handleBookingClick}>
                    Reservar
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0">
                  <SheetHeader className="border-b border-solid border-secondary px-5 py-6 text-left">
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>
                  <div className=" py-6">
                    <Calendar
                      mode="single"
                      fromDate={new Date(Date.now() + 1000 * 60 * 60 * 24)}
                      locale={ptBR}
                      selected={date}
                      onSelect={handleDateClick}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: { width: "100%" },
                        button: { width: "100%" },
                        nav_button_previous: { width: "32px", height: "32px" },
                        nav_button_next: { width: "32px", height: "32px" },
                        caption: { textTransform: "capitalize" },
                        month: { width: "100%" },
                      }}
                    />
                  </div>

                  {date && (
                    <div className="scroll flex gap-3 overflow-x-auto border-t border-solid border-secondary px-5 py-6">
                      {timeList?.map((time) => (
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
                            })
                              .format(Number(service.price))
                              .toString()}
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
                    <Button
                      disabled={!hour || !date || loadingSubmit}
                      onClick={handleBookingSubmit}
                      className="px-5"
                    >
                      {loadingSubmit && (
                        <Loader2 className="size-4 mr-2 animate-spin" />
                      )}
                      Confirmar Reservar
                    </Button>
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
