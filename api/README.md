# API Gestor de Igrejas

Esta é a documentação para a API RESTful desenvolvida para o aplicativo Gestor de Igrejas.

## Visão Geral

A API fornece endpoints para gerenciar usuários, igrejas, autenticação, perfis, famílias, destaques, eventos e outras funcionalidades essenciais para a gestão de uma ou múltiplas igrejas.

## Tecnologias Utilizadas

*   **Node.js:** Ambiente de execução JavaScript.
*   **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
*   **Express:** Framework web para Node.js.
*   **MongoDB:** Banco de dados NoSQL orientado a documentos.
*   **Mongoose:** ODM (Object Data Modeling) para MongoDB e Node.js.
*   **JWT (JSON Web Tokens):** Para autenticação baseada em token.
*   **bcryptjs:** Para hashing de senhas.
*   **class-validator & class-transformer:** Para validação de dados de entrada (DTOs).
*   **Swagger (OpenAPI):** Para documentação interativa da API.
*   **dotenv:** Para gerenciamento de variáveis de ambiente.
*   **ts-node-dev:** Para desenvolvimento com recarregamento automático e transpilação TypeScript.

## Estrutura do Projeto

```
church-api/
├── dist/                     # Código JavaScript transpilado (gerado pelo build)
├── node_modules/
├── src/
│   ├── config/               # Arquivos de configuração (DB, Swagger)
│   ├── controllers/          # Lógica de controle das rotas
│   ├── interfaces/           # Interfaces TypeScript (se necessário)
│   ├── middlewares/          # Middlewares (auth, error, validation, roles)
│   ├── models/               # Schemas Mongoose
│   ├── routes/               # Definições das rotas Express
│   ├── services/             # Lógica de negócios (ex: integração com APIs externas)
│   ├── utils/                # Funções utilitárias
│   ├── validators/           # DTOs (Data Transfer Objects) com validações
│   ├── app.ts                # Configuração principal do Express
│   ├── seed.ts               # Script para popular o banco com dados iniciais
│   └── server.ts             # Ponto de entrada (opcional, app.ts pode iniciar o servidor)
├── .env                      # Variáveis de ambiente (NÃO versionar)
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json             # Configuração do TypeScript
```

## Configuração e Instalação

1.  **Clone o repositório (ou extraia o arquivo .zip).**
2.  **Instale as dependências:**
    ```bash
    cd church-api
    npm install
    ```
3.  **Configure as Variáveis de Ambiente:**
    *   Crie um arquivo `.env` na raiz do projeto.
    *   Copie o conteúdo de `.env.example` (se fornecido) ou adicione as seguintes variáveis:
        ```dotenv
        NODE_ENV=development
        PORT=5000
        MONGO_URI=mongodb://localhost:27017/church_api_db # Ou sua string de conexão MongoDB
        JWT_SECRET=seu_segredo_jwt_aqui # Troque por um segredo forte
        JWT_EXPIRES_IN=30d

        # Variáveis para API do YouTube (se/quando implementado)
        # YOUTUBE_API_KEY=SUA_CHAVE_API
        # GOOGLE_CLIENT_ID=SEU_CLIENT_ID
        # GOOGLE_CLIENT_SECRET=SEU_CLIENT_SECRET
        ```
    *   **Importante:** Certifique-se de que um servidor MongoDB esteja rodando e acessível na `MONGO_URI` especificada.

## Executando a Aplicação

*   **Modo de Desenvolvimento (com hot-reload):**
    ```bash
    npm run dev
    ```
    O servidor iniciará (geralmente na porta 5000) e a documentação Swagger estará disponível em `http://localhost:5000/api-docs`.

*   **Popular o Banco com Dados de Exemplo:**
    *   **Atenção:** Este comando limpará os dados existentes das coleções `users` e `churches` antes de inserir os dados de exemplo. Use apenas em ambiente de desenvolvimento.
    ```bash
    npm run seed
    ```

*   **Build para Produção:**
    ```bash
    npm run build
    ```
    Isso transpilará o código TypeScript para JavaScript na pasta `dist/`.

*   **Iniciar em Modo de Produção:**
    ```bash
    npm start
    ```
    Isso executará o código JavaScript da pasta `dist/`.

## Documentação da API (Swagger)

Com o servidor rodando (usando `npm run dev` ou `npm start`), acesse a documentação interativa do Swagger no seu navegador:

[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

A documentação permite visualizar todos os endpoints disponíveis, seus parâmetros, corpos de requisição esperados, respostas e schemas. Você também pode testar os endpoints diretamente pela interface do Swagger.

**Autenticação no Swagger:**

*   A maioria dos endpoints requer autenticação via Token JWT.
*   Primeiro, use o endpoint `POST /auth/login` com credenciais válidas (ex: `master@example.com` / `password123` após rodar o seed) para obter um token.
*   Clique no botão "Authorize" no topo da página do Swagger.
*   Cole o token JWT recebido no campo "Value" do `bearerAuth` (incluindo a palavra "Bearer" no início, se o token não a incluir).
*   Clique em "Authorize" e depois em "Close". Agora você pode testar os endpoints protegidos.

## Endpoints Implementados (Resumo)

Consulte a documentação do Swagger (`/api-docs`) para detalhes completos, incluindo schemas de requisição/resposta e exemplos.

*   **Autenticação (`/api/auth`)**
    *   `POST /register`: Registrar novo usuário.
    *   `POST /login`: Autenticar usuário e obter token JWT.
*   **Usuário (`/api/user`)**
    *   `GET /profile`: Obter perfil do usuário logado.
    *   `PUT /profile`: Atualizar perfil do usuário logado.
    *   `DELETE /profile`: Desativar conta do usuário logado.
    *   `GET /family`: Listar membros da família.
    *   `POST /family`: Adicionar membro à família.
    *   `DELETE /family/{memberId}`: Remover membro da família.
    *   `PUT /{userId}/assign`: (Admin/Master) Atribuir papel/igreja a um usuário.
*   **Igrejas (`/api/churches`)**
    *   `POST /`: (Master) Registrar nova igreja.
    *   `GET /`: (Master) Listar todas as igrejas.
    *   `GET /{churchId}/info`: Obter informações de uma igreja específica.
    *   `PUT /{churchId}/info`: (Admin/Master) Atualizar informações de uma igreja.
    *   `GET /{churchId}/users`: (Admin/Master) Listar usuários de uma igreja.
*   **Destaques (`/api/highlights`)**
    *   `POST /`: (Editor+) Criar novo destaque.
    *   `GET /`: Listar destaques (filtrado por igreja).
    *   `GET /{highlightId}`: Obter destaque específico.
    *   `PUT /{highlightId}`: (Editor+) Atualizar destaque.
    *   `DELETE /{highlightId}`: (Admin/Master) Deletar destaque.
*   **Eventos (`/api/events`)**
    *   `POST /`: (Editor+) Criar novo evento.
    *   `GET /`: Listar eventos (filtrado por igreja, futuros por padrão).
    *   `GET /{eventId}`: Obter evento específico.
    *   `PUT /{eventId}`: (Editor+) Atualizar evento.
    *   `DELETE /{eventId}`: (Admin/Master) Deletar evento.

## Próximos Passos (Módulos Pendentes)

Conforme o `todo.md`, os seguintes módulos ainda serão implementados:

*   Notícias (`/api/news`)
*   Mídia (`/api/media`)
*   Bíblia (`/api/bible` - integração com API externa)
*   Contribuições (`/api/contributions`)
*   Aniversariantes (`/api/birthdays`)
*   Contatos (`/api/contacts`)
*   Grupos (`/api/groups`)
*   Ministérios (`/api/ministries`)
*   Cursos (`/api/courses`)
*   Ao Vivo (`/api/live` - integração com YouTube API)


