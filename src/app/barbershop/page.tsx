import Header from "@/components/header";
import { db } from "@/lib/prisma";
import BarbershopItem from "../(home)/_components/barbershop-item";
import Search from "../(home)/_components/search";

interface BarbershopsPageProps {
  searchParams: {
    search: string;
  };
}

export default async function BarbershopsPage({
  searchParams,
}: BarbershopsPageProps) {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  });

  return (
    <>
      <Header />
      <div className="mt-4">
        <Search
          defaultValues={{
            search: searchParams.search,
          }}
        />
      </div>
      <div className="px-5 py-6">
        <h1 className="text-xs font-bold uppercase text-gray-400">
          Resultados para &quot;{searchParams.search}&quot;
        </h1>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-4">
        {barbershops.map((barbershop) => (
          <div className="w-full" key={barbershop.id}>
            <BarbershopItem barbershop={barbershop} />
          </div>
        ))}
      </div>
    </>
  );
}
