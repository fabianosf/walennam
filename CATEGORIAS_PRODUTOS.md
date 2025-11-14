# Sistema Dinâmico de Categorias de Produtos

Este documento explica como funciona o sistema dinâmico de categorias e como adicionar novos produtos e categorias.

## 🎯 Como Funciona

O sistema é **completamente dinâmico**: quando você adiciona um produto com uma nova categoria, ela aparece automaticamente na página de produtos, sem precisar modificar o código de categorias.

## 📁 Arquivo Principal

Todos os produtos e configurações de categorias estão centralizados em:
```
src/data/products.ts
```

## ➕ Como Adicionar um Novo Produto

1. Abra o arquivo `src/data/products.ts`
2. Adicione um novo objeto no array `products`:

```typescript
{
  id: 9, // Use um ID único (próximo número sequencial)
  title: "Nome do Produto",
  description: "Descrição do produto",
  image: "URL_DA_IMAGEM", // URL da imagem do produto
  price: "R$ 99,90",
  rating: 4.8, // Avaliação (0 a 5)
  asin: "B09XXXXXXX", // ASIN do produto na Amazon
  badge: "Mais Vendido", // Opcional: "Mais Vendido", "Recomendado", ou undefined
  category: "nome-da-categoria", // Use uma categoria existente ou crie uma nova
}
```

**Exemplo:**
```typescript
{
  id: 9,
  title: "Base Líquida Alta Cobertura",
  description: "Base de alta cobertura para pele perfeita",
  image: "https://m.media-amazon.com/images/I/71abc123xyz._AC_SX679_.jpg",
  price: "R$ 89,90",
  rating: 4.8,
  asin: "B09FFFFFFF",
  badge: "Recomendado",
  category: "maquiagem", // Nova categoria!
}
```

## 🆕 Como Criar uma Nova Categoria

### Passo 1: Adicionar Nome Amigável (Opcional mas Recomendado)

No arquivo `src/data/products.ts`, encontre o objeto `categoryNames` e adicione:

```typescript
export const categoryNames: Record<string, string> = {
  "cuidados-cilios": "Cuidados com Cílios",
  "cuidados-sobrancelhas": "Cuidados com Sobrancelhas",
  "cuidados-progressiva": "Cuidados Progressivos",
  "maquiagem": "Maquiagem", // Nova categoria!
  // ... outras categorias
};
```

### Passo 2: Adicionar Produto com a Nova Categoria

Simplesmente adicione um produto usando a nova categoria. A categoria será criada automaticamente!

```typescript
{
  id: 10,
  title: "Produto Novo",
  // ... outros campos
  category: "maquiagem", // A categoria será criada automaticamente
}
```

**Resultado:** A categoria "Maquiagem" aparecerá automaticamente no filtro da página de produtos!

## 📝 Convenções de Nome de Categorias

Recomendamos usar nomes em **minúsculas** e **com hífens**:
- ✅ `cuidados-cilios`
- ✅ `maquiagem`
- ✅ `skincare`
- ❌ `Cuidados_Cílios` (evite)
- ❌ `Cuidados Cílios` (evite espaços)

## 🔄 Categorias Existentes

As categorias padrão já configuradas são:

- `cuidados-cilios` → "Cuidados com Cílios"
- `cuidados-sobrancelhas` → "Cuidados com Sobrancelhas"
- `cuidados-progressiva` → "Cuidados Progressivos"

## 💡 Dicas

1. **Categorias sem nome amigável**: Se você não adicionar um nome no `categoryNames`, o sistema criará um nome automaticamente a partir do ID da categoria (ex: `maquiagem` → "Maquiagem")

2. **Múltiplos produtos na mesma categoria**: Adicione quantos produtos quiser em uma categoria

3. **Badges**: Use `badge: "Mais Vendido"` ou `badge: "Recomendado"` para destacar produtos especiais

4. **Categorias ordenadas**: As categorias aparecem em ordem alfabética automaticamente

## 🎨 Exemplo Completo

```typescript
// src/data/products.ts

// 1. Adicionar nome da categoria (opcional)
export const categoryNames: Record<string, string> = {
  "cuidados-cilios": "Cuidados com Cílios",
  "cuidados-sobrancelhas": "Cuidados com Sobrancelhas",
  "cuidados-progressiva": "Cuidados Progressivos",
  "maquiagem": "Maquiagem",
  "skincare": "Skincare",
};

// 2. Adicionar produtos
export const products: Product[] = [
  // ... produtos existentes
  {
    id: 11,
    title: "Protetor Solar FPS 50",
    description: "Protetor solar de alta proteção para rosto",
    image: "https://m.media-amazon.com/images/I/71xyz123abc._AC_SX679_.jpg",
    price: "R$ 79,90",
    rating: 4.9,
    asin: "B09GGGGGGG",
    badge: "Mais Vendido",
    category: "skincare", // Nova categoria será criada automaticamente!
  },
];
```

## ✅ Checklist para Adicionar Produtos

- [ ] Abrir `src/data/products.ts`
- [ ] Adicionar nome amigável da categoria (se for nova) em `categoryNames`
- [ ] Adicionar produto no array `products` com a categoria desejada
- [ ] Verificar se o ASIN está correto
- [ ] Verificar se a URL da imagem está correta
- [ ] Testar no navegador: a nova categoria aparecerá automaticamente!

## 🚀 Resultado

Quando você adicionar um produto com uma nova categoria:
- ✅ A categoria aparecerá automaticamente no filtro
- ✅ O produto será exibido na categoria correta
- ✅ Não precisa modificar outros arquivos!

---

**Dúvidas?** Consulte o arquivo `src/data/products.ts` para ver exemplos completos!

