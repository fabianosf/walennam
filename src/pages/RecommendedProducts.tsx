import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import AmazonProductCard from "@/components/AmazonProductCard";
import { Button } from "@/components/ui/button";
import { products as staticProducts, getUniqueCategories, getAffiliateLink, categoryNames as staticCategoryNames } from "@/data/products";
import { useProducts as useProductsFirestore } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { Product } from "@/data/products";

const RecommendedProducts = () => {
  // Busca produtos do Firestore (banco de dados)
  const { products: firestoreProducts } = useProductsFirestore();
  // Busca categorias do Firestore
  const { categories: firestoreCategories } = useCategories();
  
  // Usa produtos do Firestore se disponível, senão usa produtos estáticos
  const allProducts: Product[] = firestoreProducts.length > 0 ? firestoreProducts : staticProducts;
  
  // Cria mapa de categorias: Firestore primeiro, depois estáticas
  const categoryMap = useMemo(() => {
    const map: Record<string, string> = { ...staticCategoryNames };
    firestoreCategories.forEach(cat => {
      map[cat.categoryId] = cat.name;
    });
    return map;
  }, [firestoreCategories]);
  
  // Obtém categorias combinando Firestore + produtos (garante exibição mesmo sem produtos)
  const dynamicCategories = useMemo(() => {
    const uniqueCategoryIds = new Set<string>();
    
    // Categorias padrão (garante que Beleza/Roupas/etc continuem aparecendo)
    staticProducts.forEach((product) => uniqueCategoryIds.add(product.category));

    // Categorias vindas da coleção (inclui recém-criadas)
    firestoreCategories.forEach((cat) => uniqueCategoryIds.add(cat.categoryId));
    // Categorias presentes nos produtos (estáticos ou Firestore)
    allProducts.forEach((product) => uniqueCategoryIds.add(product.category));

    return Array.from(uniqueCategoryIds).map((categoryId) => ({
      id: categoryId,
      name: categoryMap[categoryId] || categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace(/-/g, " "),
    }));
  }, [firestoreCategories, allProducts, categoryMap]);
  
  // Adiciona "Todos os Produtos" no início
  const categories = [
    { id: "all", name: "Todos os Produtos" },
    ...dynamicCategories.sort((a, b) => a.name.localeCompare(b.name)),
  ];

  const [selectedCategory, setSelectedCategory] = useState("all");

  // Obtém produtos filtrados por categoria
  const filteredProducts = selectedCategory === "all" 
    ? allProducts 
    : allProducts.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Produtos Recomendados
          </h1>
          <p className="text-xl text-muted-foreground">
            Produtos selecionados para complementar nossos serviços e manter seus resultados perfeitos
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full transition-all font-medium ${
                selectedCategory === category.id
                  ? "bg-primary text-white shadow-md"
                  : "bg-secondary text-foreground hover:bg-primary/10"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
            {filteredProducts.map((product) => (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              Nenhum produto encontrado nesta categoria.
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="max-w-4xl mx-auto mt-12 p-6 bg-muted rounded-xl text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Nota:</strong> Como afiliado da Amazon, ganhamos uma comissão por compras qualificadas. 
            Todos os produtos foram selecionados com base em qualidade e relevância para nossos serviços. 
            Os preços e disponibilidade podem variar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;

