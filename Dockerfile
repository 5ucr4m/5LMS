# Etapa 1: Construindo o aplicativo
FROM node:18-alpine AS builder

# Definir diretório de trabalho no container
WORKDIR /app

# Copiar arquivos de configuração do projeto
COPY package.json yarn.lock ./

# Instalar dependências
RUN yarn install --frozen-lockfile

# Copiar o restante dos arquivos do projeto
COPY . .

# Construir o aplicativo Next.js
RUN yarn build

# Etapa 2: Executar o aplicativo
FROM node:18-alpine

# Definir diretório de trabalho no container
WORKDIR /app

# Copiar arquivos de configuração do projeto
COPY package.json yarn.lock ./

# Instalar apenas dependências de produção
RUN yarn install --production --frozen-lockfile

# Copiar o build do aplicativo da etapa anterior
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Definir variáveis de ambiente para o Next.js (ajustar conforme necessário)
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Expor a porta 3000
EXPOSE 3000

# Comando para executar o aplicativo
CMD ["yarn", "start"]
