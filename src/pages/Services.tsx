import ServiceCard from "@/components/ServiceCard";
import lashesImage from "@/assets/service-lashes.jpg";
import browsImage from "@/assets/service-brows.jpg";
import progressiveImage from "@/assets/service-progressive.jpg";

const Services = () => {
  const services = [
    {
      title: "Extensão de Cílios",
      description: "Realce seu olhar com técnicas premium de alongamento e volume. Fio a fio, volume russo e híbrido.",
      image: lashesImage,
      link: "/servicos/cilios",
    },
    {
      title: "Design de Sobrancelhas",
      description: "Modelagem perfeita com técnicas de design, henna, micropigmentação e laminação para sobrancelhas impecáveis.",
      image: browsImage,
      link: "/servicos/sobrancelhas",
    },
    {
      title: "Progressiva Premium",
      description: "Alisamento e tratamento capilar com produtos de alta qualidade para cabelos lisos, sedosos e saudáveis.",
      image: progressiveImage,
      link: "/servicos/progressiva",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Nossos Serviços</h1>
          <p className="text-xl text-muted-foreground">
            Procedimentos especializados com produtos premium e técnicas avançadas para resultados excepcionais
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto bg-secondary rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Dúvidas Sobre Nossos Serviços?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Entre em contato conosco para receber orientações personalizadas e agendar uma avaliação gratuita. 
            Estamos aqui para ajudá-la a escolher o procedimento ideal para você!
          </p>
          <a
            href="https://wa.me/5521966403811?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20serviços."
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500 hover:text-yellow-600 font-semibold text-lg transition-colors"
          >
            Fale Conosco no WhatsApp →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;
