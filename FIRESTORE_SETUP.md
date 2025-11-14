# Configuração do Firestore - Regras de Segurança

Este arquivo explica como configurar as regras de segurança do Firestore para permitir que o dashboard funcione corretamente.

## 🚨 Erro: "Missing or insufficient permissions"

Se você está vendo esse erro, significa que as regras do Firestore não estão configuradas corretamente.

## 📋 Como Configurar

### 1. Acesse o Console do Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Selecione seu projeto: `walennam-63019`

### 2. Vá para Firestore Database

1. No menu lateral, clique em **Firestore Database**
2. Clique na aba **Rules** (no topo)

### 3. Cole as Regras

Substitua as regras existentes por estas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura pública de produtos (qualquer um pode ver)
    match /amazon_products/{productId} {
      allow read: if true;
      // Apenas usuários autenticados podem criar, atualizar ou deletar
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

### 4. Publique as Regras

1. Clique em **Publish** (publicar)
2. Aguarde alguns segundos para as regras serem aplicadas

## ✅ O Que Essas Regras Fazem

- **Leitura pública**: Qualquer pessoa pode ver os produtos no site (necessário para o público)
- **Escrita protegida**: Apenas usuários autenticados (você, no dashboard) podem adicionar, editar ou deletar produtos

## 🔒 Segurança

Essas regras garantem que:
- ✅ Visitantes do site podem ver os produtos
- ✅ Apenas você (autenticado) pode gerenciar produtos
- ✅ Pessoas não autenticadas não podem modificar produtos

## ⚠️ Para Produção

Se você estiver em produção, considere regras mais restritivas, como:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /amazon_products/{productId} {
      // Leitura pública
      allow read: if true;
      
      // Escrita apenas para usuários autenticados
      // Opcional: você pode restringir a emails específicos
      allow create, update, delete: if request.auth != null;
      
      // Exemplo de restrição a email específico:
      // allow create, update, delete: if request.auth != null && 
      //   request.auth.token.email == "seu@email.com";
    }
  }
}
```

## 🧪 Teste

Após configurar as regras:

1. Recarregue o dashboard
2. Tente adicionar um produto
3. O erro de permissões deve desaparecer

---

**Arquivo de referência:** O arquivo `firestore.rules` na raiz do projeto contém as mesmas regras para referência.

