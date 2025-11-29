import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CONTACT_INFO } from "@/config/contact";

interface ServiceCardProps {
  name: string;
  description: string;
  startingPrice: string;
}

export const ServiceCard = ({ name, description, startingPrice }: ServiceCardProps) => {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi! I'm interested in ${name}. Please provide more details.`);
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${message}`, "_blank");
  };

  return (
    <Card className="h-full card-hover flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{name}</CardTitle>
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</p>
      </CardHeader>
      <CardContent className="pb-3 flex-1">
        <p className="text-sm font-semibold text-primary">
          {startingPrice}
          {startingPrice.includes("₹") && !startingPrice.includes("onwards") && (
            <span className="text-xs font-normal text-muted-foreground ml-1">onwards</span>
          )}
        </p>
      </CardContent>
      <CardFooter className="gap-2 pt-0">
        <Button asChild size="sm" className="flex-1 h-8 text-xs">
          <Link to="/contact">Book Now</Link>
        </Button>
        <Button variant="outline" size="sm" className="gap-1.5 h-8" onClick={handleWhatsApp}>
          <MessageCircle className="w-3.5 h-3.5" />
          <span className="text-xs">Ask</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
