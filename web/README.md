# Kairosly Web – Painel Administrativo

Este é o frontend web do **Kairosly – Church Manager**, uma plataforma completa para gestão de igrejas. A aplicação web serve como painel administrativo para usuários com permissões de liderança e gestão.

Desenvolvido com **React** e **TypeScript**, o painel é responsivo, moderno e integrado com a API RESTful do sistema.

---

## 🔧 Tecnologias Utilizadas

- **React** – Biblioteca principal para UI
- **TypeScript** – Tipagem estática para maior segurança
- **React Router Dom** – Roteamento SPA
- **TailwindCSS** ou **Styled Components** – Estilização moderna e produtiva
- **Axios** – Requisições HTTP
- **React Hook Form + Zod/Yup** – Formulários e validações
- **Context API / Zustand / Redux** – Gerenciamento de estado
- **Vite** ou **CRA** – Ambiente de build e desenvolvimento

---

## 📁 Estrutura do Projeto

```

web/
├── public/
├── src/
│   ├── assets/          # Imagens, ícones, fontes
│   ├── components/      # Componentes reutilizáveis
│   ├── contexts/        # Contextos de autenticação, tema, etc.
│   ├── hooks/           # Custom hooks
│   ├── layouts/         # Layouts gerais da aplicação
│   ├── pages/           # Páginas principais
│   ├── routes/          # Definição das rotas
│   ├── services/        # Configuração do Axios e integração com a API
│   ├── styles/          # Arquivos de estilo global ou temas
│   ├── utils/           # Funções auxiliares
│   ├── App.tsx          # Componente principal
│   ├── main.tsx         # Ponto de entrada
│   └── vite.config.ts   # Configuração do Vite
├── .env                 # Variáveis de ambiente
├── .gitignore
├── index.html
├── tsconfig.json
├── yarn.lock
└── package.json

````

---

## ⚙️ Configuração do Ambiente

### 1. Instalar dependências

```bash
cd web
yarn install
````

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` com base no `.env.example`. Exemplo:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🚀 Scripts de Desenvolvimento

### Iniciar o servidor local

```bash
yarn dev
```

A aplicação estará disponível em:
📍 [http://localhost:5173](http://localhost:5173)

### Build para produção

```bash
yarn build
```

### Preview local da build

```bash
yarn preview
```

---

## 🔒 Autenticação e Permissões

* O painel web utiliza **JWT** para autenticação.
* O token é armazenado via **localStorage** ou **cookies**.
* O roteamento é protegido com guards de autenticação e verificação de permissões (admin, editor, master, etc).

---

## 📌 Funcionalidades

* Login, cadastro e troca de senha
* Dashboard com dados da igreja
* Cadastro e edição de usuários
* Gerenciamento de igrejas e seus dados
* Destaques, eventos e famílias
* Integração com a API do YouTube para cultos ao vivo (em breve)
* Responsivo para desktop e tablets

---

## 🧪 Testes (opcional)

Caso deseje incluir testes automatizados:

* **Jest + React Testing Library** para testes unitários
* **Cypress** para testes end-to-end

---

## 🧱 Boas Práticas

* Componentização e reutilização
* Validação dos formulários com Zod ou Yup
* Padronização dos serviços (Axios)
* Contextos desacoplados
* Responsividade garantida

---

## 🙌 Contribuição

Pull requests são bem-vindos. Siga o padrão dos commits e mantenha os arquivos organizados por domínio e função.

---

## ✝️ Propósito

O Kairosly Web nasceu para facilitar a administração de igrejas de forma centralizada e organizada, promovendo mais tempo para o ministério e menos esforço com burocracia.

---

## 🧑‍💻 Desenvolvido por

[Rod](https://github.com/rodrigozan) – Com amor, fé e código.

```
