import Header from "@/components/header";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import Search from "./_components/search";
import BookingItem from "@/components/booking-item";
import { db } from "@/lib/prisma";
import BarbershopItem from "./_components/barbershop-item";

export default async function Home() {
  const barbershops = await db.barbershop.findMany();

  return (
    <div>
      <Header />
      <div className="px-5 pt-5 ">
        <h2 className="text-xl font-bold">Olá, Ghapa!</h2>
        <p className="text-sm capitalize">
          {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
        </p>
      </div>
      <div className="mt-6 px-5">
        <Search />
      </div>
      <div className="mt-6 px-5  ">
        <h2 className=" mb-3 text-sm font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        <BookingItem />
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
    </div>
  );
}
