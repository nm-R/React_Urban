<div align="center">

<h1>Urbano+</h1>
<p><strong>Plataforma de mobilidade urbana colaborativa</strong><br/>Reporte ocorrências na cidade. Acompanhe o transporte público. Tudo em tempo real.</p>

[![Java](https://img.shields.io/badge/Java-21-orange?logo=openjdk&logoColor=white)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3-brightgreen?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://docs.docker.com/compose/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## Sobre o projeto

O **Urbano+** é uma plataforma web e mobile que conecta cidadãos e administração municipal em torno de dois problemas urbanos recorrentes: a falta de visibilidade sobre ocorrências na infraestrutura da cidade (buracos, alagamentos, iluminação, segurança) e a ausência de informações em tempo real sobre o transporte público.

Cidadãos reportam problemas com foto e geolocalização diretamente pelo mapa. Administradores revisam, aprovam ou rejeitam as ocorrências no painel de moderação. Ocorrências aprovadas ficam visíveis no mapa para toda a comunidade.

> Projeto Integrador V · Engenharia de Software · Unifio — Centro Universitário de Ourinhos  
> Orientador: Prof. Thiago Henrique Pereira Paiva · 2026

---

## Funcionalidades

| Cidadão | Administrador |
|---|---|
| Criar conta e fazer login | Aprovar ou rejeitar ocorrências (com motivo) |
| Reportar ocorrência com foto, categoria e raio | Moderar e remover comentários |
| Visualizar e filtrar ocorrências no mapa interativo | Bloquear usuários |
| Comentar em ocorrências existentes | Gerenciar rotas e horários de ônibus |
| Reabrir ocorrências expiradas | Painel com contadores por status |
| Acompanhar ônibus em tempo real | — |

---

## Stack

| Camada | Tecnologias |
|---|---|
| **Backend** | Java 21 · Spring Boot 3 · Spring Security · JWT · Spring Data JPA |
| **Banco de dados** | PostgreSQL 16 |
| **Frontend Web** | React 18 · Vite · React Router v6 · React Leaflet · Axios · Lucide React |
| **Mobile** | React Native · Expo · Axios · AsyncStorage · React Native Maps |
| **Infraestrutura** | Docker · Docker Compose · nginx (proxy reverso + SPA fallback) |

---

## Pré-requisitos

Antes de tudo, certifique-se de ter instalado:

- [Git](https://git-scm.com/downloads)
- [Docker Desktop](https://docs.docker.com/get-docker/) — já inclui o Docker Compose

> Para a **Opção 2** (desenvolvimento local com hot-reload), você também precisará do [Node.js 20+](https://nodejs.org/).

Não sabe se já tem? Rode no terminal:

```bash
git --version
docker --version
docker compose version
```

---

## Rodando o projeto

### Opção 1 — Docker (recomendado) ✅

Essa opção sobe **tudo de uma vez**: banco de dados, API e frontend. Não precisa instalar Java, Node ou configurar nada além do Docker.

**Passo 1 — Clone o repositório**

```bash
git clone https://github.com/nm-R/React_Urban.git
cd React_Urban
```

**Passo 2 — Crie o arquivo de configuração do backend**

O backend precisa de um segredo para assinar os tokens de autenticação (JWT). Você precisa criar um arquivo `.env` dentro da pasta `backend/` com esse valor.

No terminal, dentro da pasta raiz do projeto, rode:

```bash
# Linux / macOS
echo "JWT_SECRET=urbano_plus_chave_super_secreta_2026_xyz" > backend/.env

# Windows (PowerShell)
"JWT_SECRET=urbano_plus_chave_super_secreta_2026_xyz" | Out-File -FilePath backend\.env -Encoding utf8
```

> O valor do `JWT_SECRET` pode ser qualquer texto longo (mínimo 32 caracteres). Em produção, use uma string aleatória gerada por um gerador de senhas.

Se preferir criar manualmente: crie um arquivo chamado `.env` dentro da pasta `backend/` com o seguinte conteúdo:

```
JWT_SECRET=urbano_plus_chave_super_secreta_2026_xyz
```

**Passo 3 — Suba os serviços**

```bash
docker compose up --build
```

Na primeira execução o Docker vai baixar as imagens, **compilar o backend automaticamente** (via `mvn clean package` dentro do container) e instalar as dependências do frontend — pode levar alguns minutos. Nas próximas vezes será muito mais rápido.

> Você não precisa ter Java, Maven ou Node instalados na sua máquina. O Docker cuida de tudo.

Quando aparecer algo como `Started UrbanoApplication` nos logs, o sistema está pronto.

**Passo 4 — Acesse no navegador**

| Serviço | URL |
|---|---|
| 🌐 Frontend Web | http://localhost:3000 |
| ⚙️ API REST | http://localhost:8080 |

**Para parar:**

```bash
# Ctrl+C no terminal, depois:
docker compose down           # mantém os dados salvos
docker compose down -v        # apaga tudo (banco zerado)
```

---

### Opção 2 — Desenvolvimento local (hot-reload)

Use essa opção se quiser editar o código e ver as mudanças em tempo real no navegador.

**Terminal 1 — Banco de dados:**

```bash
# Sobe apenas o PostgreSQL em segundo plano
docker compose up -d db
```

**Terminal 2 — Compila e roda o backend:**

```bash
cd backend

# Crie o .env com o segredo JWT
echo "JWT_SECRET=urbano_plus_chave_super_secreta_2026_xyz" > .env

# Compila e sobe a API (o Docker cuida do Maven internamente)
docker compose up --build
```

> Na primeira execução o Docker vai baixar as imagens e compilar o projeto — pode levar alguns minutos.  
> Quando aparecer `Started UrbanoApplication` nos logs, a API está pronta em **http://localhost:8080**.

**Terminal 2 — Sobe o frontend em modo desenvolvimento:**

```bash
cd web

# Cria o arquivo de configuração do frontend
cp .env.example .env
# O arquivo .env criado já vem com VITE_API_URL=http://localhost:8080
# Não precisa alterar nada.

# Instala as dependências
npm install

# Inicia o servidor de desenvolvimento
npm run dev
```

Acesse **http://localhost:5173** — qualquer alteração nos arquivos da pasta `web/src/` reflete automaticamente no navegador.

---

### Opção 3 — App Mobile (Expo)

```bash
cd mobile
npm install
npx expo start
```

Escaneie o QR code com o app **Expo Go** no seu celular, ou pressione `a` para abrir no emulador Android / `i` para iOS.

> **Importante:** abra o arquivo `mobile/src/services/api.js` e altere o `baseURL` para o IP da sua máquina na rede local (ex: `http://192.168.1.10:8080`). O emulador e o celular físico não conseguem acessar `localhost` da sua máquina diretamente.

Para descobrir seu IP local:
```bash
# Linux / macOS
ip route get 1 | awk '{print $7; exit}'   # ou: ifconfig | grep "inet "

# Windows
ipconfig | findstr "IPv4"
```

---

## API Reference

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| `POST` | `/login` | — | Autenticar → retorna JWT |
| `POST` | `/users` | — | Cadastrar novo usuário |
| `GET` | `/me` | ✅ JWT | Dados do usuário logado |
| `GET` | `/occurrences` | ✅ JWT | Listar ocorrências aprovadas (mapa) |
| `GET` | `/occurrences/latest` | ✅ JWT | Últimas aprovadas (feed home) |
| `GET` | `/occurrences/my` | ✅ JWT | Ocorrências do usuário autenticado |
| `GET` | `/occurrences/{id}` | ✅ JWT | Detalhe de uma ocorrência |
| `POST` | `/occurrences` | ✅ JWT | Criar ocorrência (`multipart/form-data`) |
| `POST` | `/occurrences/{id}/reopen` | ✅ JWT | Reabrir ocorrência expirada |
| `GET` | `/occurrences/{id}/comments` | ✅ JWT | Listar comentários |
| `POST` | `/occurrences/{id}/comments` | ✅ JWT | Adicionar comentário |
| `DELETE` | `/occurrences/{id}/comments/{cid}` | 🔐 ADMIN | Remover comentário |
| `GET` | `/occurrences/admin?status=` | 🔐 ADMIN | Listar por status (moderação) |
| `PATCH` | `/occurrences/{id}/approve` | 🔐 ADMIN | Aprovar ocorrência |
| `PATCH` | `/occurrences/{id}/reject` | 🔐 ADMIN | Rejeitar com motivo |

---

## Categorias e status

**Categorias de ocorrência**

| Chave | Label | Cor |
|---|---|---|
| `TRAFFIC` | Trânsito | 🟡 Amarelo |
| `INFRASTRUCTURE` | Infraestrutura | 🔴 Vermelho |
| `SANITATION` | Saneamento | 🟢 Verde |
| `SECURITY` | Segurança | 🔵 Azul |
| `ENVIRONMENT` | Meio ambiente | 🟩 Verde claro |
| `OTHER` | Outros | ⚫ Cinza |

**Ciclo de vida da ocorrência**

```
PENDING → APPROVED → EXPIRED → PENDING (reaberta pelo criador)
        ↘ REJECTED
```

| Status | Descrição |
|---|---|
| `PENDING` | Aguardando revisão do administrador |
| `APPROVED` | Visível no mapa e no feed (expira em 24h) |
| `REJECTED` | Rejeitada com motivo registrado |
| `EXPIRED` | Prazo encerrado; pode ser reaberta |

---

## Estrutura do repositório

```
React_Urban/
├── docker-compose.yml          # Orquestra DB + API + Web
│
├── backend/                    # API REST — Spring Boot
│   ├── Dockerfile
│   ├── .env.example            # Copie para .env e preencha
│   ├── pom.xml
│   └── src/main/java/com/urbanoplus/
│       ├── auth/               # JWT, usuários, roles
│       ├── occurrence/         # Ocorrências, comentários, fotos
│       └── config/             # CORS, recursos estáticos
│
├── web/                        # SPA — React + Vite
│   ├── Dockerfile              # Build → nginx
│   ├── nginx.conf              # SPA fallback + proxy /api
│   ├── .env.example
│   └── src/
│       ├── contexts/           # AuthContext (JWT)
│       ├── routes/             # AppRouter (público/privado/admin)
│       ├── components/         # Layout, modais, UI atoms
│       └── pages/              # SignIn, SignUp, Home, Ocorrencias, Perfil, admin/
│
└── mobile/                     # App — React Native + Expo
    └── src/
        ├── contexts/           # auth.js
        ├── services/           # api.js (Axios + AsyncStorage)
        ├── components/         # Modais reutilizáveis
        └── pages/              # Espelha as páginas da versão web
```

---

## Promover usuário a administrador

```bash
# Conectar ao banco
docker exec -it urbanodb psql -U postgres -d urbano

# Executar dentro do psql
UPDATE users SET role = 'ADMIN' WHERE email = 'seu@email.com';
```

---

## Volumes Docker

| Volume | Conteúdo |
|---|---|
| `postgres_data` | Banco de dados PostgreSQL |
| `fotos_data` | Imagens enviadas nas ocorrências |

---

## Licença

Distribuído sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais informações.

---

## Equipe

Desenvolvido por **Kristian Kirschner Pinto**, **Luis Gustavo Magosso Obreli** e **Rogério Vieira Manzano**  
como parte do Projeto Integrador V do curso de Engenharia de Software da **Unifio — Centro Universitário de Ourinhos**.
