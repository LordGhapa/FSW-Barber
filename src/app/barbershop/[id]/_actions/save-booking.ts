"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface SaveBooking {
  barbeshopId: string;
  serviceId: string;
  userId: string;
  date: Date;
}

export const saveBooking = async (params: SaveBooking) => {
  await db.booking.create({
    data: {
      serviceId: params.serviceId,
      userId: params.userId,
      date: params.date,
      barbershopId: params.barbeshopId,
    },
  });
  revalidatePath("/");
  revalidatePath("/bookings");
};
