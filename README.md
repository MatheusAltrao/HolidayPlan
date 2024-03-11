This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

<h1 align="center"> Holiday Plan </h1> <br>
<p align="center">
    <img src="https://i.pinimg.com/originals/73/17/91/731791a48ea86eca290be2678160464d.png" alt="Holiday plan">
</p>

<p align="center">
 Built with Next JS.
</p>

## Introduction

Bem-vindo ao repositório do projeto "2024 - Vacation Plan", uma solução inovadora projetada para facilitar a gestão e o planejamento de férias no ano de 2024. Este projeto foi desenvolvido como parte de um teste para a equipe de desenvolvimento da Buzzvel 2024, visando criar uma interface de usuário intuitiva e responsiva para gerenciar planos de férias. Combinando funcionalidades de ponta e um design atraente, esta aplicação permite aos usuários criar, visualizar, editar e deletar planos de férias com facilidade, além de oferecer a opção de gerar um PDF detalhado de cada plano.

## Tecnologias Utilizadas

<p>Para atender aos requisitos do projeto e garantir uma experiência de usuário de alta qualidade, optamos por um stack tecnológico moderno e eficiente:</p>

-   Next.js: Escolhido pela sua eficiência em renderização do lado do servidor e geração de sites estáticos, Next.js serve como a espinha dorsal do nosso projeto, proporcionando uma experiência de usuário rápida e segura. <br />
-   MongoDB: Como nosso banco de dados, MongoDB oferece a flexibilidade necessária para armazenar e gerenciar os planos de férias com sua estrutura de dados baseada em documentos.<br />
-   Tailwind CSS: Para um design responsivo e personalizável, utilizamos Tailwind CSS, que nos permite construir uma interface de usuário elegante e adaptável sem sacrificar a performance.<br />
-   React Hook Form: A fim de otimizar a validação de formulários e a manipulação de dados, React Hook Form foi integrado para gerenciar formulários com eficiência, melhorando a experiência de interação do usuário.<br />
-   Axios: Para comunicação com a API e manipulação de dados, Axios foi utilizado por sua ampla compatibilidade e facilidade de uso, garantindo uma integração suave e segura com nosso backend.<br />
-   Prisma: Como nosso ORM (Object-Relational Mapping), Prisma nos permite interagir com o banco de dados MongoDB de uma maneira mais intuitiva e segura, simplificando as operações de banco de dados com seu modelo de definição de esquema e consultas de alto nível.<br />

<p>Cada escolha tecnológica foi feita com o objetivo de criar uma aplicação robusta, eficiente e fácil de usar, capaz de atender às necessidades de gerenciamento de planos de férias de nossos usuários, enquanto oferece a flexibilidade para evoluir e expandir no futuro.</p>

# Features

-   Gerenciamento de Planos de Férias: Os usuários podem criar, visualizar, editar e excluir planos de férias, utilizando uma interface clara e amigável. Cada plano de férias inclui detalhes como título,origem,destino,orçamento, descrição, datas, locais e participantes.<br />

-   Design Responsivo: Utilizando Tailwind CSS, a interface foi desenvolvida para ser completamente responsiva, garantindo uma experiência de usuário ótima em diferentes dispositivos e tamanhos de tela.<br />

-   Validação de Formulários: Com o React Hook Form, implementamos validações no lado do cliente para garantir que todos os campos obrigatórios sejam preenchidos corretamente e que os formatos de data estejam corretos antes de submeter um plano de férias.<br />

-   Geração de PDF: Os usuários podem gerar e baixar um PDF para qualquer plano de férias criado, facilitando a impressão ou compartilhamento do plano em formato digital com react-to-pdf.<br />

-   Integração com MongoDB: Usando Prisma como ORM, a aplicação se conecta de forma segura e eficiente ao MongoDB, permitindo operações de CRUD diretamente do front-end através dos API Routes do Next.js.<br />

-   Requisições Assíncronas com Axios: Para uma experiência de usuário suave e dinâmica, utilizamos Axios para realizar requisições HTTP assíncronas, interagindo com a nossa API de forma eficaz.<br />

# Design

<p>
Para o design da interface do projeto "2024 - Vacation Plan", optei por uma abordagem minimalista e direta, focando na usabilidade e na estética clean. Utilizei a paleta de cores do Tailwind CSS, escolhendo tons de zinc para a base do design, proporcionando um fundo neutro e sofisticado que facilita a leitura e a navegação. Essa escolha contribui para uma experiência de usuário calmante e descomplicada, evitando distrações e colocando o conteúdo dos planos de férias em destaque. Para complementar, incorporei o azul como cor secundária, usada para destacar elementos interativos, como botões e links, e para chamar a atenção para as informações mais importantes. Esse contraste sutil entre o zinc e o azul cria uma hierarquia visual clara sem sobrecarregar os usuários, alinhando-se perfeitamente com o objetivo de desenvolver uma interface eficiente, atraente e fácil de usar.
 </p>
