import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  name: string;
  rating: number;
  review: string;
  city?: string;
}

export const TestimonialCard = ({ name, rating, review, city }: TestimonialCardProps) => {
  return (
    <Card className="h-full">
      <CardContent className="pt-5 pb-4">
        <div className="flex gap-0.5 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-muted"}`}
            />
          ))}
        </div>
        <p className="text-sm text-foreground/90 mb-3 leading-relaxed">{review}</p>
        <div className="text-sm">
          <p className="font-medium">{name}</p>
          {city && <p className="text-xs text-muted-foreground">{city}</p>}
        </div>
      </CardContent>
    </Card>
  );
};