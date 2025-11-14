# Dashboard de Administração - Guia de Configuração

Este documento explica como configurar e usar o dashboard de administração para gerenciar produtos da Amazon.

## 📋 O que foi criado

1. **Sistema de Autenticação** - Login seguro com Firebase Authentication
2. **Dashboard de Administração** - Interface completa para gerenciar produtos
3. **CRUD de Produtos** - Criar, Ler, Atualizar e Deletar produtos
4. **Integração com Firestore** - Produtos salvos em banco de dados
5. **Rotas Protegidas** - Acesso restrito ao dashboard

## 🚀 Como Funciona

### Acesso ao Dashboard

1. Acesse: `http://seu-site.com/admin/login`
2. Faça login com email e senha
3. Após login, você será redirecionado para: `/admin/dashboard`

### Criar Conta de Administrador

**IMPORTANTE:** Na primeira vez, você precisa criar uma conta de administrador.

#### Opção 1: Criar via Código (Temporário)

Adicione temporariamente um botão de "Criar Conta" na página de login:

```typescript
// Em src/pages/AdminLogin.tsx, adicione após o botão de login:
<Button
  type="button"
  variant="outline"
  onClick={async () => {
    try {
      await signup(email, password);
      toast.success("Conta criada! Faça login.");
    } catch (error) {
      toast.error("Erro ao criar conta");
    }
  }}
>
  Criar Conta
</Button>
```

#### Opção 2: Criar via Console do Firebase (Recomendado)

1. Acesse o [Console do Firebase](https://console.firebase.google.com)
2. Selecione seu projeto: `walennam-63019`
3. Vá em **Authentication** → **Users**
4. Clique em **Add User**
5. Preencha email e senha
6. Clique em **Add User**

Agora você pode fazer login com essas credenciais!

## 📝 Configuração do Firebase

### 1. Habilitar Authentication

1. Acesse o [Console do Firebase](https://console.firebase.google.com)
2. Selecione seu projeto
3. Vá em **Authentication** → **Get Started**
4. Clique em **Sign-in method**
5. Habilite **Email/Password**
6. Clique em **Save**

### 2. Configurar Firestore

1. No Console do Firebase, vá em **Firestore Database**
2. Clique em **Create database**
3. Escolha **Start in test mode** (para desenvolvimento)
4. Selecione uma localização (ex: `southamerica-east1` - São Paulo)
5. Clique em **Enable**

**⚠️ IMPORTANTE:** Para produção, configure regras de segurança:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura pública de produtos
    match /amazon_products/{productId} {
      allow read: if true;
      allow write: if request.auth != null; // Apenas usuários autenticados podem escrever
    }
  }
}
```

## 🎯 Como Usar o Dashboard

### Adicionar Produto

1. Faça login no dashboard: `/admin/login`
2. Clique em **Adicionar Produto**
3. Preencha os campos:
   - **Título**: Nome do produto
   - **Descrição**: Descrição do produto
   - **Categoria**: Beleza, Roupas, Sapatos ou Saúde
   - **ASIN**: Código ASIN do produto na Amazon (ex: B08XXXXXXX)
   - **Preço**: Preço formatado (ex: R$ 99,90)
   - **URL da Imagem**: URL da imagem do produto
   - **Avaliação**: Avaliação de 0 a 5 (ex: 4.5)
   - **Badge**: Opcional - "Mais Vendido" ou "Recomendado"
4. Clique em **Adicionar**

### Editar Produto

1. No dashboard, encontre o produto na tabela
2. Clique no ícone de **Editar** (lápis)
3. Modifique os campos desejados
4. Clique em **Atualizar**

### Deletar Produto

1. No dashboard, encontre o produto na tabela
2. Clique no ícone de **Deletar** (lixeira)
3. Confirme a exclusão

## 🔗 Obtendo Links da Amazon

### 1. Encontrar o ASIN

1. Acesse o produto na Amazon
2. Veja a URL: `https://amazon.com.br/dp/B08XXXXXXX`
3. O ASIN é o código após `/dp/` (ex: `B08XXXXXXX`)

### 2. Gerar Link de Afiliado

#### Opção 1: Site Builder da Amazon (Recomendado)

1. Acesse [Amazon Associates](https://associates.amazon.com.br)
2. Vá em **Ferramentas** → **Site Builder**
3. Cole o ASIN ou URL do produto
4. Personalize o link
5. Copie o link gerado

#### Opção 2: Gerar Manualmente

Use o formato:
```
https://amazon.com.br/dp/{ASIN}?tag={SEU_TAG}
```

**IMPORTANTE:** Configure seu tag de afiliado em `src/data/products.ts`:
```typescript
export const AFFILIATE_TAG = "SEU_TAG_AQUI"; // Exemplo: "walenna-20"
```

### 3. Obter URL da Imagem

1. Na página do produto na Amazon
2. Clique com botão direito na imagem
3. Selecione **Copiar endereço da imagem**
4. Cole no campo "URL da Imagem"

## 🔐 Segurança

### Proteção de Rotas

- O dashboard está protegido com autenticação
- Apenas usuários autenticados podem acessar
- Usuários não autenticados são redirecionados para `/admin/login`

### Regras do Firestore

Para produção, configure regras de segurança no Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /amazon_products/{productId} {
      // Leitura pública (qualquer um pode ler)
      allow read: if true;
      
      // Escrita apenas para usuários autenticados
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

## 📱 Estrutura do Sistema

```
/admin/login          → Página de login
/admin/dashboard      → Dashboard de administração (protegido)

/produtos             → Página pública com produtos do Firestore
```

## 🎨 Funcionalidades do Dashboard

- ✅ Listar todos os produtos
- ✅ Adicionar novos produtos
- ✅ Editar produtos existentes
- ✅ Deletar produtos
- ✅ Visualizar produtos por categoria
- ✅ Buscar produtos
- ✅ Links diretos para o site público
- ✅ Logout seguro

## 🐛 Troubleshooting

### Erro: "Firebase: Error (auth/user-not-found)"

- Certifique-se de que criou a conta no Firebase Console ou via código

### Erro: "Firebase: Error (auth/wrong-password)"

- Verifique se a senha está correta
- Tente resetar a senha no Firebase Console

### Produtos não aparecem no site

- Verifique se os produtos foram salvos no Firestore
- Verifique o console do navegador para erros
- Certifique-se de que as regras do Firestore permitem leitura pública

### Erro ao salvar produto

- Verifique se está logado
- Verifique se todos os campos obrigatórios foram preenchidos
- Verifique o console do navegador para erros específicos

## 📚 Próximos Passos

1. ✅ Criar conta de administrador
2. ✅ Configurar regras do Firestore
3. ✅ Adicionar seus primeiros produtos
4. ✅ Configurar tag de afiliado da Amazon
5. ✅ Testar o fluxo completo

## 💡 Dicas

- **Backup**: Faça backup regular dos produtos exportando do Firestore
- **Organização**: Use badges para destacar produtos populares
- **Imagens**: Use URLs diretas da Amazon para melhor performance
- **Preços**: Atualize preços periodicamente (eles podem mudar na Amazon)
- **Categorias**: Use categorias consistentes para melhor organização

---

**Precisa de ajuda?** Consulte a documentação do Firebase ou entre em contato com o desenvolvedor.

