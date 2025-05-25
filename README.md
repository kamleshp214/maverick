# Kamlesh Porwal - Portfolio Website

A modern, minimalist portfolio website built with React, TypeScript, and Tailwind CSS. Features a clean Apple-inspired design with smooth animations and full mobile responsiveness.

## ✨ Features

- **Modern Design**: Clean, minimalist aesthetic inspired by Apple's design language
- **Responsive**: Fully optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion powered animations and interactions
- **Performance Optimized**: Built with Vite for fast loading and optimal performance
- **TypeScript**: Fully typed for better development experience
- **Accessibility**: Touch-friendly interface with proper sizing for all devices

## 🚀 Live Demo

Visit the live website: [Your Vercel URL will appear here after deployment]

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, Custom CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React, React Icons
- **Build Tool**: Vite
- **Deployment**: Vercel

## 📱 Sections

- **Hero**: Introduction with animated typing effect
- **About**: Background and education information (MIT Ujjain student)
- **Skills**: Technical skills showcase
- **Projects**: Portfolio projects with GitHub links
- **Contact**: Contact information and social links

## 🚀 Deployment to Vercel

This portfolio is ready for Vercel deployment! Follow these steps:

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - Portfolio website"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect the configuration from `vercel.json`
5. Click "Deploy"

### 3. Environment Variables (if needed)
No environment variables are required for this static portfolio.

## 🔧 Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

## 📁 Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities
│   │   └── hooks/         # Custom hooks
│   └── index.html
├── server/                # Backend (not used in static deployment)
├── shared/               # Shared types and schemas
├── vercel.json          # Vercel deployment configuration
└── README.md
```

## 🎨 Customization

### Colors
The website uses a black and white theme. To modify colors, edit the CSS variables in `client/src/index.css`.

### Content
Update personal information in the following components:
- `Hero.tsx` - Name and titles
- `About.tsx` - Background and description
- `Skills.tsx` - Technical skills
- `Projects.tsx` - Portfolio projects
- `Contact.tsx` - Contact information

### Typography
The website uses SF Pro font family. Font declarations are in `client/src/index.css`.

## 📱 Mobile Optimization

- Touch-friendly buttons and navigation
- Optimized spacing for mobile screens
- Full-width elements on mobile
- Responsive typography scaling
- Mobile-first design approach

## ⚡ Performance

- Vite for fast builds and hot reloading
- Optimized images and assets
- Minimal bundle size
- Lazy loading where appropriate

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 About

Built with ❤️ by **Kamlesh Porwal**  
Student at MIT Ujjain | Full Stack Developer

---

© 2025 Kamlesh Porwal. All rights reserved.