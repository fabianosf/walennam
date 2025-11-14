## Guia de Deploy na Hostinger (VPS)

Este projeto é um site React/Vite estático. Você pode gerar os arquivos de produção localmente e publicá-los em qualquer VPS, inclusive na Hostinger. Abaixo está um roteiro seguro para colocar o site em produção sem expor credenciais.

---

### 1. Pré-requisitos
- VPS Linux (Ubuntu 22.04 ou superior recomendado) já provisionada na Hostinger.
- Acesso SSH com usuário sudo (use chaves SSH sempre que possível).
- Domínio apontado para o IP público da VPS (registros DNS `A` e `AAAA` se usar IPv6).
- Máquina local com Node.js 18+ ou Bun 1+ para gerar o build.

---

### 2. Preparar a máquina local
1. (Opcional) Clonar o repositório diretamente na VPS:
   ```bash
   cd /var/www
   git clone <URL_DO_SEU_REPOSITORIO> walenna-site
   cd walenna-site
   ```
   - Recomendado usar chave SSH ou token de acesso em vez de senha.
   - Se o git pedir credenciais, configure-as com `git config --global user.name` e `git config --global user.email`.
   - Para atualizar versões futuras: `git pull origin main` (ou o branch que você usa).

2. Instale dependências:
   ```bash
   npm install
   # ou
   bun install
   ```
3. Gere o build de produção:
   ```bash
   npm run build
   # ou
   bun run build
   ```
4. Os arquivos finais ficarão em `dist/`. É este diretório que será enviado ao servidor.

---

### 3. Configurar o servidor (Execute via SSH)
> Substitua `<usuario>` e `<ip>` pelos valores reais da sua VPS.

```bash
ssh <usuario>@<ip>

# Atualize pacotes
sudo apt update && sudo apt upgrade -y

# Instale utilitários básicos
sudo apt install -y nginx ufw rsync curl
```

#### Firewall
```bash
sudo ufw allow OpenSSH
sudo ufw allow "Nginx Full"
sudo ufw enable
```

---

### 4. Publicar os arquivos estáticos
Se você gerou o build localmente e quer apenas enviar o `dist/`:

```bash
rsync -avz --delete dist/ <usuario>@<ip>:/var/www/walenna-site/
```

No servidor:
```bash
sudo chown -R www-data:www-data /var/www/walenna-site
sudo chmod -R 755 /var/www/walenna-site
```

---

### 5. Configurar o Nginx
1. Crie um arquivo de configuração:
   ```bash
   sudo nano /etc/nginx/sites-available/walenna-site.conf
   ```
2. Cole o conteúdo abaixo (ajuste o domínio no `server_name`):
   ```
   server {
       listen 80;
       listen [::]:80;
       server_name seu-dominio.com www.seu-dominio.com;

       root /var/www/walenna-site;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       location ~* \.(?:ico|css|js|gif|jpe?g|png|svg|woff2?)$ {
           expires 30d;
           access_log off;
       }

       error_page 404 /index.html;
   }
   ```
3. Habilite o site e recarregue:
   ```bash
   sudo ln -s /etc/nginx/sites-available/walenna-site.conf /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

---

### 6. Configurar HTTPS (Certbot + Let’s Encrypt)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com -d www.seu-dominio.com
```
O Certbot já cria a renovação automática (`systemctl status certbot.timer` para conferir).

---

### 7. Automatizar (opcional)
#### Deploy via Git Pull (rodando direto na VPS)
Se preferir construir o site já dentro da VPS (útil para CI/CD simples):
```bash
ssh <usuario>@<ip>
cd /var/www/walenna-site
git pull origin main
npm install --production=false   # ou bun install
npm run build
sudo chown -R www-data:www-data dist
sudo systemctl reload nginx
```

#### Deploy via script local e rsync
Crie um script de deploy local (`scripts/deploy.sh`) com:
```bash
#!/usr/bin/env bash
set -euo pipefail

npm run build
rsync -avz --delete dist/ <usuario>@<ip>:/var/www/walenna-site/
ssh <usuario>@<ip> "sudo systemctl reload nginx"
```
> Lembre-se de substituir `<usuario>` e `<ip>` ou usar variáveis de ambiente. Dê permissão de execução com `chmod +x scripts/deploy.sh`.

---

### 8. Checklist pós-deploy
- Acesse `https://seu-dominio.com` e verifique se o site carrega sem erros.
- Execute `sudo tail -f /var/log/nginx/access.log` para monitorar acessos.
- Utilize ferramentas externas (Ex.: [https://www.ssllabs.com/ssltest/](https://www.ssllabs.com/ssltest/)) para validar o certificado.
- Agende backups regulares dos arquivos e do DNS (exporte zona DNS da Hostinger).

---

### 9. Diagnóstico e Verificação de Acessibilidade

Se o site não estiver sendo encontrado por ferramentas externas (como Gemini, Google, etc.), verifique:

#### 9.1. Verificar se o site está acessível publicamente
```bash
# No servidor
curl -I http://localhost
curl -I https://localhost

# De uma máquina externa (seu computador local)
curl -I http://walennam.com.br
curl -I https://walennam.com.br
```

#### 9.2. Verificar configuração do Nginx
```bash
# Verificar se não há conflitos de server_name
sudo grep -r "walennam.com.br" /etc/nginx/sites-enabled/
sudo nginx -t

# Verificar logs de erro
sudo tail -50 /var/log/nginx/error.log
sudo tail -50 /var/log/nginx/access.log
```

#### 9.3. Verificar se os arquivos estão no lugar certo
```bash
ls -la /var/www/walenna-site/
# Deve ter index.html e os arquivos estáticos
```

#### 9.4. Verificar se HTTPS está configurado corretamente
```bash
# Se ainda não configurou HTTPS
sudo certbot --nginx -d walennam.com.br -d www.walennam.com.br

# Verificar certificado
sudo certbot certificates
```

#### 9.5. Verificar firewall
```bash
sudo ufw status
# Certifique-se de que as portas 80 e 443 estão abertas
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

#### 9.6. Verificar DNS
```bash
# Verificar se o DNS está apontando corretamente
dig walennam.com.br
nslookup walennam.com.br
# Deve retornar o IP do seu servidor (92.113.33.16)
```

#### 9.7. Testar acesso direto
- Acesse `http://walennam.com.br` no navegador (sem HTTPS se ainda não configurou)
- Acesse `https://walennam.com.br` no navegador (após configurar HTTPS)
- Verifique se não há redirecionamentos infinitos ou erros 400/502

#### 9.8. Verificar se o Nginx está servindo o conteúdo correto
```bash
# Verificar qual arquivo está sendo servido
sudo cat /etc/nginx/sites-available/walenna-site.conf

# Verificar se o root está correto
# Deve apontar para /var/www/walenna-site (ou dist/)
```

#### 9.9. Problemas comuns
- **400 Bad Request**: Verifique se o `server_name` está correto e se não há conflitos
- **502 Bad Gateway**: Verifique se não há `proxy_pass` apontando para serviços que não existem
- **Site não encontrado**: Verifique DNS e se o domínio está apontando para o IP correto
- **Gemini/ferramentas não encontram**: Certifique-se de que o site está acessível via HTTPS e que não há bloqueio de bots

---

### Boas práticas
- Nunca salve senhas em texto plano no repositório.
- Use `.env` para variáveis sensíveis e não faça commit delas.
- Crie usuários separados para cada site se hospedar múltiplos projetos na mesma VPS.
- Revise regras de firewall (UFW) sempre que abrir novos serviços.

Com esses passos você terá o site React servido com Nginx na Hostinger de forma segura e escalável. Ajuste conforme necessidades específicas (ex.: backend adicional, banco de dados ou CI/CD). 
