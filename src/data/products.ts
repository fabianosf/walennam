// Configuração de produtos e categorias
// Para adicionar novos produtos, basta adicionar ao array products com a categoria desejada
// Para adicionar nomes amigáveis às categorias, adicione ao objeto categoryNames

// Tag de Afiliado da Amazon
export const AFFILIATE_TAG = "walenna81-20";

// Nomes amigáveis para as categorias (adicione novas categorias aqui conforme necessário)
export const categoryNames: Record<string, string> = {
  "beleza": "Beleza",
  "roupas": "Roupas",
  "sapatos": "Sapatos",
  "saude": "Saúde",
  // Adicione mais categorias conforme necessário
};

// Função para obter nome da categoria ou usar o ID como fallback
export const getCategoryName = (categoryId: string): string => {
  return categoryNames[categoryId] || categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace(/-/g, " ");
};

// Interface do produto
export interface Product {
  id: number | string;
  title: string;
  description: string;
  image: string;
  price: string;
  rating: number;
  asin: string;
  badge?: string;
  category: string; // Use a categoria que desejar, ela será criada automaticamente
  videoUrl?: string; // URL do vídeo (YouTube, Vimeo, ou vídeo direto) - opcional
}

// Array de produtos - Adicione novos produtos aqui conforme necessário
export const products: Product[] = [
  {
    id: 1,
    title: "Escova para Cílios - Kit Cuidados Pós-Procedimento",
    description: "Kit completo para cuidados diários dos cílios após extensão",
    image: "/placeholder-product.jpg",
    price: "R$ 29,90",
    rating: 4.5,
    asin: "B08XXXXXXX",
    badge: "Recomendado",
    category: "beleza",
  },
  {
    id: 2,
    title: "Removedor de Maquiagem para Olhos",
    description: "Removedor suave e eficaz, ideal para cílios extensos",
    image: "/placeholder-product.jpg",
    price: "R$ 45,00",
    rating: 4.8,
    asin: "B08YYYYYYY",
    badge: "Mais Vendido",
    category: "beleza",
  },
  {
    id: 3,
    title: "Pincel para Sobrancelhas Profissional",
    description: "Pincel de alta qualidade para modelagem de sobrancelhas",
    image: "/placeholder-product.jpg",
    price: "R$ 19,90",
    rating: 4.6,
    asin: "B08ZZZZZZZ",
    category: "beleza",
  },
  {
    id: 4,
    title: "Shampoo para Cabelos Progressivos",
    description: "Shampoo específico para manter os cabelos progressivos",
    image: "/placeholder-product.jpg",
    price: "R$ 39,90",
    rating: 4.7,
    asin: "B09AAAAAAA",
    badge: "Recomendado",
    category: "beleza",
  },
  {
    id: 5,
    title: "Protetor Térmico para Cabelos",
    description: "Proteção térmica antes do uso de chapinhas e secadores",
    image: "/placeholder-product.jpg",
    price: "R$ 52,90",
    rating: 4.9,
    asin: "B09BBBBBBB",
    category: "beleza",
  },
  {
    id: 6,
    title: "Hidratante Capilar Profundo",
    description: "Máscara de hidratação para cabelos progressivos",
    image: "/placeholder-product.jpg",
    price: "R$ 65,00",
    rating: 4.8,
    asin: "B09CCCCCCC",
    category: "beleza",
  },
  {
    id: 7,
    title: "Henna para Sobrancelhas",
    description: "Henna profissional para colorir e definir sobrancelhas",
    image: "/placeholder-product.jpg",
    price: "R$ 35,90",
    rating: 4.7,
    asin: "B09DDDDDDD",
    badge: "Mais Vendido",
    category: "beleza",
  },
  {
    id: 8,
    title: "Sérum para Cílios e Sobrancelhas",
    description: "Sérum fortalecedor para crescimento dos fios",
    image: "/placeholder-product.jpg",
    price: "R$ 58,00",
    rating: 4.6,
    asin: "B09EEEEEEE",
    category: "beleza",
  },
  // Produtos de exemplo para exibir as categorias Roupas, Sapatos e Saúde
  // Você pode substituir por produtos reais quando tiver os links da Amazon
  {
    id: 9,
    title: "Vestido Elegante",
    description: "Vestido perfeito para ocasiões especiais",
    image: "/placeholder-product.jpg",
    price: "R$ 199,90",
    rating: 4.7,
    asin: "B09FFFFFFF",
    category: "roupas",
  },
  {
    id: 10,
    title: "Calça Jeans Premium",
    description: "Calça jeans de alta qualidade e conforto",
    image: "/placeholder-product.jpg",
    price: "R$ 149,90",
    rating: 4.6,
    asin: "B09GGGGGGG",
    category: "roupas",
  },
  {
    id: 11,
    title: "Tênis Esportivo",
    description: "Tênis confortável para caminhadas e exercícios",
    image: "/placeholder-product.jpg",
    price: "R$ 299,90",
    rating: 4.8,
    asin: "B09HHHHHHH",
    category: "sapatos",
  },
  {
    id: 12,
    title: "Sandália Feminina",
    description: "Sandália elegante e confortável",
    image: "/placeholder-product.jpg",
    price: "R$ 129,90",
    rating: 4.5,
    asin: "B09IIIIIII",
    category: "sapatos",
  },
  {
    id: 13,
    title: "Multivitamínico Completo",
    description: "Suplemento vitamínico para saúde e bem-estar",
    image: "/placeholder-product.jpg",
    price: "R$ 89,90",
    rating: 4.7,
    asin: "B09JJJJJJJ",
    category: "saude",
  },
  {
    id: 14,
    title: "Medidor de Pressão Arterial",
    description: "Aparelho digital para medir pressão arterial",
    image: "/placeholder-product.jpg",
    price: "R$ 179,90",
    rating: 4.9,
    asin: "B09KKKKKKK",
    category: "saude",
  },
  // Adicione mais produtos aqui conforme necessário
  // Exemplo de nova categoria (será criada automaticamente):
  // {
  //   id: 9,
  //   title: "Base Líquida",
  //   description: "Base de alta cobertura",
  //   image: "/placeholder-product.jpg",
  //   price: "R$ 89,90",
  //   rating: 4.8,
  //   asin: "B09FFFFFFF",
  //   category: "maquiagem", // Nova categoria será criada automaticamente
  // },
];

// Função para gerar links de afiliado
export const getAffiliateLink = (asinOrUrl: string): string => {
  // Se já for uma URL completa, adiciona ou substitui a tag
  if (asinOrUrl.includes("http://") || asinOrUrl.includes("https://")) {
    try {
      const url = new URL(asinOrUrl);
      // Adiciona ou substitui a tag de afiliado
      url.searchParams.set("tag", AFFILIATE_TAG);
      return url.toString();
    } catch {
      // Se não conseguir fazer parse da URL, retorna como está
      return asinOrUrl;
    }
  }
  
  // Se for apenas ASIN, constrói a URL
  return `https://www.amazon.com.br/dp/${asinOrUrl}?tag=${AFFILIATE_TAG}`;
};

// Função para obter categorias únicas dos produtos
export const getUniqueCategories = (): Array<{ id: string; name: string }> => {
  const categorySet = new Set(products.map((p) => p.category));
  const categories = Array.from(categorySet).map((categoryId) => ({
    id: categoryId,
    name: getCategoryName(categoryId),
  }));
  
  // Ordena alfabeticamente pelo nome
  return categories.sort((a, b) => a.name.localeCompare(b.name));
};

// Função para obter produtos por categoria
export const getProductsByCategory = (categoryId: string): Product[] => {
  if (categoryId === "all") {
    return products;
  }
  return products.filter((product) => product.category === categoryId);
};

