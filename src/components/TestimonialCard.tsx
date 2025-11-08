import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  text: string;
  rating?: number;
}

const TestimonialCard = ({ name, text, rating = 5 }: TestimonialCardProps) => {
  return (
    <Card className="border-border hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex gap-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-accent text-accent" />
          ))}
        </div>
        <p className="text-muted-foreground mb-4 italic">"{text}"</p>
        <p className="font-semibold text-foreground">— {name}</p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
