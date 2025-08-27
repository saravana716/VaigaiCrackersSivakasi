# Twin Elephant Brand - Premium Fireworks Website

A modern, responsive showcase website for Twin Elephant Brand fireworks company, built with React, TypeScript, Tailwind CSS v4, and Motion animations.

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed on your system:
- **Node.js** (version 18.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **VS Code** (recommended) - [Download here](https://code.visualstudio.com/)

### Installation Steps

1. **Open the project in VS Code:**
   ```bash
   # Navigate to your project folder
   cd path/to/your/twin-elephant-project
   
   # Open in VS Code
   code .
   ```

2. **Install dependencies:**
   ```bash
   # Using npm (recommended)
   npm install
   
   # OR using yarn
   yarn install
   ```

3. **Start the development server:**
   ```bash
   # Using npm
   npm run dev
   
   # OR using yarn
   yarn dev
   ```

4. **Open your browser:**
   - The development server will automatically open your browser
   - If not, go to: `http://localhost:3000`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
twin-elephant-fireworks/
├── components/           # React components
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   ├── figma/           # Figma-specific components
│   ├── Navbar.tsx       # Main navigation component
│   ├── Hero.tsx         # Hero section
│   ├── ProductCategories.tsx
│   └── ...              # Other page components
├── styles/
│   └── globals.css      # Global styles and Tailwind config
├── App.tsx              # Main application component
├── main.tsx            # React application entry point
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
├── vite.config.ts      # Vite configuration
└── tsconfig.json       # TypeScript configuration
```

## 🎨 Features

### Design & UI
- **Modern Navbar:** Responsive navigation with mobile slide-out menu
- **Logo-based Theme:** Colors derived from Twin Elephant Brand logo
- **Smooth Animations:** framer-motion animations throughout
- **Mobile-First:** Fully responsive design for all devices
- **Glass-morphism Effects:** Modern UI with backdrop blur effects

### Pages & Sections
- **Homepage:** Hero, product categories, featured products, why choose us
- **Product Gallery:** Organized product showcase with swiper carousels
- **About Page:** Company history and information
- **Contact Page:** Contact form and company details
- **Category Pages:** Product category browsing
- **Product Pages:** Individual product details

### Technical Features
- **TypeScript:** Full type safety
- **Tailwind CSS v4:** Latest utility-first CSS framework
- **Shadcn/UI:** High-quality component library
- **Lucide Icons:** Beautiful icon library
- **Recharts:** Charts and data visualization
- **React Slick:** Carousel/slider functionality

## 🔧 Development Tips

### VS Code Extensions (Recommended)
Install these extensions for the best development experience:
- **ES7+ React/Redux/React-Native snippets**
- **TypeScript Importer**
- **Tailwind CSS IntelliSense**
- **Auto Rename Tag**
- **Prettier - Code formatter**
- **ESLint**

### Hot Reload
The development server supports hot reload - your changes will appear instantly in the browser without losing state.

### Building for Production
```bash
npm run build
```
This creates a `dist/` folder with optimized production files.

## 🎯 Customization

### Colors
The color system is based on the Twin Elephant Brand logo colors, defined in `/styles/globals.css`:
- **Primary:** Red (#dc2626)
- **Secondary:** Orange (#ea580c)
- **Accent:** Blue (#2563eb)
- **Background:** Dark (#0f0f23)

### Adding New Components
1. Create new component in `/components/`
2. Import and use in `App.tsx` or other components
3. Follow the existing naming conventions

### Modifying Navigation
Edit the `navItems` array in `/components/Navbar.tsx` to add/remove navigation items.

## 🚨 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or start on different port
npm run dev -- --port 3001
```

**Node modules issues:**
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
- Make sure all dependencies are installed
- Check that file paths in imports are correct
- Restart TypeScript server in VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

### Getting Help
If you encounter issues:
1. Check the browser console for errors
2. Check the terminal for build errors
3. Ensure all dependencies are properly installed
4. Verify Node.js version (should be 18+)

## 📱 Mobile Testing

Test on mobile devices:
1. Get your local IP address: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Access from mobile: `http://YOUR_IP:3000`
3. Or use browser dev tools device simulation

## 🎊 Happy Coding!

Your Twin Elephant Brand fireworks website is ready to sparkle! ✨

For any questions or modifications, check the component files in the `/components/` directory.