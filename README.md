# Kamlesh Porwal - Portfolio Website

A clean, minimalist portfolio website showcasing the work and skills of Kamlesh Porwal, a Full Stack Developer. Built with React, TypeScript, Tailwind CSS, and Framer Motion, featuring an Apple-inspired design philosophy with a focus on simplicity and elegance.

## ✨ Features

- **Apple-Inspired Design**: Clean black and white aesthetic with SF Pro typography
- **Fully Mobile Responsive**: Optimized for all screen sizes with thoughtful mobile-first design
- **Smooth Animations**: Powered by Framer Motion for subtle, professional interactions
- **Modern Navigation**: Sticky header with clean hamburger menu and resume download
- **GitHub Integration**: Direct links to project repositories on each project card
- **Typewriter Effect**: Elegant animated text in the hero section
- **Project Showcase**: Modal-based project details with embedded video demos
- **Performance Optimized**: Built with Vite for lightning-fast loading
- **Clean Contact Section**: Streamlined social links without unnecessary forms

## 🎨 Design Philosophy

- **Minimalism**: Clean, uncluttered interface focusing on content
- **Typography**: SF Pro Display and SF Pro Text for that authentic Apple feel
- **Color Scheme**: Strict black and white palette for timeless elegance
- **Spacing**: Generous whitespace following Apple's design principles
- **Consistency**: Uniform design patterns throughout all sections

## 📱 Mobile Responsiveness

- **Adaptive Layout**: Seamlessly adjusts to all screen sizes (320px to 4K+)
- **Touch-Friendly**: Optimized button sizes and tap targets for mobile
- **Responsive Typography**: Fluid text scaling for perfect readability
- **Mobile Navigation**: Clean hamburger menu with slide-in animation
- **Optimized Images**: Properly sized and compressed for fast mobile loading

## 🔧 Technologies Used

### Frontend Stack
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Vite** for fast development and building
- **Radix UI** for accessible components

### Typography & Fonts
- **SF Pro Display** for headings and display text
- **SF Pro Text** for body text and UI elements
- Fallback to system fonts for optimal performance

### External Integrations
- **GitHub** for project repository links
- **YouTube** for project demo videos
- **Email & Social Links** for direct contact

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/kamleshp214/portfolio.git
cd portfolio
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Visit `http://localhost:5000` to see the portfolio in action!

## 📁 Project Structure

```
portfolio/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Hero.tsx    # Hero section with typewriter effect
│   │   │   ├── About.tsx   # About section
│   │   │   ├── Skills.tsx  # Technical skills grid
│   │   │   ├── Projects.tsx# Project showcase with GitHub links
│   │   │   ├── Contact.tsx # Contact information
│   │   │   └── Navigation.tsx # Header navigation
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Page components
│   │   └── index.css      # Global styles and utilities
│   └── index.html         # Main HTML template
├── server/                # Express server
├── shared/                # Shared TypeScript types
├── public/                # Static assets
│   └── resume.pdf         # Resume file for download
├── package.json           # Dependencies and scripts
├── tailwind.config.ts     # Tailwind CSS configuration
├── vite.config.ts         # Vite build configuration
└── README.md             # Project documentation
```

## 🎯 Key Sections

### 🏠 Hero Section
- Large, elegant typography with SF Pro Display
- Animated typewriter effect showing "Full Stack Developer"
- Two call-to-action buttons: "View My Work" and "Download Resume"
- Fully responsive with fluid text scaling

### 👨‍💻 About Section
- Clean card design with professional summary
- Highlights key achievements with bold emphasis
- Responsive padding and typography

### 🛠 Skills Section
- Organized into 6 categories for easy scanning
- Interactive hover effects on skill tags
- Responsive grid layout (1/2/3 columns based on screen size)

### 💼 Projects Section
- 4 featured projects with GitHub integration
- Each card includes:
  - Project title and description
  - Technology stack tags
  - GitHub repository link
  - Demo video modal
- Responsive card layout

### 📞 Contact Section
- Clean, minimal design
- Direct email, LinkedIn, and GitHub links
- No unnecessary contact forms

## 📱 Mobile Optimization

### Responsive Breakpoints
- **Mobile**: 320px - 640px (sm)
- **Tablet**: 641px - 1024px (md/lg)
- **Desktop**: 1025px+ (xl/2xl)

### Mobile-Specific Features
- Hamburger menu with smooth slide animation
- Touch-optimized button sizes (44px minimum)
- Optimized font sizes for mobile readability
- Proper spacing for thumb navigation

## 🎨 Customization Guide

### Colors
The design uses a strict black and white palette. To modify:

```css
/* In index.css */
:root {
  --background: 0 0% 100%;    /* White background */
  --foreground: 0 0% 0%;      /* Black text */
  --muted: 0 0% 96%;          /* Light gray accents */
}
```

### Typography
To change fonts, update the imports in `index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@100;200;300;400;500;600;700;800;900&display=swap');
```

### Adding New Projects
Update the projects array in `client/src/components/Projects.tsx`:

```typescript
const projects = [
  {
    title: "Your Project Name",
    description: "Project description...",
    technologies: ["React", "TypeScript", "..."],
    githubUrl: "https://github.com/yourusername/project",
    videoId: "YOUR_YOUTUBE_VIDEO_ID"
  }
];
```

### Updating Personal Information
- **Contact details**: Edit `client/src/components/Contact.tsx`
- **About section**: Modify `client/src/components/About.tsx`
- **Skills**: Update arrays in `client/src/components/Skills.tsx`
- **Resume**: Replace `public/resume.pdf` with your resume

## 🚀 Deployment

### Vercel (Recommended)
1. **Connect your GitHub repository to Vercel**
2. **Set build settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Deploy automatically on every push**

### Netlify
1. **Connect repository to Netlify**
2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`

### Manual Deployment
```bash
# Build the project
npm run build

# Upload the dist/ folder to your hosting provider
```

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting (recommended)

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch:** `git checkout -b feature/amazing-feature`
3. **Commit changes:** `git commit -m 'Add amazing feature'`
4. **Push to branch:** `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Apple Inc.** for design inspiration
- **Vercel** for hosting platform
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Radix UI** for accessible components

---

**Built with ❤️ by [Kamlesh Porwal](https://github.com/kamleshp214)**

*Last updated: December 2024*
