import BookingItem from "@/components/booking-item";
import Header from "@/components/header";
import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function BookingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return redirect("/");
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
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
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ]);

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h1 className="mb-6 text-xl font-bold">Agendamentos</h1>
        {confirmedBookings.length > 0 && (
          <h2 className="mb-3  text-sm font-bold uppercase text-gray-400  ">
            Confirmados
          </h2>
        )}
        <div className="flex flex-col gap-3  ">
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
        {/* -- */}
        {finishedBookings.length > 0 && (
          <h2 className="mb-3 mt-6 text-sm font-bold uppercase text-gray-400  ">
            Finalizados
          </h2>
        )}
        <div className="flex flex-col gap-3  ">
          {finishedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  );
}
