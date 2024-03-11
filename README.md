<h1 align="center"> Holiday Plan </h1> <br>
<p align="center">
    <img src="https://i.pinimg.com/originals/73/17/91/731791a48ea86eca290be2678160464d.png" alt="Holiday plan">
</p>

<p align="center">
 Built with Next JS.
</p>

## Introduction

Welcome to the "2024 - Vacation Plan" project repository, an innovative solution designed to facilitate the management and planning of vacations in the year 2024. This project was developed as part of a test for the Buzzvel 2024 development team, aiming to create an intuitive and responsive user interface to manage vacation plans. Combining cutting-edge functionalities with an attractive design, this application allows users to create, view, edit, and delete vacation plans with ease, in addition to offering the option of generating a detailed PDF for each plan.

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

## Technologies Used

<p>To meet the project's requirements and ensure a high-quality user experience, we chose a modern and efficient technological stack:</p>

-   Next.js: Chosen for its efficiency in server-side rendering and static site generation, Next.js serves as the backbone of our project, providing a fast and secure user experience.<br />

-   MongoDB: As our database, MongoDB offers the necessary flexibility to store and manage vacation plans with its document-based data structure.<br />

-   Tailwind CSS: For a responsive and customizable design, we utilized Tailwind CSS, which allows us to build an elegant and adaptable user interface without sacrificing performance.<br />

-   React Hook Form: To optimize form validation and data handling, React Hook Form was integrated to manage forms efficiently, enhancing the user interaction experience.<br />

-   Axios: For API communication and data handling, Axios was used for its broad compatibility and ease of use, ensuring a smooth and secure integration with our backend.<br />

-   Prisma: As our ORM (Object-Relational Mapping), Prisma allows us to interact with the MongoDB database in a more intuitive and safe manner, simplifying database operations with its schema definition model and high-level queries.<br />

<p>Each technological choice was made with the goal of creating a robust, efficient, and user-friendly application capable of meeting our users' vacation planning management needs, while offering the flexibility to evolve and expand in the future.</p>

# Features

-   Vacation Plan Management: Users can create, view, edit, and delete vacation plans using a clear and friendly interface. Each vacation plan includes details such as title, origin, destination, budget, description, dates, locations, and participants.<br />

-   Responsive Design: Using Tailwind CSS, the interface was developed to be fully responsive, ensuring an optimal user experience across different devices and screen sizes.<br />

-   Form Validation: With React Hook Form, we implemented client-side validations to ensure all required fields are correctly filled and the date formats are correct before submitting a vacation plan.<br />

-   PDF Generation: Users can generate and download a PDF for any created vacation plan, facilitating the printing or digital sharing of the plan with react-to-pdf.<br />

-   Integration with MongoDB: Using Prisma as ORM, the application connects securely and efficiently to MongoDB, allowing CRUD operations directly from the frontend through Next.js API Routes.<br />

-   Asynchronous Requests with Axios: For a smooth and dynamic user experience, we used Axios to perform asynchronous HTTP requests, interacting with our API effectively.

# Design

<p>
For the interface design of the "2024 - Vacation Plan" project, I opted for a minimalist and straightforward approach, focusing on usability and a clean aesthetic. I utilized the Tailwind CSS color palette, choosing shades of zinc for the design's base, providing a neutral and sophisticated background that facilitates reading and navigation. This choice contributes to a calming and uncomplicated user experience, avoiding distractions and putting the content of the vacation plans in focus. To complement, I incorporated blue as a secondary color, used to highlight interactive elements such as buttons and links, and to draw attention to the most important information. This subtle contrast between zinc and blue creates a clear visual hierarchy without overwhelming the users, perfectly aligning with the objective of developing an efficient, attractive, and easy-to-use interface.
 </p>

# Back-end

<p>Este projeto implementa uma API RESTful usando Next.js, combinando a potência do Prisma como ORM para interagir com um banco de dados MongoDB, e o Axios para realizar chamadas HTTP externas. As APIs criadas permitem a gestão de "planos", onde usuários podem criar, visualizar e deletar informações relacionadas a planos específicos.</p>

# Back-end Features

### Autenticação de Usuários

<p>This project implements a RESTful API using Next.js, Prisma ORM for MongoDB database interaction, and Axios for external HTTP calls. It supports the comprehensive management of "plans," including Create (POST), Read (GET), Update (PUT), and Delete (DELETE) functionalities, all secured with user authentication.</p>

### Create Plans

<p>Authenticated users can create new plans by submitting data such as title, origin, destination, participants, start and end dates, budget, and description. This information is processed and stored in MongoDB via Prisma.</p>

### Read Plans

<p>
Example of a request to read a plan: To access the details of a specific plan, you will need to make a GET request to the route /api/plans/{planId}, where {planId} is the ID of the plan you wish to consult. Note that authentication is required to access this information.
</p>

### Update Plans

<p>To update an existing plan, the API exposes a PUT route that allows modifying the data of a specific plan. Authentication is necessary to ensure that only authorized users can update plans.</p>

### Delete Plans

<p>Authenticated users can also delete existing plans. The API checks the user's authentication before proceeding with the deletion of the specified plan.</p>

# Conclusion

By incorporating Create (POST), Read (GET), Update (PUT), and Delete (DELETE) operations, the API now offers a complete suite of CRUD functionalities. This allows users not only to create and delete plans but also to update and consult them, essential for the development of dynamic and interactive web applications.
