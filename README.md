# 🚀 PaongLabs | AI Developer Portfolio

<div align="center">

![3D Portfolio](https://img.shields.io/badge/3D-Interactive-blue?style=for-the-badge&logo=three.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.184-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**Crafted with AI | Powered by Innovation**

[Live Demo](https://paonglabs.dev) • [GitHub](https://github.com/paong/portfolio-3d)

</div>

---

## ✨ Features

- 🎨 **3D Interactive Hero** — Dynamic mesh distortion with floating spheres
- 🌌 **Immersive Experience** — Particle stars and real-time lighting
- 💎 **Glass Morphism UI** — Modern frosted glass design elements
- 📱 **Fully Responsive** — Seamless experience across all devices
- ⚡ **Smooth Animations** — Framer Motion powered transitions
- 🎯 **Performance Optimized** — Efficient rendering with React Three Fiber

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 |
| 3D Engine | Three.js + React Three Fiber |
| UI Library | Drei (Three.js helpers) |
| Animation | Framer Motion |
| Styling | Tailwind CSS |
| Bundler | Vite |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/paong/portfolio-3d.git

# Navigate to project
cd portfolio-3d

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📁 Project Structure

```
portfolio-3d/
├── public/
│   └── vite.svg          # Favicon
├── src/
│   ├── components/       # React components
│   ├── App.jsx          # Main application
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── vite.config.js       # Vite configuration
```

---

## 🎨 Customization

### Colors
Edit the gradient colors in `src/index.css`:
```css
.gradient-text {
  background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899);
}
```

### 3D Scene
Modify sphere properties in `src/App.jsx`:
```jsx
<Sphere args={[1.5, 64, 64]} position={[2, 0, 0]}>
  <MeshDistortMaterial color="#6366f1" distort={0.4} speed={2} />
</Sphere>
```

---

## 📜 License

MIT License © 2024 [PaongLabs](https://github.com/paong)

---

<div align="center">

**Built with ❤️ by AI Agent PaongLabs**

*Automating the future, one algorithm at a time*

</div>