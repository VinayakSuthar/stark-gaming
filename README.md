# Stark Gaming

<!-- ![Logo](src/assets/image/garena-logo.png) -->

A gaming library website where user can browse games of all platform and can create his own library with the game play status.

## Features

- Updated games list (RAWG games Api)
- Game search
- Filter games based on genres
- User library with status (Wishlist | Playing | Played)
- A separate version with CMS integration.
- Mobile responsive

## Tech Stack

- React JS
- Tailwind
- Ant Design
- Vite
- Vitest
- Strapi
- React Query (Tanstack Query)
- Framer motion
- Eslint
- Prettier
- Pre Commit Hook (Husky)

## Getting Started

Get your project up and running with the following steps:

### Prerequisite

Before you begin, ensure you have met the following requirements:

1. Node 18
2. npm

### Installation

1. Fork and clone the repo

   ```sh
   git clone https://github.com/VinayakSuthar/stark-gaming.git
   ```

2. Install Dependencies

   ```sh
   npm install
   ```

3. Run development server

   ```sh
   npm run dev
   ```

### Development

- `npm run dev` start Vite dev server in the current directory at `localhost:5173`.
- `npm run lint` to lint your code.
- `npm run format` to automatically format your code with Prettier.
- `npm run build` generates a production-ready bundle.

### Continuous Integration (Vercel)

This project is set up for continuous integration using Vercel. The CI pipeline includes running tests and deploying to Vercel.
