/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data } = useSession();

  const handleLoginClick = async () => {
    await signIn();
  };
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5 ">
        <Image src={"/Logo.svg"} alt="Logo barbearia" height={22} width={120} />
        <Button variant={"outline"} size={"icon"} className="size-fit">
          <MenuIcon size={18} />
        </Button>
        {/* {data?.user?.name ? (
          <div>
            <Button
              onClick={async () => {
                await signOut();
              }}
              variant={"outline"}
              size={"icon"}
              className="size-fit"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleLoginClick}
            variant={"outline"}
            size={"icon"}
            className="size-fit"
          >
            Login
          </Button>
        )} */}
      </CardContent>
    </Card>
  );
}
