# Little Talk Restaurants Management LLC - Frontend

Welcome to the digital storefront and management application portal for **Little Talk Restaurants Management LLC**. This is a high-performance, responsive single-page web application (SPA) built using React, Vite, TypeScript, and a premium modern CSS design system.

---

## 🚀 Key Features

* **Elegant Responsive UX/UI**: Beautiful interactive pages customized with fluid gradients, glassmorphism, subtle micro-animations, and modern HSL-tailored color palettes.
* **Optimized Image & Asset Loading**: All media elements leverage `loading="lazy"`, `decoding="async"`, and explicit size dimensions to minimize Cumulative Layout Shift (CLS) and maximize Core Web Vitals performance.
* **Advanced Caching Strategy**: A custom PWA Service Worker implementing a robust **Network-First** strategy ensures that clients always receive fresh application updates immediately while preserving offline fallbacks.
* **Component-Driven Architecture**: Fully modular, typesafe, and reusable React components featuring built-in error boundary protections.

---

## 🛠️ Technology Stack

* **Framework**: [React 19](https://react.dev/)
* **Bundler & Dev Server**: [Vite 8](https://vite.dev/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Routing**: [React Router DOM v7](https://reactrouter.com/)
* **Styling**: Vanilla CSS (CSS Variables, Flexbox, CSS Grid)
* **Optimization**: Sharp for asset preparation, Service Worker for PWA-like capabilities.

---

## 📂 Project Structure

```bash
frontend/
├── public/                # Static assets and PWA files
│   └── sw.js              # Service Worker (Network-First strategy)
├── src/
│   ├── assets/            # Global images, icons, and media assets
│   ├── components/        # Reusable global components (Footer, ErrorBoundary, Breadcrumbs, etc.)
│   ├── context/           # React Context providers for global state management
│   ├── hooks/             # Custom React Hooks
│   ├── pages/             # Page-level route views (About, Service, Product, Partners, Legal, etc.)
│   ├── types/             # Common TypeScript interfaces and declarations
│   ├── utils/             # Helper utilities and business logic
│   ├── App.css            # Primary application stylesheet
│   ├── App.tsx            # Main router configuration and layout structure
│   ├── index.css          # Design system variables, reset styles, and utility classes
│   └── main.tsx           # Application entry point
├── package.json           # Scripts, dependencies, and configuration
├── tsconfig.json          # TypeScript workspace configuration
└── vite.config.ts         # Vite server and build pipeline plugins
```

---

## ⚙️ Getting Started

### 📋 Prerequisites

Ensure you have **Node.js (v18+)** and **npm** installed on your system.

### 🔧 Installation

Clone the repository and install the dependencies inside the `frontend` folder:

```bash
cd frontend
npm install
```

### 💻 Development Server

Start the local Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### 🏗️ Production Build

To compile a minified production bundle optimized for high-performance deployment:

```bash
npm run build
```

The production-ready assets will be generated in the `dist/` directory.

### 🧪 Verification & Linting

Run the linter to verify code formatting and ensure static analysis correctness:

```bash
npm run lint
```

---

## 🔒 Service Worker & Updates

To counter standard browser aggressive-caching issues, the custom service worker (`public/sw.js`) intercepts navigation requests:
1. It queries the **Network** first for the absolute latest version.
2. If network access is unavailable, it gracefully falls back to the local client-side **Cache**.
3. During updates, it invalidates older cache instances (e.g., transitioning from `v1` to `v2`) to prevent layout/asset mismatch issues.

---

## 📄 License

Copyright © 2026 Little Talk Restaurants Management LLC. All rights reserved.

