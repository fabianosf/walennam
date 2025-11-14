# Configuração de Afiliados da Amazon

Este documento explica como configurar os links de afiliados da Amazon no site após ser aprovado no Amazon Associates.

## 📋 Pré-requisitos

1. Conta aprovada no [Amazon Associates](https://associates.amazon.com.br)
2. Tag de afiliado (ID de rastreamento) da Amazon
3. ASINs (Amazon Standard Identification Number) dos produtos que deseja recomendar

## 🔧 Passos para Configuração

### 1. Obter seu Tag de Afiliado

1. Acesse o painel do [Amazon Associates](https://associates.amazon.com.br)
2. Vá em **Ferramentas** → **Links de Produtos**
3. Copie seu **Tag de Afiliado** (exemplo: `walenna-20`)

### 2. Localizar o Arquivo que Precisa ser Atualizado

**🎉 IMPORTANTE:** Agora tudo está centralizado em **um único arquivo**!

Você precisará substituir o placeholder `SEU_TAG_AQUI` pelo seu tag real apenas em:

- `src/data/products.ts` - linha ~5

**Exemplo de substituição:**
```typescript
// ANTES
export const AFFILIATE_TAG = "SEU_TAG_AQUI";

// DEPOIS
export const AFFILIATE_TAG = "walenna-20"; // Seu tag real
```

**Isso atualizará todos os links de afiliado automaticamente em todo o site!**

### 3. Encontrar Produtos da Amazon

1. Acesse [amazon.com.br](https://amazon.com.br)
2. Procure produtos relacionados aos seus serviços:
   - **Cílios**: escovas, removedores, produtos de limpeza
   - **Sobrancelhas**: pincéis, henna, produtos de modelagem
   - **Progressiva**: shampoos, condicionadores, protetores térmicos, hidratantes

3. Para cada produto, encontre o **ASIN**:
   - Olhe a URL do produto: `https://amazon.com.br/dp/B08XXXXXXX`
   - O ASIN é o código após `/dp/` (exemplo: `B08XXXXXXX`)

### 4. Gerar Links de Afiliado

#### Opção 1: Site Builder (Recomendado)
1. No painel do Amazon Associates, vá em **Ferramentas** → **Site Builder**
2. Escolha o produto ou cole o ASIN
3. Personalize o link (texto, imagem, etc.)
4. Copie o link gerado

#### Opção 2: Gerar Manualmente
Use o formato:
```
https://amazon.com.br/dp/{ASIN}?tag={SEU_TAG}
```

Exemplo:
```
https://amazon.com.br/dp/B08XXXXXXX?tag=walenna-20
```

### 5. Atualizar os Produtos (Sistema Dinâmico)

**🎉 IMPORTANTE:** Agora todos os produtos estão centralizados em **um único arquivo**! 

#### Arquivo Principal: `src/data/products.ts`

Este é o único arquivo que você precisa editar para adicionar produtos. O sistema é dinâmico:
- ✅ Adicione produtos com qualquer categoria
- ✅ A categoria aparecerá automaticamente no filtro
- ✅ Não precisa modificar outros arquivos!

**Substitua os produtos de exemplo pelos produtos reais:**

```typescript
export const products: Product[] = [
  {
    id: 1,
    title: "Nome Real do Produto",
    description: "Descrição real do produto",
    image: "URL_DA_IMAGEM_DO_PRODUTO", // URL da imagem do produto na Amazon
    price: "R$ 29,90", // Preço atual (opcional, pode ser atualizado manualmente)
    rating: 4.5, // Avaliação do produto (opcional)
    asin: "B08XXXXXXX", // ASIN real do produto
    badge: "Recomendado", // Opcional: "Mais Vendido", "Recomendado"
    category: "cuidados-cilios", // Use categorias existentes ou crie novas
  },
  // Adicione mais produtos...
];
```

#### Adicionar Nome Amigável para Categorias

No mesmo arquivo (`src/data/products.ts`), adicione nomes amigáveis para novas categorias:

```typescript
export const categoryNames: Record<string, string> = {
  "cuidados-cilios": "Cuidados com Cílios",
  "cuidados-sobrancelhas": "Cuidados com Sobrancelhas",
  "cuidados-progressiva": "Cuidados Progressivos",
  "maquiagem": "Maquiagem", // Adicione novas categorias aqui
  // ... outras categorias
};
```

#### Sistema Dinâmico

- **Nova categoria?** Basta adicionar um produto com essa categoria - ela aparecerá automaticamente!
- **Produtos na home?** A home seleciona automaticamente produtos com badges ou os primeiros 4
- **Produtos por serviço?** São filtrados automaticamente baseado no serviço (cílios → cuidados-cilios, etc.)

**📖 Consulte o arquivo `CATEGORIAS_PRODUTOS.md` para um guia completo sobre como adicionar produtos e categorias!**

### 6. Obter Imagens dos Produtos

Você tem duas opções:

#### Opção 1: Usar Imagens da Amazon (via API)
As imagens estão disponíveis nas URLs da Amazon. Você pode usar a URL da imagem diretamente:
```
https://m.media-amazon.com/images/I/[CODIGO_DA_IMAGEM]._AC_SX679_.jpg
```

#### Opção 2: Hospedar suas Próprias Imagens
1. Baixe as imagens dos produtos
2. Coloque na pasta `public/`
3. Use o caminho relativo: `/nome-da-imagem.jpg`

### 7. Testar os Links

1. Inicie o servidor de desenvolvimento: `npm run dev`
2. Navegue até a página de produtos
3. Clique nos links para verificar se estão funcionando
4. Certifique-se de que os links incluem seu tag de afiliado

## 📝 Exemplo Completo

```typescript
// src/data/products.ts

// 1. Configure seu tag de afiliado
export const AFFILIATE_TAG = "walenna-20"; // Seu tag real

// 2. Adicione nomes amigáveis para categorias (opcional)
export const categoryNames: Record<string, string> = {
  "cuidados-cilios": "Cuidados com Cílios",
  "cuidados-sobrancelhas": "Cuidados com Sobrancelhas",
  "cuidados-progressiva": "Cuidados Progressivos",
};

// 3. Adicione seus produtos
export const products: Product[] = [
  {
    id: 1,
    title: "Escova para Cílios Profissional",
    description: "Kit completo para cuidados diários dos cílios após extensão",
    image: "https://m.media-amazon.com/images/I/71abc123xyz._AC_SX679_.jpg",
    price: "R$ 29,90",
    rating: 4.5,
    asin: "B08ABC1234",
    badge: "Recomendado",
    category: "cuidados-cilios", // A categoria aparecerá automaticamente!
  },
  // ... mais produtos
];

// A função getAffiliateLink já está configurada automaticamente!
```

**🎯 Vantagens:**
- ✅ Tudo em um único arquivo (`src/data/products.ts`)
- ✅ Categorias são criadas automaticamente
- ✅ Não precisa modificar múltiplos arquivos
- ✅ Sistema dinâmico e flexível

## ⚠️ Importante

1. **Disclosures**: O site já inclui avisos de afiliado automaticamente nos componentes
2. **Política da Amazon**: Siga todas as políticas do Amazon Associates
3. **Preços**: Os preços podem mudar na Amazon, considere atualizar periodicamente
4. **Imagens**: Use imagens com permissão ou diretamente da Amazon

## 🎯 Dicas para Aumentar Conversões

1. **Escolha produtos de qualidade**: Produtos bem avaliados convertem melhor
2. **Descrições relevantes**: Explique como o produto complementa seus serviços
3. **Badges**: Use badges como "Mais Vendido" e "Recomendado" estrategicamente
4. **Atualize regularmente**: Remova produtos esgotados e adicione novos
5. **Produtos relacionados**: Escolha produtos que façam sentido para cada serviço

## 📞 Suporte

Se tiver dúvidas sobre:
- **Amazon Associates**: [Central de Ajuda da Amazon](https://associates.amazon.com.br/help)
- **Código do site**: Consulte este README ou entre em contato com o desenvolvedor

