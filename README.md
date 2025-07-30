# Nebra

<p align="center">
  <img alt="Nebra Logo" src="public/nebra-transparent.png" width="200">
</p>

Nebra is a portfolio frontend business directory application built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and DaisyUI. It features a clean, responsive interface and a robust authentication system, providing services for businesses creation and administration.

## 🌐 Public Deployment

- **Backend Repo:** [https://github.com/CrisD314159/Nebra](https://github.com/CrisD314159/Nebra)
- **Deployment Preview:** [https://nebra.vercel.app](https://nebra.vercel.app)

---

## 🚀 Features

- **Authentication & Account Management**
  - Secure sign up, login, and logout
  - Login using OAuth 2.0
  - Email verification and password recovery flows
  - Account reset and verification via email

- **Personal Dashboard**
  - Tabbed navigation for Home, Search, Comments, Saved, and User profile
  - Dynamic content loading with React Suspense and dynamic imports
  - Create and administrate your businesses
  - Answer your businesses comments
  - Create Reports on businesses

- **Modern UI/UX**
  - Responsive design for mobile and desktop
  - Custom theming with Tailwind CSS, DaisyUI and Framer Motion
  - Google authentication options

- **Progressive Web App (PWA)**
  - Installable on mobile devices
  - Optimized for standalone and offline use

---

## 🛠️ Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## 📁 Project Structure

- `app/` – Main Next.js app directory (routing, pages, layouts)
  - `account/` – Authentication pages (login, signup, recover, reset, verify)
  - `dashboard/` – User dashboard with tabbed navigation
- `components/` – Reusable UI and feature components
- `lib/` – Server actions and utilities
- `store/` – State management (e.g., Zustand)
- `public/` – Static assets (images, icons, etc.)

---

## 👤 About the Creator

Created by **Cristian David Vargas Loaiza**  
[LinkedIn](https://www.linkedin.com/in/cristian-david-vargas-loaiza-982314271) | [GitHub](https://github.com/CrisD314159) | [Portfolio](https://crisdev-pi.vercel.app)

---

## 📄 License

This project is for educational and demonstration purposes.

---

## 📦 Deploy on Vercel

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.