# Micro SaaS - Next.js Project

Este projeto é uma aplicação Micro SaaS construída com **Next.js** e **React**, utilizando **TypeScript** para tipagem estática. Ele integra pagamentos e assinaturas via **Stripe**, com rotas e hooks específicos para checkout, portal do cliente e webhooks. O projeto também utiliza autenticação com **NextAuth**, além de integração com **Firebase**.

## Tecnologias Utilizadas

- **Next.js**: Estrutura de rotas, API routes, SSR/SSG.
- **React**: Componentização de interfaces.
- **TypeScript**: Tipagem estática para JavaScript.
- **Stripe**: Pagamentos e assinaturas.
- **NextAuth**: Autenticação de usuários.
- **Firebase**: Serviços backend.
- **CSS global**: Estilização.

## Principais Funcionalidades

- Autenticação de usuários
- Painel de controle (dashboard)
- Pagamentos avulsos e recorrentes (assinaturas)
- Portal Stripe para gerenciamento de pagamentos
- Webhooks para eventos Stripe

## Estrutura de Rotas

- `/` — Página inicial
- `/dashboard` — Painel do usuário
- `/login` — Autenticação
- `/payments` — Gerenciamento de pagamentos
- `/api/stripe/*` — Endpoints para integração Stripe (checkout, portal, assinatura, webhook)
- `/api/auth/*` — Endpoints de autenticação

O projeto está preparado para ser expandido com novas funcionalidades SaaS, mantendo uma arquitetura modular e escalável.

---

## Rotas|Api

A aplicação contém as rotas de API utilizadas para autenticação e integração com Stripe. Cada subpasta representa um endpoint específico:

### Autenticação

- **`/api/auth/[...nextauth]/route.ts`**
  Endpoint para autenticação de usuários utilizando NextAuth. Gerencia login, logout e sessões.

### Stripe

- **`/api/stripe/create-pay-checkout/route.ts`**
  Cria uma sessão de checkout para pagamentos avulsos via Stripe.

- **`/api/stripe/create-subscription-checkout/route.ts`**
  Cria uma sessão de checkout para assinaturas recorrentes via Stripe.

- **`/api/stripe/create-portal/route.ts`**
  Gera um link para o portal do cliente Stripe, permitindo ao usuário gerenciar seus pagamentos e assinaturas.

- **`/api/stripe/webhook/route.ts`**
  Endpoint para receber e processar webhooks de eventos do Stripe, como confirmação de pagamento, atualização de assinatura, etc.

---

## Como Executar

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

