import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import lashesImage from "@/assets/service-lashes.jpg";
import browsImage from "@/assets/service-brows.jpg";
import progressiveImage from "@/assets/service-progressive.jpg";

const ServiceDetail = () => {
  const { serviceId } = useParams();

  const servicesData: Record<string, any> = {
    cilios: {
      title: "Extensão de Cílios",
      subtitle: "Olhar Impactante e Natural",
      image: lashesImage,
      description:
        "A extensão de cílios é um procedimento que adiciona fios sintéticos aos seus cílios naturais, proporcionando volume, comprimento e curvatura. Utilizamos técnicas avançadas como fio a fio, volume russo e híbrido para resultados personalizados e naturais.",
      duration: "2 a 3 horas",
      price: "A partir de R$ 150,00",
      benefits: [
        "Olhar mais expressivo e marcante",
        "Elimina a necessidade de máscara de cílios diária",
        "Resultados duradouros (3 a 4 semanas)",
        "Aspecto natural e elegante",
        "Resistente à água e suor",
        "Personalização completa do volume e curvatura",
      ],
      care: [
        "Evite molhar os cílios nas primeiras 24 horas",
        "Não use produtos oleosos na região dos olhos",
        "Penteie os cílios diariamente com escovinha própria",
        "Evite dormir de bruços",
        "Retorne para manutenção a cada 3 semanas",
      ],
    },
    sobrancelhas: {
      title: "Design de Sobrancelhas",
      subtitle: "Moldagem Perfeita Para Seu Rosto",
      image: browsImage,
      description:
        "O design de sobrancelhas envolve técnicas profissionais de modelagem, remoção e preenchimento para criar sobrancelhas harmoniosas que valorizam seu rosto. Oferecemos design com pinça, henna, micropigmentação fio a fio e laminação.",
      duration: "1 a 2 horas",
      price: "A partir de R$ 80,00",
      benefits: [
        "Rosto mais harmonioso e equilibrado",
        "Sobrancelhas simétricas e bem definidas",
        "Preenchimento natural de falhas",
        "Resultados duradouros (design: 3-4 semanas, micropigmentação: até 2 anos)",
        "Valorização do olhar",
        "Menos tempo na maquiagem diária",
      ],
      care: [
        "Evite molhar a região nas primeiras 24 horas (micropigmentação)",
        "Não use maquiagem na área tratada por 48 horas",
        "Evite exposição solar direta nos primeiros dias",
        "Não coçar ou esfregar a região",
        "Use protetor solar na área após cicatrização",
      ],
    },
    progressiva: {
      title: "Progressiva Premium",
      subtitle: "Cabelos Lisos, Sedosos e Brilhantes",
      image: progressiveImage,
      description:
        "A progressiva é um tratamento capilar que alisa os fios, reduz o volume e proporciona brilho intenso. Utilizamos produtos de alta qualidade, livres de formol, que respeitam a saúde dos seus cabelos enquanto transformam sua textura.",
      duration: "3 a 5 horas",
      price: "A partir de R$ 200,00",
      benefits: [
        "Cabelos completamente lisos e alinhados",
        "Redução significativa do volume",
        "Brilho intenso e duradouro",
        "Fácil penteabilidade",
        "Reduz o frizz em até 100%",
        "Durabilidade de 3 a 6 meses",
      ],
      care: [
        "Não lave o cabelo por 3 dias após o procedimento",
        "Use produtos específicos para cabelos progressivos",
        "Evite prender o cabelo nos primeiros dias",
        "Não molhe o cabelo (chuva, piscina) nas primeiras 72 horas",
        "Use protetor térmico antes de chapinhas e secadores",
        "Realize hidratações regulares",
      ],
    },
  };

  const service = servicesData[serviceId || ""];

  if (!service) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Serviço não encontrado</h1>
          <Button asChild>
            <Link to="/servicos">Voltar para Serviços</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <Button variant="ghost" className="mb-8" asChild>
          <Link to="/servicos">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Serviços
          </Link>
        </Button>

        {/* Hero Image */}
        <div className="max-w-5xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-2xl">
          <img src={service.image} alt={service.title} className="w-full h-[400px] object-cover" />
        </div>

        {/* Service Info */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">{service.title}</h1>
            <p className="text-2xl text-primary font-semibold mb-6">{service.subtitle}</p>
            <p className="text-lg text-muted-foreground leading-relaxed">{service.description}</p>
          </div>

          {/* Price and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-secondary p-6 rounded-xl text-center">
              <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-1">Duração</p>
              <p className="text-xl font-semibold">{service.duration}</p>
            </div>
            <div className="bg-secondary p-6 rounded-xl text-center">
              <p className="text-sm text-muted-foreground mb-1">Investimento</p>
              <p className="text-2xl font-bold text-primary">{service.price}</p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold mb-6">Benefícios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.benefits.map((benefit: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Care Instructions */}
          <div className="bg-muted p-8 rounded-xl mb-12">
            <h2 className="text-3xl font-serif font-bold mb-6">Cuidados Pós-Procedimento</h2>
            <ul className="space-y-3">
              {service.care.map((instruction: string, index: number) => (
                <li key={index} className="flex items-start gap-3 text-lg">
                  <span className="text-primary font-bold">•</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button variant="hero" size="lg" className="text-lg px-10 py-6" asChild>
              <Link to="/contato">Agendar Este Serviço</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
