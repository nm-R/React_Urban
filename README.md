# Urbano+ 🌆

Sistema de reporte e acompanhamento de ocorrências urbanas. Cidadãos reportam problemas na cidade — buracos, iluminação, enchentes, segurança — com fotos e localização. Administradores moderam, aprovam ou rejeitam. Todos acompanham pelo mapa.

---

## 📁 Estrutura do Projeto

```
app-urbano-plus/
│
├── docker-compose.yml               ← Sobe tudo: DB + API + Web
│
├── backend/                         ← API REST Spring Boot (Java)
│   ├── Dockerfile
│   ├── docker-compose.yml           ← Apenas backend (uso isolado)
│   ├── pom.xml
│   └── src/main/java/com/urbanoplus/
│       ├── auth/                    ← Autenticação JWT e usuários
│       │   ├── config/SecurityConfig.java
│       │   ├── controller/AuthController.java
│       │   ├── dto/                 ← LoginRequest, TokenResponse, UserRequest
│       │   ├── exception/           ← AppException, GlobalExceptionHandler
│       │   ├── model/               ← User, Role (CITIZEN | ADMIN)
│       │   ├── repository/UserRepository.java
│       │   ├── security/            ← JwtFilter, JwtUtil
│       │   └── service/AuthService.java
│       │
│       ├── occurrence/              ← Ocorrências, comentários, fotos
│       │   ├── controller/OccurrenceController.java
│       │   ├── dto/                 ← OccurrenceRequest/Response, CommentRequest/Response, RejectRequest
│       │   ├── model/               ← Occurrence, Comment, Photo, OccurrenceCategory, OccurrenceStatus
│       │   ├── repository/          ← OccurrenceRepository, CommentRepository, PhotoRepository
│       │   ├── service/OccurrenceService.java
│       │   └── storage/StorageService.java   ← Upload de fotos em disco
│       │
│       └── config/WebConfig.java    ← CORS e recursos estáticos (/uploads)
│
├── web/                             ← Frontend React Web (novo)
│   ├── Dockerfile                   ← Build Vite → serve via nginx
│   ├── nginx.conf                   ← SPA fallback + proxy /api → backend
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── main.jsx                 ← Ponto de entrada React
│       ├── App.jsx                  ← Providers raiz (Auth + Router)
│       ├── index.css                ← Todos os estilos e design tokens
│       │
│       ├── services/
│       │   └── api.js               ← Instância Axios com interceptor JWT
│       │
│       ├── contexts/
│       │   └── AuthContext.jsx      ← signIn / signUp / logOut / user / signed
│       │
│       ├── routes/
│       │   └── AppRouter.jsx        ← Rotas públicas, privadas e admin-only
│       │
│       ├── components/
│       │   ├── Layout/index.jsx          ← Sidebar de navegação responsiva
│       │   ├── OcorrenciaModal/index.jsx ← Detalhes, fotos e comentários
│       │   └── CriarOcorrenciaModal/index.jsx ← Criar com categoria, raio e fotos
│       │
│       └── pages/
│           ├── SignIn/index.jsx          ← Login
│           ├── SignUp/index.jsx          ← Cadastro
│           ├── Home/index.jsx            ← Feed das últimas ocorrências
│           ├── Ocorrencias/index.jsx     ← Mapa Leaflet + click-to-create
│           ├── Perfil/index.jsx          ← Perfil do usuário e seus reportes
│           └── admin/
│               ├── Dashboard/index.jsx              ← Painel com contadores
│               ├── GerenciarOcorrencias/index.jsx   ← Aprovar / rejeitar
│               └── GerenciarComentarios/index.jsx   ← Moderar comentários
│
└── mobile/                          ← App React Native (Expo) — original
    ├── App.js
    └── src/
        ├── contexts/auth.js
        ├── services/api.js
        ├── pages/
        │   ├── SignIn/ SignUp/ Home/ Ocorrencias/ Perfil/
        │   └── admin/ Dashboard/ GerenciarOcorrencias/ GerenciarComentarios/
        └── components/
            ├── OcorrenciaModal/
            └── CriarOcorrenciaModal/
```

---

## 🔌 API Endpoints

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `POST` | `/login` | ❌ | Autenticar → retorna JWT |
| `POST` | `/users` | ❌ | Cadastrar novo usuário |
| `GET` | `/me` | ✅ | Dados do usuário logado |
| `GET` | `/occurrences` | ✅ | Listar aprovadas (mapa) |
| `GET` | `/occurrences/latest` | ✅ | Últimas aprovadas (feed) |
| `GET` | `/occurrences/my` | ✅ | Minhas ocorrências |
| `GET` | `/occurrences/{id}` | ✅ | Detalhe de ocorrência |
| `POST` | `/occurrences` | ✅ | Criar ocorrência (multipart) |
| `POST` | `/occurrences/{id}/reopen` | ✅ | Reabrir ocorrência expirada |
| `GET` | `/occurrences/{id}/comments` | ✅ | Listar comentários |
| `POST` | `/occurrences/{id}/comments` | ✅ | Adicionar comentário |
| `DELETE` | `/occurrences/{id}/comments/{cid}` | 🔐 ADMIN | Remover comentário |
| `GET` | `/occurrences/admin?status=` | 🔐 ADMIN | Listar por status |
| `PATCH` | `/occurrences/{id}/approve` | 🔐 ADMIN | Aprovar |
| `PATCH` | `/occurrences/{id}/reject` | 🔐 ADMIN | Rejeitar com motivo |

---

## 🚀 Como Rodar

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) e Docker Compose
- Git

---

### ▶️ Opção 1 — Tudo com Docker (recomendado)

Sobe banco, API e frontend web com um único comando.

```bash
# 1. Clone o repositório
git clone https://github.com/KristianKirschner/app-urbano-plus.git
cd app-urbano-plus

# 2. Configure o backend
echo "JWT_SECRET=troque_por_uma_chave_secreta_de_32_chars" > backend/.env

# 3. Suba tudo
docker compose up --build
```

| Serviço | URL |
|---------|-----|
| **Frontend Web** | http://localhost:3000 |
| **API REST** | http://localhost:8080 |

Para parar:
```bash
docker compose down          # mantém os dados
docker compose down -v       # apaga volumes (banco zerado)
```

---

### ▶️ Opção 2 — Desenvolvimento local (hot-reload)

**Terminal 1 — Backend + Banco:**
```bash
cd backend
echo "JWT_SECRET=troque_por_uma_chave_secreta_de_32_chars" > .env
docker compose up -d
```

**Terminal 2 — Frontend Web:**
```bash
cd web
cp .env.example .env         # VITE_API_URL=http://localhost:8080
npm install
npm run dev
# Acesse → http://localhost:5173
```

---

### ▶️ Opção 3 — App Mobile (original)

```bash
cd mobile
npm install
npx expo start
```

> Edite `mobile/src/services/api.js` e coloque o IP local da sua máquina como `baseURL` (ex: `http://192.168.1.10:8080`).

---

## ⚙️ Variáveis de Ambiente

### `backend/.env`
```env
JWT_SECRET=sua_chave_secreta_aqui_minimo_32_caracteres
```

### `web/.env` (apenas desenvolvimento local)
```env
VITE_API_URL=http://localhost:8080
```

> Em produção Docker, o nginx faz o proxy internamente usando o service name `app` — nenhuma variável é necessária.

---

## 🗂️ Categorias de Ocorrência

| Chave | Label | Cor |
|-------|-------|-----|
| `TRAFFIC` | Trânsito | 🟡 Amarelo |
| `INFRASTRUCTURE` | Infraestrutura | 🔴 Vermelho |
| `SANITATION` | Saneamento | 🟢 Verde |
| `SECURITY` | Segurança | 🔵 Azul |
| `ENVIRONMENT` | Meio ambiente | 🟢 Verde claro |
| `OTHER` | Outros | ⚫ Cinza |

## 📊 Status de Ocorrência

| Status | Descrição |
|--------|-----------|
| `PENDING` | Aguardando revisão admin |
| `APPROVED` | Visível no mapa e feed |
| `REJECTED` | Rejeitada com motivo |
| `EXPIRED` | Pode ser reaberta pelo usuário |

---

## 🛠️ Stack Tecnológica

### Backend
- Java 21 + Spring Boot 3
- Spring Security + JWT (roles: `CITIZEN`, `ADMIN`)
- Spring Data JPA + PostgreSQL 16
- Docker + Docker Compose

### Frontend Web
- React 18 + Vite
- React Router DOM v6
- Axios (interceptor JWT automático)
- React Leaflet + Leaflet.js (mapa interativo)
- Lucide React (ícones)
- nginx (serve o build + proxy reverso)

### Mobile (original)
- React Native + Expo
- Axios + AsyncStorage
- React Native Maps

---

## 🔐 Promover usuário a Admin

```sql
UPDATE users SET role = 'ADMIN' WHERE email = 'seu@email.com';
```

Execute no banco via:
```bash
docker exec -it urbanodb psql -U postgres -d urbano
```

---

## 📦 Volumes Docker

| Volume | Conteúdo |
|--------|----------|
| `postgres_data` | Banco de dados PostgreSQL |
| `fotos_data` | Fotos das ocorrências enviadas |

---

## 👥 Equipe

Projeto Integrador V — Engenharia de Software
Centro Universitário de Ourinhos (Unifio)
Professor: Thiago | Ano: 2024
