# Changelog

Todas as mudanças importantes deste projeto serão documentadas neste arquivo.

---

## [v1.5.1] - 2026-04-05

### 🐛 Fixed
- Cards de estudos: "Ler estudo →" e tempo de leitura separados em linha própria (`justify-between`) — eliminada sobreposição causada pelo `position: absolute`

---

## [v1.5.0] - 2026-04-05

### ✨ Added
- Nova seção `/studies` — base de conhecimento com cenários reais de engenharia de software
- Rota de listagem `/studies` com busca por texto (título + descrição + tags), filtro por tags e contagem de resultados
- Rota de detalhe `/studies/[slug]` com renderização MDX, badge de nível, tags coloridas e tempo de leitura estimado
- `lib/study-utils.ts` — tipos (`Study`, `StudyLevel`, `StudyWithContent`), `extractAllStudyTags` e `filterStudies` (client-safe, sem `fs`)
- `lib/studies.ts` — loader server-only com `getAllStudies`, `getStudyBySlug` e estimativa de tempo de leitura (palavras / 200)
- `components/study/StudyCard.tsx` — card com ícone de livro (violet), badge de nível (verde/âmbar/rose), tags (até 3 + overflow), tempo de leitura e indicador "Ler estudo"
- `components/study/StudiesSection.tsx` — client component com SearchInput, TagFilter, URL sync e estado vazio
- Link "Estudos" adicionado à navegação principal (entre Projetos e Certificações)
- 2 estudos de exemplo em `content/studies/`:
  - **Fanout com SNS + SQS na AWS** — padrão fanout, fluxo SNS → múltiplas filas SQS, permissões IAM, DLQ
  - **Cache com Redis em Microsserviços** — Cache-Aside, TTL, invalidação com `@CacheEvict`, thundering herd, chave multi-tenant

---

## [v1.4.0] - 2026-04-04

### ✨ Added
- Nova página `/reading` com livros e artigos técnicos organizados por status: Concluídos, Lendo e Quero ler
- Modelo de dados `ReadingItem` (`lib/reading.ts`) com campos `type`, `status`, `category`, `description`, `link`, `year`
- Cards com ícone por tipo (livro → âmbar, artigo → azul), chips de categoria, badge de status e link externo clicável
- 4 itens iniciais: Clean Architecture, Designing Data-Intensive Applications, AWS Well-Architected Framework, SRE Google
- Link "Leitura" adicionado à navegação principal

---

## [v1.3.6] - 2026-04-04

### 🎨 UI
- Listra colorida no topo de cada card de certificação identificando o emissor: AWS (#FF9900), CNCF (#0086FF), HashiCorp (#7B42BC), Datadog (#632CA6), Itaú Unibanco (laranja) e Certiprof (#003087)

---

## [v1.3.5] - 2026-04-04

### 🎨 UI
- Introduzida cor de accent `blue-600` em todo o site: botão "Ver projetos" (home), links "Ver todos →", link "Ver projeto →" nas cards (aparece no hover), e chip de status ativo nas certificações
- Nav link da página atual destacado em azul para indicar página ativa
- Borda esquerda colorida nos cards de stats de certificações (verde = Ativas, âmbar = Planejadas, azul = Concluídas, cinza = Expiradas)
- Borda de foco da barra de busca alterada para azul

---

## [v1.3.4] - 2026-04-04

### 🎨 UI
- Filtro de emissor na página de certificações substituído por um `<select>` combobox, eliminando a linha de chips e simplificando a UI do painel de filtros

---

## [v1.3.3] - 2026-04-04

### 🎨 UI
- Filtros da página de certificações reorganizados em um painel unificado com fundo sutil e divisores entre seções (Opção B); cada grupo agora tem um label "STATUS" e "EMISSOR" para eliminar ambiguidade visual entre os dois conjuntos de chips
- Label "Todos emissores" encurtado para "Todos" dentro do painel para melhor aproveitamento de espaço

---

## [v1.3.2] - 2026-04-04

### ✨ Added
- Certificação planejada **HashiCorp Certified: Terraform Associate** com badge oficial; novo emissor "HashiCorp" adicionado aos chips de filtro

---

## [v1.3.1] - 2026-04-04

### ✨ Added
- Certificação planejada **AWS Certified CloudOps Engineer – Associate** com badge oficial (substitui AWS SysOps Administrator, que foi descontinuada)
- Certificação planejada **AWS Certified AI Practitioner** com badge oficial
- Badge adicionado à certificação planejada **CKAD**
- Certificação planejada **Datadog Fundamentals** com badge oficial; novo emissor "Datadog" adicionado aos chips de filtro

### 🗑️ Removed
- Certificação planejada **AWS Certified SysOps Administrator – Associate** (certificação descontinuada pela AWS)
- Certificação planejada **AWS Certified DevOps Engineer – Professional** (descartada)

---

## [v1.3.0] - 2026-04-04

### ✨ Added
- **Painel de estatísticas** na página de certificações: cards com contagem de Total, Ativas, Planejadas, Concluídas e Expiradas — sempre refletindo o portfólio completo independente dos filtros ativos
- **Busca por nome** na página de certificações: campo de texto com filtragem em tempo real; combina com os demais filtros
- **Filtro por emissor**: chips dinâmicos gerados a partir dos dados (AWS, CNCF, Itaú Unibanco, Certiprof) — funciona em combinação com filtro de status e busca; estado vazio com mensagem "Nenhuma certificação encontrada."
- **Status `planned`** para certificações: novo status "Planejada" com badge âmbar e borda tracejada nos cards; adicionado ao tipo `CertificationStatus`, ao sort order e aos filtros de status
- Adicionadas 3 certificações planejadas: **AWS Certified SysOps Administrator – Associate**, **AWS Certified DevOps Engineer – Professional** e **Certified Kubernetes Application Developer (CKAD)**
- Campo `issuerShort` opcional na interface `Certification` para exibição abreviada nos chips de filtro (ex: "AWS" em vez de "Amazon Web Services Training and Certification")
- Correção no `next.config.ts`: adicionado `turbopack.root: __dirname` para resolver aviso de workspace root em ambientes com múltiplos lockfiles

### 🔧 Changed
- `CertificationsSection`: labels de filtro de status atualizados de inglês para português ("All" → "Todas", "Active" → "Ativas", etc.) para consistência com o restante da UI em português
- `CertificationCard`: remoção do hover shadow/border para cards com status `planned` (substituído por estilo de borda tracejada + opacidade reduzida)

---

## [v1.2.0] - 2026-04-04

### ✨ Added
- complementadas informações do projeto **REST Countries API** com base no código-fonte real (v0.1.0):
  - stack corrigida: Java 21, Spring Boot 3.4.8, Spring Cloud 2024.0.2; removido Testcontainers (não presente no v0.1.0); adicionados Lombok, OpenFeign e Spring Boot Actuator
  - summary atualizado para refletir o foco em **SRE e DevOps** (não apenas testes de integração)
  - seção de contexto reescrita para incluir o objetivo de migração para SRE/Cloud/DevOps
  - arquitetura atualizada com a interface `CountryServicePort` e WireMock via Docker Compose standalone
  - seção **API** adicionada: endpoint `GET /countries/{name}` e estrutura de resposta documentados
  - decisões técnicas revisadas: WireMock via Docker Compose (não Testcontainers), Records para DTOs
  - "Próximos Passos" substituído por **roadmap de releases** real (10 releases planejadas, v0.1 → v1.0)
- complementadas informações do projeto **ACME Policy Service** com base no README e CHANGELOG do repositório:
  - seção **Premissas e Decisões de Design** adicionada: contratos de eventos SQS, comportamento do WireMock com response templating, idempotência no cancelamento, decisões de consistência
  - seção **Cenários de Teste** adicionada com 4 cenários detalhados (REJECTED por fraude, APPROVED via eventos, REJECTED por pagamento negado, CANCELLED)
  - menção aos scripts shell (`tools/scripts/`) e à coleção Insomnia disponível em `docs/`

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

## [v1.1.1] - 2026-04-03

### ✨ Added
- imagem do diagrama de arquitetura do ecossistema de seguros (`desafio-arquitetura.png`) adicionada à página do ACME Policy Service

---

## [v1.1.0] - 2026-04-03

### ✨ Added
- documentação completa do projeto "ACME Policy Service" com 12 seções: Contexto, Problema, Solução, Arquitetura, Ciclo de Vida, Motor de Regras de Fraude, API, Stack Utilizada, Decisões Técnicas, Desafios, Aprendizados e Próximos Passos
- diagrama de arquitetura SVG em `public/images/projects/acme-policy-service/cover.svg` (hexagonal + event-driven)
- ícones de stack: `dynamodb.png`, `localstack.png`, `micrometer.png`, `opentelemetry.png` em `public/icons/stacks/`
- ícone `aws-sqs.png` substituído por versão otimizada (417KB → 27KB)
- mapeamentos adicionados em `lib/stack-assets.ts`: `dynamodb`, `localstack`, `micrometer`, `opentelemetry`
- `remark-gfm` para suporte a tabelas GitHub Flavored Markdown no `MDXRemote`

### 🔄 Changed
- `tailwind.config.ts`: sobrescrita das pseudo-classes `code::before` e `code::after` do `@tailwindcss/typography` para remover backticks no inline code; estilização contextual de `:not(pre) > code` com fundo cinza e variante dark

### 📦 Dependencies
- adicionado `remark-gfm@^4.0.1`

---

## [v1.0.0] - 2026-04-03

### ✨ Added
- modo escuro completo com suporte a preferência do sistema e toggle manual
- `next-themes` para gerenciamento de tema com persistência via `localStorage`
- `components/providers.tsx` — `ThemeProvider` com `attribute="class"`, `defaultTheme="system"` e `enableSystem`
- `components/layout/ThemeToggle.tsx` — botão com ícones `Sun`/`Moon` (lucide-react), proteção contra hydration mismatch

### 🔄 Changed
- `tailwind.config.ts`: adicionado `darkMode: 'class'`
- `styles/globals.css`: adicionado `dark:bg-gray-950 dark:text-gray-100` ao body
- `app/layout.tsx`: `<html>` com `suppressHydrationWarning`, layout envolvido pelo `Providers`, footer com variantes dark
- `components/layout/header.tsx`: variantes dark em todos os elementos + `ThemeToggle` ao lado da nav
- todos os componentes atualizados com variantes `dark:`: `ProjectCard`, `StackBadge`, `CertificationCard`, `CertificationsSection`, `SearchInput`, `TagFilter`, `ProjectsSection`
- `lib/tag-colors.ts`: paleta de tags com variantes dark (`dark:bg-*/30`, `dark:text-*-300`)
- `lib/project-icons.ts`: paletas contextuais dos ícones de projeto com variantes dark
- todas as páginas (`/`, `/projects`, `/certifications`, `/projects/[slug]`, `not-found`) com variantes dark
- conteúdo MDX com `dark:prose-invert`

### 🗑️ Removed
- ícone personalizado do OpenFeign removido (`openfeign.png` apagado, entrada removida de `stack-assets.ts`); OpenFeign retorna ao text badge

---

## [v0.9.0] - 2026-04-03

### ✨ Added
- biblioteca personalizada de ícones de stack em `public/icons/stacks/` com assets para Java, AWS SQS, OpenFeign, WireMock e Testcontainers
- `lib/stack-assets.ts` — mapa centralizado de stack name → asset local; adicionar novo ícone requer apenas colocar o arquivo e adicionar uma entrada
- `lib/project-icons.ts` — mapa de ícones de projeto via `lucide-react`, com paleta contextual por projeto (cor de fundo + borda + ícone)
- `components/project/StackBadge.tsx` — substitui `StackIcon` com resolução em 3 camadas: asset local → simple-icons → fallback texto

### 🔄 Changed
- ícone do projeto "Sistema de Título de Capitalização": `bitcoin` → `Landmark` (lucide-react, azul institucional)
- ícone do projeto "REST Countries API": `openstreetmap` → `Globe2` (lucide-react, verde-esmeralda)
- `project-card.tsx` atualizado para usar `StackBadge` e `getProjectIcon()` de `lib/project-icons.ts`
- `lib/stack-icons.ts` — adicionado mapeamento para `junit 5` / `junit5` (simple-icons `siJunit5`)
- stack do projeto "Sistema de Título de Capitalização": removidos `DDD` e `Clean Architecture`
- `ProjectCard` redesenhado: cantos `rounded-xl`, `shadow-sm`, hover com `shadow-md + -translate-y-0.5`, separador `border-t` antes da stack e indicador "Ver projeto →"
- `StackBadge`: tamanho `w-7 h-7`, `rounded-md`, fundo `gray-50` com borda `gray-100` — visual consistente entre ícones e texto

### 📦 Dependencies
- adicionado `lucide-react`

---

## [v0.8.0] - 2026-04-03

### ✨ Added
- seção "Certificações em destaque" na página home, exibida abaixo dos projetos em destaque
- campo `featured?: boolean` na interface `Certification` em `lib/certifications.ts`
- função `getFeaturedCertifications()` que filtra e retorna certificações marcadas como destaque
- 3 certificações AWS marcadas como `featured: true`: Cloud Practitioner, Developer – Associate e Solutions Architect – Associate
- link "Ver todas as certificações →" exibido quando há mais certificações além das em destaque

---

## [v0.7.0] - 2026-04-02

### ✨ Added
- campo `icon` no frontmatter dos projetos MDX para associar um ícone `simple-icons` a cada projeto
- parsing do campo `icon` em `lib/projects.ts`

### 🔄 Changed
- layout do `ProjectCard` redesenhado: ícone à esquerda (64px), título e resumo à direita, stack na parte inferior (full width)
- projeto "Sistema de Título de Capitalização" usa ícone `bitcoin`
- projeto "REST Countries API" usa ícone `openstreetmap`
- "Journey Lab —" removido dos títulos dos dois projetos

---

## [v0.6.2] - 2026-04-02

### 🎨 UI
- adicionado `app/favicon.ico` com ícone personalizado exibido na aba do navegador

---

## [v0.6.1] - 2026-04-02

### 🗑️ Removed
- removidas 8 imagens de badge não utilizadas de `public/images/certifications/`: `certiprof-lgpd.png`, `certiprof-lifelong-learning.png`, `certiprof-sfpc.png`, `itau-change-management.png`, `itau-dna-foundation.png`, `itau-engenharia-do-caos.png`, `itau-qualidade-em-mudancas.png`, `itau-sre.png`
- mantidas apenas as 5 imagens em uso: `aws-cloud-practitioner.png`, `aws-developer-associate.png`, `aws-solutions-architect-associate.png`, `itau.png`, `certiprof.png`

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
