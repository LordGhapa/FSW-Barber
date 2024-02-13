import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";

export default function Header() {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5 ">
        <Image src={"/Logo.svg"} alt="Logo barbearia" height={22} width={120} />
        <Button variant={"outline"} size={"icon"} className="size-8">
          <MenuIcon size={16} />
        </Button>
      </CardContent>
    </Card>
  );
}
