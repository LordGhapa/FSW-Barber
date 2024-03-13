import Header from "@/components/header";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import Search from "./_components/search";
import BookingItem from "@/components/booking-item";
import { db } from "@/lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, ConfirmedBookings] = await Promise.all([
    db.barbershop.findMany(),
    session?.user
      ? await db.booking.findMany({
          where: {
            userId: (session.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ]);

  return (
    <div>
      <Header />
      <div className="px-5 pt-5 ">
        <h2 className="text-xl font-bold">
          Olá,{" "}
          {session?.user
            ? session.user.name?.split(" ")[0]
            : "Vamos Agenda um corte hoje"}
        </h2>
        <p className="text-sm capitalize">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>
      <div className="mt-6 px-5">
        <Search />
      </div>

      <div className="mt-6   ">
        {ConfirmedBookings.length > 0 && (
          <h2 className=" mb-3 pl-5 text-sm font-bold uppercase text-gray-400">
            Agendamentos
          </h2>
        )}
        <div className="scroll flex gap-3 overflow-x-auto px-5">
          {ConfirmedBookings.map((booking) => (
            <BookingItem booking={booking} key={booking.id} />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="mb-3 px-5  text-sm font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="scroll flex gap-2 overflow-x-auto px-5">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="mb-[4.5rem] mt-6">
        <h2 className="mb-3 px-5  text-sm font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="scroll flex gap-2 overflow-x-auto px-5">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
