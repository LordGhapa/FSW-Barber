/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
// "use client";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import SideMenu from "../side-menu";
import Link from "next/link";

export default function Header() {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5 ">
        <Link href={"/"}>
          <Image
            src={"/Logo.svg"}
            alt="Logo barbearia"
            height={22}
            width={120}
          />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <MenuIcon size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
}
