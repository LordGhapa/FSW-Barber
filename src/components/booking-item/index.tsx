import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

export default function BookingItem() {
  return (
    <Card>
      <CardContent className="flex  justify-between p-5 py-0">
        <div className="flex flex-col gap-2 py-5 ">
          <Badge className="w-fit bg-[#221c3d] text-primary hover:bg-[#221c3d]">
            Confirmado
          </Badge>
          <h2 className="font-bold ">Corte de cabelo</h2>
          <div className="flex items-center gap-2 ">
            <Avatar className=" h-6 w-6">
              <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
              <AvatarFallback>a</AvatarFallback>
            </Avatar>
            <h3 className="text-sm">Vintage Barber</h3>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-l border-solid border-secondary px-3  ">
          <p>fevereiro</p>
          <p className="text-xl">06</p>
          <p>09:45</p>
        </div>
      </CardContent>
    </Card>
  );
}
