# 🚀 Homies Studio

**Precision Engineering & Digital Architecture**  
*Turning visions into high-performance systems.*

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

---

## 🌟 Overview

Homies Studio is a premium, high-performance portfolio website for an elite engineering studio. It showcases specialized services in IoT, Robotics, AI/ML, and Full-Stack Engineering with a focus on precision, industrial aesthetics, and uncompromising code.

The project features a **Day/Night transition system**, a **3D interactive crew section**, and **smooth cinematic animations** powered by GSAP and Framer Motion.

---

## 🛠️ Tech Stack

- **Core**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **3D Graphics**: [Three.js](https://threejs.org/) (Crew Section)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [EmailJS](https://www.emailjs.com/) & WhatsApp Integration
- **Components**: Custom-built premium components with magnetic effects and 3D tilts.

---

## ✨ Key Features

- **Dynamic Theme Engine**: Seamlessly switch between light and dark modes with color inversions.
- **Magnetic Interactions**: Premium hover effects on CTAs and interactive elements.
- **3D Crew Section**: Interactive 3D avatars for team members using Three.js.
- **Day/Night Animation**: A cinematic transition when switching themes.
- **Vertical Navigation**: A unique fixed right-side navbar for intuitive scrolling.
- **Responsive Architecture**: Fully optimized for mobile, tablet, and desktop.
- **Optimized Performance**: Fast load times with Vite and split-component architecture.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/homies-studio-fv.git
cd homies-studio-fv
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your keys (see `.env.example` for reference):

```env
VITE_EMAILJS_SERVICE_ID=your_id
VITE_EMAILJS_TEMPLATE_ID=your_id
VITE_EMAILJS_PUBLIC_KEY=your_key
VITE_CONTACT_EMAIL=hello@yourdomain.com
VITE_WHATSAPP_NUMBER=910000000000
VITE_TAWKTO_ID=your_id
```

### 4. Run Locally
```bash
npm run dev
```

---

## 📁 Project Structure

```text
src/
├── assets/         # Images, sounds, and static assets
├── components/     # UI Components
│   ├── layout/     # Nav, Logo, Custom Cursor
│   └── sections/   # Hero, Services, Crew, Contact, etc.
├── context/        # ThemeContext and Global State
├── data/           # Project and Testimonial data
├── hooks/          # Custom React hooks (useTheme, etc.)
├── styles/         # Tailwind and Global CSS
└── App.tsx         # Main entry and Routing
```

---

## 🛡️ Security & Deployment

This project is configured for **safe public deployment**. 

1. **Environment Variables**: All sensitive keys (EmailJS, Tawk.to, Contact info) are managed via `import.meta.env`.
2. **Git Hygiene**: `.env` files are excluded from version control via `.gitignore`.
3. **Type Safety**: Environment variables are strictly typed in `src/vite-env.d.ts`.

### Deploying to Vercel / Netlify
When deploying, make sure to add the environment variables listed in `.env.example` to your deployment dashboard.

---

## 🤝 Contact the Homies

Ready to build the future? Reach out:

- **Email**: [hello@homiesstudio.in](mailto:hello@homiesstudio.in)
- **WhatsApp**: [+91 74166 36417](https://wa.me/917416636417)
- **Website**: [homiesstudio.in](https://homiesstudio.in)

---

© 2026 Homies Studio — Crafted for performance.
