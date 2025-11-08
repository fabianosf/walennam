import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Mariana Silva",
      text: "Experiência impecável! Meus cílios ficaram perfeitos e naturais. A profissional é extremamente atenciosa e cuidadosa. Atendimento cinco estrelas! Voltarei com certeza.",
      rating: 5,
    },
    {
      name: "Juliana Costa",
      text: "A melhor progressiva que já fiz! Meu cabelo nunca esteve tão liso e brilhante. Produtos de qualidade excepcional e resultado duradouro. Super recomendo!",
      rating: 5,
    },
    {
      name: "Fernanda Oliveira",
      text: "Minhas sobrancelhas ficaram lindas! Profissionalismo e atenção aos detalhes excepcionais. O design valorizou meu rosto de forma incrível. Muito satisfeita!",
      rating: 5,
    },
    {
      name: "Camila Rodrigues",
      text: "Amei o resultado da extensão de cílios! Fio a fio perfeito, super natural e duradouro. O ambiente é acolhedor e a higienização impecável. Recomendo demais!",
      rating: 5,
    },
    {
      name: "Beatriz Santos",
      text: "Excelente trabalho de micropigmentação nas sobrancelhas! Resultado natural e exatamente como eu queria. Profissional super qualificada e cuidadosa.",
      rating: 5,
    },
    {
      name: "Patrícia Lima",
      text: "Minha progressiva ficou perfeita! Cabelo liso, sedoso e com muito brilho. A aplicação foi cuidadosa e o resultado superou minhas expectativas. Adorei!",
      rating: 5,
    },
    {
      name: "Amanda Souza",
      text: "Melhor lugar para cuidar das sobrancelhas! Design perfeito, profissional super atenciosa e ambiente muito agradável. Já sou cliente fiel!",
      rating: 5,
    },
    {
      name: "Larissa Alves",
      text: "Os cílios ficaram maravilhosos! Volume perfeito e muito natural. A profissional é uma artista! Atendimento diferenciado e resultado incrível.",
      rating: 5,
    },
    {
      name: "Gabriela Martins",
      text: "Fiz progressiva e extensão de cílios no mesmo dia! Ambos os procedimentos ficaram perfeitos. Saí de lá me sentindo linda e confiante. Vale cada centavo!",
      rating: 5,
    },
  ];

  const averageRating = 5.0;
  const totalReviews = testimonials.length;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Depoimentos</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Veja o que nossas clientes satisfeitas têm a dizer sobre nossos serviços
          </p>

          {/* Rating Summary */}
          <div className="flex flex-col items-center gap-4 bg-secondary rounded-xl p-6 max-w-sm mx-auto">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 fill-accent text-accent" />
              ))}
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-foreground">{averageRating}</p>
              <p className="text-muted-foreground">
                Baseado em {totalReviews} avaliações
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-16">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-4">Seja a Próxima Cliente Satisfeita!</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Junte-se às centenas de mulheres que transformaram sua beleza conosco. 
            Agende seu horário e experimente nosso atendimento de excelência!
          </p>
          <Button variant="hero" size="lg" className="text-lg px-10 py-6" asChild>
            <a href="https://wa.me/5521966403811?text=Olá!%20Gostaria%20de%20agendar%20um%20horário.">
              Agendar Meu Horário
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
