/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "../ui/avatar";
import Link from "next/link";

export default function Header() {
  const { data } = useSession();

  const handleLoginClick = async () => {
    await signIn("google");
  };
  const handleLogOutClick = async () => {
    await signOut();
  };
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5 ">
        <Image src={"/Logo.svg"} alt="Logo barbearia" height={22} width={120} />

        <Sheet>
          <SheetTrigger>
            <Button variant={"outline"} size={"icon"}>
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <SheetHeader className="border-b border-solid border-secondary p-5 text-left">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            {data?.user ? (
              <div className="flex items-center justify-between  px-5 py-6 ">
                <div className="flex  items-center gap-3">
                  <Avatar>
                    <AvatarImage src={data.user?.image ?? ""} />
                  </Avatar>
                  <h2 className="font-bold">{data.user.name}</h2>
                </div>
                <Button
                  onClick={handleLogOutClick}
                  variant={"secondary"}
                  size={"icon"}
                >
                  <LogOutIcon />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 px-5 py-6">
                <div className="flex items-center gap-2 ">
                  <UserIcon size={32} />
                  <h2 className="font-bold">faça Seu Login</h2>
                </div>
                <Button
                  onClick={handleLoginClick}
                  variant={"secondary"}
                  className="w-full  justify-start"
                >
                  <LogInIcon className="mr-2" size={18} />
                  Fazer Login
                </Button>
              </div>
            )}
            <div className="flex flex-col gap-3 px-5">
              <Button variant={"outline"} className="justify-start" asChild>
                <Link href={"/"} className="flex justify-start">
                  <HomeIcon size={18} className="mr-2 " />
                  Início
                </Link>
              </Button>

              {data?.user && (
                <Button variant={"outline"} className="justify-start" asChild>
                  <Link href={"/bookings"} className="flex justify-start">
                    <CalendarIcon size={18} className="mr-2" />
                    Agendamentos
                  </Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
}
