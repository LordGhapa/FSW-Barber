import { db } from "@/lib/prisma";

import BarbershopInfo from "./_components/barbershop-infor";

interface BarbershopDetailsPageProps {
  params: {
    id?: string;
  };
}
export default async function BarbershopDetailsPage({
  params,
}: BarbershopDetailsPageProps) {
  if (params.id == null) {
    // TODO: redireciona para homepage
    return null;
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  });
  if (barbershop == null) {
    // TODO: redireciona para homepage
    return null;
  }

  return (
    <>
      <BarbershopInfo barbershop={barbershop} />
    </>
  );
}
