"use client ";

import { type Booking } from "@prisma/client";

interface BookingListProps {
  booking: Booking;
}

export default function BookingList({ booking }: BookingListProps) {
  return <div>bookings-list</div>;
}
