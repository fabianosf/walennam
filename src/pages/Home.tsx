import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import AmazonProductCard from "@/components/AmazonProductCard";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { products as staticProducts, getAffiliateLink } from "@/data/products";
import { useProducts as useProductsFirestore } from "@/hooks/useProducts";
import walennaImage from "@/assets/walenna.jpg";
import heroImage from "@/assets/hero-banner.jpg";
import lashesImage from "@/assets/service-lashes.jpg";
import browsImage from "@/assets/service-brows.jpg";
import progressiveImage from "@/assets/service-progressive.jpg";

const Home = () => {
  const { products: firestoreProducts } = useProductsFirestore();

  const services = [
    {
      title: "Alongamento de Cílios",
      description: "Realce seu olhar com cílios volumosos e alongados, proporcionando um efeito natural e duradouro.",
      image: lashesImage,
      link: "/servicos/cilios",
    },
    {
      title: "Design de Sobrancelhas",
      description: "Moldamos suas sobrancelhas com técnicas avançadas para um visual harmonioso e marcante.",
      image: browsImage,
      link: "/servicos/sobrancelhas",
    },
    {
      title: "Progressiva Premium",
      description: "Cabelos lisos, sedosos e brilhantes com tratamento de alta qualidade e longa duração.",
      image: progressiveImage,
      link: "/servicos/progressiva",
    },
  ];

  const testimonials = [
    {
      name: "Mariana Silva",
      text: "Experiência impecável! Meus cílios ficaram perfeitos e naturais. Atendimento cinco estrelas!",
    },
    {
      name: "Juliana Costa",
      text: "A melhor progressiva que já fiz! Meu cabelo nunca esteve tão liso e brilhante. Super recomendo!",
    },
    {
      name: "Fernanda Oliveira",
      text: "Minhas sobrancelhas ficaram lindas! Profissionalismo e atenção aos detalhes excepcionais.",
    },
  ];

  const benefits = [
    "Profissional qualificada e experiente",
    "Produtos de alta qualidade e seguros",
    "Ambiente acolhedor e higienizado",
    "Atendimento personalizado",
    "Resultados naturais e duradouros",
    "Agendamento online facilitado",
  ];

  // Usa produtos reais do Firestore se disponíveis
  const homeProducts = firestoreProducts.length > 0 ? firestoreProducts : staticProducts;

  // Produtos em destaque para a home (prioriza produtos com badge, depois preenche até 4)
  const featuredProductsWithBadge = homeProducts.filter((p) => p.badge).slice(0, 4);
  const remainingSlots = 4 - featuredProductsWithBadge.length;
  const featuredProducts = [
    ...featuredProductsWithBadge,
    ...homeProducts.filter((p) => !p.badge).slice(0, remainingSlots),
  ].slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroImage})`,
          }}
        />
        <div className="relative z-10 container mx-auto px-4 text-center text-white animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            Realce Sua Beleza Natural
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light">
            Transforme seu olhar e cabelos com procedimentos premium de cílios, sobrancelhas e progressiva
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-lg px-10 py-6" asChild>
              <Link to="/contato">
                Agende Sua Transformação <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-10 py-6 bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-foreground" asChild>
              <Link to="/portfolio">Ver Portfólio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="relative">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-xl ring-2 ring-primary/10 bg-white">
                <img src={walennaImage} alt="Walenna Mello, especialista do Beleza Refinada" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <Sparkles className="h-12 w-12 text-primary mb-6 mx-auto md:mx-0" />
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Bem-vinda ao Beleza Refinada</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sou Walenna Mello, especialista em realçar a beleza natural de cada mulher através de procedimentos estéticos de alta qualidade.
                Com anos de experiência e dedicação, ofereço serviços personalizados de extensão de cílios, design de sobrancelhas
                e progressiva capilar, sempre buscando resultados impecáveis que valorizam sua autoestima e confiança.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Meus Serviços</h2>
            <p className="text-lg text-muted-foreground">Procedimentos especializados para realçar sua beleza</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-12 text-center">Por Que Escolher o Beleza Refinada?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">O Que Minhas Clientes Dizem</h2>
            <p className="text-lg text-muted-foreground">Depoimentos reais de clientes satisfeitas</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Products Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Produtos Recomendados
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Selecionamos alguns itens do nosso catálogo de <Link to="/produtos" className="text-primary underline underline-offset-4">Produtos Recomendados</Link> para você manter os cuidados em casa com a mesma qualidade do estúdio.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-8">
            {featuredProducts.map((product) => (
              <AmazonProductCard
                key={product.id}
                title={product.title}
                description={product.description}
                image={product.image}
                price={product.price}
                rating={product.rating}
                affiliateLink={getAffiliateLink(product.asin)}
                badge={product.badge}
                videoUrl={product.videoUrl}
              />
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" size="lg" className="text-lg px-10 py-6" asChild>
              <Link to="/produtos">Ver Todos os Produtos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-rose-gold text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Pronta Para Realçar Sua Beleza?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Agende seu horário agora e descubra como podemos transformar seu olhar e cabelos
          </p>
          <Button variant="elegant" size="lg" className="text-lg px-10 py-6" asChild>
            <Link to="/contato">
              Agende Seu Horário Agora <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
