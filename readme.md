# Story wave

This is a Medium-like web application that allows users to read, write, and share articles. The app features a modern UI, user authentication, and a rich text editor for content creation.

## Project Stack

- **Frontend:** React, TypeScript
- **Backend:** Cloudflare Workers, TypeScript
- **Validation:** Zod (with type inference for frontend types)
- **ORM:** Prisma (with connection pooling)
- **Database:** PostgreSQL
- **Authentication:** JSON Web Tokens (JWT)

## About

The goal of this project is to create a platform where users can:

- **Sign Up/Login:** Users can create accounts and log in using JWT for secure authentication.
- **Create and Edit Articles:** Authenticated users can write and edit articles.
- **Read Articles:** Users can browse and read published articles.
- **User Profiles:** Each user has a profile page displaying their articles and other relevant information.

## Features

- **Responsive Design:** The app is designed to work seamlessly on both desktop and mobile devices.
- **Rich Text Editor:** Users can format their articles with a built-in editor.
- **Tagging System:** Articles can be tagged with relevant keywords for easier categorization and searchability.
- **Comments and Interactions:** Users can interact with articles through comments and likes (future feature).

## Installation and Running

To get started with the project, please follow the setup instructions in the respective `frontend` and `backend` directories.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License.
