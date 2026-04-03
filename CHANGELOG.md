# Changelog

Todas as mudanças importantes deste projeto serão documentadas neste arquivo.

---

## [v0.1.0] - 2026-03-29

### ✨ Added
- criação da estrutura base do projeto com Next.js 15, TypeScript e Tailwind CSS
- implementação da página home com projetos em destaque
- criação da página `/projects` com listagem em grid responsivo
- criação da rota dinâmica `/projects/[slug]` com renderização MDX via `next-mdx-remote/rsc`
- suporte a conteúdo MDX com frontmatter completo (`slug`, `summary`, `stack`, `status`, `featured`, `order`, `github`, `demo`)
- adição de 2 projetos de exemplo: API Gateway Service e Pipeline de Analytics em Tempo Real
- página 404 customizada

### 🎨 UI
- componente `ProjectCard` com imagem, resumo e stack
- componente `Header` com navegação responsiva
- layout simples e profissional com Tailwind CSS
- hierarquia visual clara em todas as páginas

### 🔧 Config
- configuração do Tailwind CSS com `@tailwindcss/typography`
- configuração do `next.config.ts` com suporte a SVG
- `vercel.json` com framework, build e install commands
- `engines.node >=20.0.0` no `package.json`

### 🚀 Deploy
- configuração inicial de deploy na Vercel

### 🧹 Refactor (v0.1.0 → alinhamento com bases de conhecimento)
- reestruturação de `components/` em subpastas `layout/` e `project/`
- renomeação de arquivos para `kebab-case` (`header.tsx`, `project-card.tsx`)
- migração de `export default function` para `export function` em componentes
- centralização da lógica de dados em `lib/projects.ts` com contrato completo
- atualização do frontmatter MDX para seguir contrato definido na arquitetura
- reescrita dos projetos de exemplo com as 9 seções obrigatórias do template
- reorganização de imagens em `public/images/projects/<slug>/cover.svg`
- movimentação de `globals.css` para `styles/`
- atualização de `next-mdx-remote` 5.0.0 → 6.0.0 (CVE-2026-0969)

---

## [v0.1.1] - 2026-03-29

### ✨ Added
- adicionado projeto real "Journey Lab — REST Countries API" com GitHub link
- criado utilitário `lib/tag-colors.ts` para cores determinísticas por tag
- adicionada pasta `public/images/projects/rest-countries-api/` com cover SVG

### 🔄 Changed
- substituído projeto fictício "Pipeline de Analytics em Tempo Real" pelo projeto real Journey Lab
- corrigido nome do autor: "Caio Andrade" → "Caio Bomfim Godoy" em header, metadata e home
- tags de stack agora exibem cores distintas por tecnologia (ProjectCard e página de projeto)
- adicionado `./lib/**/*.{ts,tsx}` ao `content` do Tailwind para incluir classes de cor

### 🧹 Refactor
- removida pasta `public/images/projects/real-time-analytics-pipeline/`

---

## [v0.1.2] - 2026-03-29

### 📚 Docs
- reescrito `README.md` com stack, estrutura de pastas, instruções de execução local, guia para adicionar novo projeto e instruções de deploy

---

## [v0.1.3] - 2026-03-29

### ✨ Added
- adicionado projeto real "Journey Lab — Sistema de Título de Capitalização" com 9 seções completas
- criada pasta `public/images/projects/capitalization-system/` com cover SVG (diagrama da arquitetura event-driven)

### 🔄 Changed
- substituído projeto fictício "API Gateway Service" pelo projeto real de capitalização
- projeto de capitalização definido como `featured: true` e `order: 1`

### 🧹 Refactor
- removida pasta `public/images/projects/api-gateway-service/`

---

## [v0.2.0] - 2026-04-01

### ✨ Added
- sistema de filtro por tags na página `/projects` com suporte a múltiplas tags simultâneas (lógica OR)
- componente `TagBadge` — badge reutilizável com modo display (`<span>`) e modo interativo (`<button aria-pressed>`)
- componente `TagFilter` — barra de chips clicáveis com botão "Limpar filtros"
- componente `ProjectsSection` — wrapper client-side com estado de filtro e sincronização via URL query params (`?tags=backend,testes`)
- utilitário `lib/tags.ts` com `extractAllTags` e `filterProjectsByTags`
- utilitário `lib/stack-icons.ts` com mapeamento de tech names → slugs do Simple Icons
- componente `StackIcon` — renderiza ícones SVG de marca para tecnologias conhecidas, com fallback em texto monospace para as demais
- suporte a query params para persistência de filtro no refresh e URLs compartilháveis

### 🔄 Changed
- substituídos os badges de texto da stack nos cards por ícones SVG via `simple-icons` (Server Component — zero JS no cliente)
- `app/projects/page.tsx` refatorado para ler `searchParams` no servidor e repassar `initialTags` ao componente client
- `project-card.tsx` atualizado para usar `StackIcon` no lugar das `<span>` com `getTagColor`

### 📦 Dependencies
- adicionado `simple-icons@^16.14.0`
- removido `react-icons` (substituído integralmente por `simple-icons`)

---

## [v0.3.0] - 2026-04-01

### ✨ Added
- sistema de busca local em tempo real na página `/projects` com filtro por `title`, `summary`, `slug`, `tags` e `stack`
- componente `SearchInput` — campo de busca com ícone de lupa, placeholder descritivo, foco visível e botão de limpar
- utilitário `lib/search.ts` com `normalizeText` (remoção de acentos via NFD), `searchProjects` e `filterProjects` (busca + tags combinados)
- hook `hooks/use-debounce.ts` — debounce de 200ms para manter o input responsivo sem reprocessamentos excessivos
- estado vazio com ações contextuais: "Limpar busca" e/ou "Limpar filtros de tag" conforme o que estiver ativo
- suporte a query param `?search=` na URL — compatível com `?tags=` (ex: `/projects?search=spring&tags=backend`)
- persistência do termo de busca no refresh via `searchParams` lido no servidor

### 🔄 Changed
- `ProjectsSection` expandido para gerenciar estado de busca e tags em um único componente com URL sync unificado
- lógica de filtro migrada para `filterProjects` em `lib/search.ts` — combina busca textual (primeiro) e filtro de tags (segundo, OR)
- `app/projects/page.tsx` atualizado para ler e repassar `initialQuery` além de `initialTags`
- mensagem de contagem dinâmica: "N projetos encontrados" quando há filtro ativo vs. "N projetos publicados"

---

## [v0.6.0] - 2026-04-02

### ✨ Added
- filtro por status na página `/certifications`: All / Active / Completed / Expired
- agrupamento das certificações por entidade certificadora com contador dinâmico por grupo
- contador por grupo reflete o filtro ativo (grupos vazios são omitidos automaticamente)
- novo componente `CertificationsSection` (client component) responsável pelo estado de filtro, agrupamento e renderização
- função `groupByIssuer()` em `lib/certifications.ts` para agrupar certificações por issuer preservando ordem de inserção
- acessibilidade: botões de filtro com `aria-pressed` e `role="group"` com label descritivo

### 🔄 Changed
- `app/certifications/page.tsx` delegou a renderização interativa ao `CertificationsSection`, mantendo-se como Server Component
- layout da listagem agora é organizado por issuer em vez de lista plana

---

## [v0.5.0] - 2026-04-02

### ✨ Added
- 11 certificações reais substituindo os dados mockados da v0.4.0: 3 AWS (Cloud Practitioner, Developer Associate, Solutions Architect Associate), 5 Itaú Unibanco (Change Management, Engenharia do Caos, D&A Foundation, Qualidade em Mudanças, SRE) e 3 Certiprof (LGPD, Lifelong Learning, SFPC)
- campo `badgeUrl` na interface `Certification` para suporte a imagens de badge personalizadas
- campos `issuedDate` e `expirationDate` separados (substituindo `issueDate` único) para controle preciso de datas por tipo de status
- imagens de badge reais em `public/images/certifications/` para todas as 11 certificações
- prefixos de data contextuais: `Expires` (ativas), `Issued` (concluídas), `Expired` (expiradas)

### 🔄 Changed
- tipo `CertificationStatus` migrado de `'Concluída' | 'Em andamento' | 'Expirada'` para `'active' | 'completed' | 'expired'`
- layout do `CertificationCard` redesenhado: badge à esquerda (96px) e conteúdo à direita em duas colunas, inspirado no Credly
- ordem do conteúdo no card: certificadora → título → data → badge de status
- grid da página `/certifications` ajustado para `grid-cols-1 sm:grid-cols-2`
- certificações Itaú usam logo unificado `itau.png`; certificações Certiprof usam logo unificado `certiprof.png`
- `getCertifications()` ordena por status (active → completed → expired) e por data decrescente dentro de cada grupo
- data formatada em inglês (`en-US`) com dia, mês abreviado e ano

### 🗑️ Removed
- campo `description` da interface `Certification` e da renderização do card
- lookup de ícones via `simple-icons` para emissores (substituído por `badgeUrl`)

---

## [v0.4.0] - 2026-04-01

### ✨ Added
- nova página `/certifications` com grade responsiva de cards de certificações
- componente `CertificationCard` — exibe ícone do emissor via `simple-icons`, título, data, badge de status e link para credencial
- tipo `Certification` e `CertificationStatus` (`'Concluída' | 'Em andamento' | 'Expirada'`) em `lib/certifications.ts`
- função `getCertifications()` que retorna certificações ordenadas por status e data
- 5 certificações mockadas de exemplo: AWS Solutions Architect, Google Cloud Data Engineer, HashiCorp Terraform Associate, Azure Fundamentals e CNCF Kubernetes
- link "Certificações" adicionado à navegação do `Header`

### 🎨 UI
- badge de status com cores semânticas: verde (Concluída), azul (Em andamento), cinza (Expirada)
- ícone do emissor renderizado via `simple-icons` com fallback de inicial para emissores sem ícone cadastrado
- link "Ver credencial" com ícone de abertura externa, acessível via `aria-label`
- grid `sm:grid-cols-2` responsivo, consistente com o restante do portfólio

---
