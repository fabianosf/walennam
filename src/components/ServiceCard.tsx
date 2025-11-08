import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const ServiceCard = ({ title, description, image, link }: ServiceCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all" asChild>
          <Link to={link}>
            Saiba Mais <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
