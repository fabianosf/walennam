import { useState } from "react";
import { Button } from "@/components/ui/button";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  
  const portfolioItems = [
    { id: 1, image: portfolio1, category: "cilios", title: "" },
    { id: 2, image: portfolio2, category: "sobrancelhas", title: "" },
    { id: 3, image: portfolio3, category: "cilios", title: "" },
    { id: 4, image: portfolio4, category: "sobrancelhas", title: "" },
    { id: 5, image: portfolio5, category: "progressiva", title: "" },
    { id: 6, image: portfolio6, category: "cilios", title: "" },
  ];

  const categories = [
    { id: "all", name: "Todos" },
    { id: "cilios", name: "Cílios" },
    { id: "sobrancelhas", name: "Sobrancelhas" },
    { id: "progressiva", name: "Progressiva" },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Portfólio</h1>
          <p className="text-xl text-muted-foreground">
            Inspire-se com nossos trabalhos e transformações reais de nossas clientes
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="min-w-[120px]"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white text-lg font-semibold p-6">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-secondary rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold mb-4">Gostou do Que Viu?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Agende seu horário e faça parte da nossa galeria de transformações incríveis!
          </p>
          <Button variant="hero" size="lg" className="text-lg px-10 py-6" asChild>
            <a href="https://wa.me/5521966403811?text=Olá!%20Gostaria%20de%20agendar%20um%20horário.">
              Agendar Agora via WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
