# Blogram Blogging App

Blogram is a modern developer-centric blogging platform built with React and Vite. It features a clean UI, category-based blog filtering, comment support, and an admin dashboard for managing posts and comments.

## Features
- Fast, responsive UI with Tailwind CSS
- Browse blogs by category (Dev/Code, AI/Tools, Resources, Trends)
- Rich-text blog content and images
- Commenting system for user feedback
- Admin dashboard for blog and comment management
- Newsletter subscription form
- Social media sharing

## Getting Started
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the development server:**
   ```sh
   npm run dev
   ```
3. **Build for production:**
   ```sh
   npm run build
   ```

## Project Structure
- `src/` – Main source code
  - `components/` – Reusable UI components
  - `pages/` – Page-level components (Home, Blog, Admin, etc.)
  - `assets/` – Images, icons, and static data
- `public/` – Static files (SVGs, favicon, etc.)
- `index.html` – Main HTML entry point
- `vite.config.js` – Vite configuration
- `package.json` – Project scripts and dependencies

## Tech Stack
- React
- Vite
- Tailwind CSS
- React Router
- Moment.js
- Motion

## Main HTML Entry Point
The main HTML file for the app is located at `client/index.html`:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/bglgoo.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Blogram Blog</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```
This file sets up the root element for the React app and includes the main entry script.

## License
This project is for educational/demo purposes.

---

# Blogram-Blogging-App# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
