# Configuração de Administradores

Este documento explica como funciona o sistema de administradores e como adicionar novos administradores.

## 👤 Administrador Atual

O email `walennam@gmail.com` está configurado como administrador do sistema.

## 🔐 Como Funciona

O sistema verifica se o email do usuário está na lista de administradores autorizados antes de permitir o acesso ao dashboard.

## ➕ Adicionar Novo Administrador

Para adicionar um novo administrador, edite o arquivo:

**Arquivo:** `src/components/ProtectedRoute.tsx`

**Localização:** Linha ~9-12

```typescript
// Lista de emails autorizados como administradores
const ADMIN_EMAILS = [
  "walennam@gmail.com",
  "outro@email.com", // Adicione mais emails aqui
];
```

**Exemplo:**
```typescript
const ADMIN_EMAILS = [
  "walennam@gmail.com",
  "admin@exemplo.com",
  "gerente@exemplo.com",
];
```

## 📝 Passos para Adicionar Administrador

1. Abra o arquivo `src/components/ProtectedRoute.tsx`
2. Encontre a constante `ADMIN_EMAILS`
3. Adicione o novo email na lista
4. Salve o arquivo
5. Recarregue o dashboard

## ⚠️ Importante

- Os emails são verificados em **minúsculas** (case-insensitive)
- Apenas usuários que fizeram login no Firebase podem ser verificados
- Usuários não autorizados verão uma mensagem de "Acesso Negado"

## 🔒 Segurança

- Os emails são verificados no lado do cliente
- Para produção, considere implementar verificação no servidor
- Mantenha a lista de administradores segura e atualizada

## 🐛 Troubleshooting

### "Acesso Negado" mesmo estando logado

1. Verifique se o email está exatamente como no Firebase
2. Certifique-se de que o email está na lista `ADMIN_EMAILS`
3. Verifique se não há espaços extras no email
4. Os emails são comparados em minúsculas automaticamente

### Não consigo fazer login

1. Certifique-se de que o usuário existe no Firebase Authentication
2. Verifique se o email/senha estão corretos
3. Verifique se o Firebase Authentication está habilitado

---

**Nota:** O email `walennam@gmail.com` é o administrador principal do sistema.

