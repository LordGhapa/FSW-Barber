/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
"use client";
import {
  CalendarIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { SheetHeader, SheetTitle } from "../ui/sheet";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function SideMenu() {
  const { data } = useSession();

  const handleLoginClick = async () => await signIn("google");
  const handleLogOutClick = async () => {
    await signOut();
  };

  return (
    <>
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
    </>
  );
}
