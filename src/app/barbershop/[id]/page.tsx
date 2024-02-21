import { db } from "@/lib/prisma";

import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/serviceItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

interface BarbershopDetailsPageProps {
  params: {
    id?: string;
  };
}
export default async function BarbershopDetailsPage({
  params,
}: BarbershopDetailsPageProps) {
  const session = await getServerSession(authOptions);

  if (params.id == null) {
    // TODO: redireciona para homepage
    return null;
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });
  if (barbershop == null) {
    // TODO: redireciona para homepage
    return null;
  }

  return (
    <>
      <BarbershopInfo barbershop={barbershop} />
      <div className="flex flex-col gap-4 px-5  py-6">
        {barbershop.services.map((service) => (
          <ServiceItem
            barbershop={barbershop}
            service={service}
            key={service.id}
            isAuthenticaded={!(session?.user == null)}
          />
        ))}
      </div>
    </>
  );
}
