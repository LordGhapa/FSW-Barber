import { type Prisma } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { format } from "date-fns/format";
import { ptBR } from "date-fns/locale/pt-BR";
import { isFuture } from "date-fns";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

export default function BookingItem({ booking }: BookingItemProps) {
  const isBookingConfirmed = isFuture(booking.date);
  return (
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
  );
}
