# Kamlesh Porwal - Portfolio Website 🚀

A modern, minimalist portfolio website showcasing the work and skills of **Kamlesh Porwal**, a Full Stack Developer and student at **MIT Ujjain**. Built with React, TypeScript, and Tailwind CSS, featuring a clean Apple-inspired design with smooth animations and full mobile responsiveness.

## ✨ Key Features

- **🎨 Modern Design**: Clean, minimalist aesthetic inspired by Apple's design language with strict black and white theme
- **📱 Fully Responsive**: Optimized for desktop, tablet, and mobile devices with touch-friendly interfaces
- **✨ Smooth Animations**: Framer Motion powered animations including:
  - Typewriter effect for role titles
  - Scroll-triggered animations
  - Hover effects and micro-interactions
  - Animated scroll indicator
- **⚡ Performance Optimized**: Built with Vite for lightning-fast loading
- **🔧 TypeScript**: Fully typed for better development experience and code reliability
- **♿ Accessibility**: Touch-friendly interface with proper sizing for all devices
- **📊 Interactive Elements**: Hover effects, 3D card transforms, and smooth scrolling
- **📱 Mobile-First**: Enhanced mobile experience with stats showcase and full-width elements

## 🚀 Live Demo

Visit the live website: [Your Vercel URL will appear here after deployment]

## 🛠️ Tech Stack & Architecture

### Frontend Technologies
- **React 18**: Modern React with hooks and functional components
- **TypeScript 5.6**: Type safety and better developer experience
- **Vite**: Ultra-fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for rapid styling

### Styling & Design
- **Custom CSS**: Apple-inspired design system with SF Pro typography
- **Framer Motion**: Advanced animations and transitions
- **Responsive Design**: Mobile-first approach with breakpoint system

### Development Tools
- **ESLint & TypeScript**: Code quality and type checking
- **PostCSS**: CSS processing and optimization
- **Autoprefixer**: Cross-browser compatibility

### Icons & Assets
- **Lucide React**: Clean, consistent icons
- **React Icons**: Additional icon library for social media and brands

## 📱 Portfolio Sections

### 🏠 Hero Section
- **Animated Name Display**: Large, elegant typography with SF Pro font
- **Typewriter Effect**: Rotating professional titles (Full Stack Developer, React Specialist, etc.)
- **Statistics Showcase**: Key metrics (2+ Years experience, 500+ Users served, 40% Efficiency improvement)
- **Call-to-Action Buttons**: "View My Work" and "Download Resume" with hover animations
- **Scroll Indicator**: Animated mouse scroll guide for user navigation

### 👨‍💻 About Section
- **Personal Introduction**: Professional background and MIT Ujjain student status
- **Experience Highlights**: 2+ years of hands-on development experience
- **Technology Focus**: React, TypeScript, and MERN stack specialization
- **Achievements**: Quantified impact and results

### 🛠️ Skills Section
- **Technical Skills Grid**: Organized display of programming languages and frameworks
- **Visual Skill Indicators**: Clean, minimalist design for easy scanning
- **Technology Categories**: Frontend, Backend, Database, and Tools

### 💼 Projects Section
- **Interactive Project Cards**: Hover effects with 3D transforms
- **GitHub Integration**: Direct links to repository code
- **Project Descriptions**: Clear explanations of technologies and achievements
- **Responsive Grid**: Adapts from single column on mobile to multi-column on desktop

### 📧 Contact Section
- **Professional Contact Information**: Email, phone, and location
- **Social Media Links**: GitHub, LinkedIn, and other professional platforms
- **Clean Layout**: Minimalist design focusing on accessibility

## 🎥 Adding Videos to Your Portfolio

### Method 1: Using Video Files (Recommended for Vercel)

#### Step 1: Prepare Your Videos
1. **Optimize your videos** for web:
   - Format: MP4 (H.264 codec)
   - Resolution: 1920x1080 or 1280x720
   - File size: Keep under 10MB for fast loading
   - Duration: 30-60 seconds for project demos

2. **Create video folder structure:**
```
client/
├── public/
│   └── videos/
│       ├── project1-demo.mp4
│       ├── project2-demo.mp4
│       └── project3-demo.mp4
```

#### Step 2: Add Videos to Projects Component
Update your `Projects.tsx` file:

```tsx
// Add this to your project data
const projects = [
  {
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution...",
    tech: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/username/project",
    video: "/videos/ecommerce-demo.mp4", // Add video path
    image: "/images/project1.jpg" // Fallback image
  },
  // ... other projects
];

// In your JSX, add video element:
<div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
  {project.video ? (
    <video 
      className="w-full h-full object-cover"
      autoPlay 
      muted 
      loop 
      playsInline
      poster={project.image} // Fallback image as poster
    >
      <source src={project.video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  ) : (
    <img 
      src={project.image} 
      alt={project.title}
      className="w-full h-full object-cover"
    />
  )}
</div>
```

### Method 2: YouTube Integration (Alternative)

If you prefer hosting videos on YouTube:

#### Step 1: Upload to YouTube
1. Upload your project demo videos to YouTube
2. Set videos as "Unlisted" for privacy
3. Copy the video ID from the URL

#### Step 2: Add YouTube Component
```tsx
// Create a YouTube component
const YouTubeEmbed = ({ videoId }: { videoId: string }) => (
  <div className="aspect-video">
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`}
      title="Project Demo"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="rounded-lg"
    />
  </div>
);

// Use in your projects:
<YouTubeEmbed videoId="your-video-id" />
```

### Method 3: Vimeo Integration (Professional)

For higher quality and better player:

```tsx
const VimeoEmbed = ({ videoId }: { videoId: string }) => (
  <div className="aspect-video">
    <iframe
      src={`https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1`}
      width="100%"
      height="100%"
      frameBorder="0"
      allow="autoplay; fullscreen; picture-in-picture"
      className="rounded-lg"
    />
  </div>
);
```

### Video Best Practices for Portfolio

1. **Keep It Short**: 30-60 seconds maximum
2. **Show Key Features**: Focus on the most impressive functionality
3. **No Audio Required**: Videos should work muted (important for autoplay)
4. **Mobile Optimization**: Ensure videos work well on mobile devices
5. **Fast Loading**: Compress videos to balance quality and load time
6. **Fallback Images**: Always provide poster images for better UX

### File Size Guidelines
- **Excellent**: Under 5MB per video
- **Good**: 5-10MB per video
- **Acceptable**: 10-15MB per video
- **Too Large**: Over 15MB (consider compression)

### Video Compression Tools
- **Online**: CloudConvert, Zamzar
- **Software**: HandBrake (free), Adobe Media Encoder
- **Command Line**: FFmpeg

```bash
# Example FFmpeg compression command
ffmpeg -i input.mp4 -vcodec h264 -acodec mp2 -crf 23 -preset medium output.mp4
```

## 🚀 Complete Deployment Guide

### Prerequisites
- GitHub account
- Vercel account (free)
- Git installed on your computer

### Step-by-Step Deployment

#### 1. Prepare Your Repository
```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "🚀 Initial commit - Kamlesh Porwal Portfolio"

# Set main branch
git branch -M main
```

#### 2. Create GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click "New repository" button
3. Name it something like `kamlesh-portfolio` or `portfolio-website`
4. **Don't** initialize with README (you already have one)
5. Click "Create repository"

#### 3. Connect Local to GitHub
```bash
# Add GitHub remote (replace with your actual repository URL)
git remote add origin https://github.com/yourusername/portfolio-website.git

# Push to GitHub
git push -u origin main
```

#### 4. Deploy to Vercel
1. **Sign Up/Login**: Go to [vercel.com](https://vercel.com)
2. **Sign in with GitHub**: Click "Continue with GitHub"
3. **Import Project**: Click "New Project"
4. **Select Repository**: Find your portfolio repository
5. **Configure Project**:
   - Framework Preset: Vite
   - Build Command: `vite build`
   - Output Directory: `client/dist`
   - Install Command: `npm install`
6. **Deploy**: Click "Deploy" button

#### 5. Custom Domain (Optional)
After deployment, you can add a custom domain:
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Environment Variables
Currently, no environment variables are needed for this static portfolio. If you add features requiring API keys later:

1. In Vercel dashboard → Settings → Environment Variables
2. Add your variables (e.g., `VITE_API_KEY`)
3. Redeploy the project

## 🔧 Local Development Setup

### System Requirements
- **Node.js**: Version 18 or higher
- **npm**: Version 8 or higher
- **Git**: Latest version

### Installation Steps

1. **Clone Repository**
```bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
```

2. **Install Dependencies**
```bash
npm install
```

3. **Start Development Server**
```bash
npm run dev
```

4. **Open in Browser**
Navigate to `http://localhost:5173`

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Type checking
npm run check

# Database operations (if using database features)
npm run db:push
```

## 📁 Detailed Project Structure

```
kamlesh-portfolio/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   │   ├── videos/                  # Project demo videos (add here)
│   │   ├── images/                  # Project screenshots and images
│   │   ├── resume.pdf              # Downloadable resume
│   │   └── favicon.ico             # Website icon
│   ├── src/
│   │   ├── components/             # React components
│   │   │   ├── ui/                 # Reusable UI components (shadcn)
│   │   │   ├── Hero.tsx            # Landing section with typing effect
│   │   │   ├── About.tsx           # Personal background and education
│   │   │   ├── Skills.tsx          # Technical skills showcase
│   │   │   ├── Projects.tsx        # Portfolio projects with videos
│   │   │   ├── Contact.tsx         # Contact information
│   │   │   ├── Navigation.tsx      # Mobile-friendly navigation
│   │   │   └── Portfolio.tsx       # Main portfolio container
│   │   ├── pages/                  # Page components
│   │   │   └── not-found.tsx       # 404 error page
│   │   ├── lib/                    # Utility functions
│   │   │   ├── utils.ts            # Helper functions
│   │   │   └── queryClient.ts      # API client setup
│   │   ├── hooks/                  # Custom React hooks
│   │   │   ├── use-mobile.tsx      # Mobile device detection
│   │   │   └── use-toast.ts        # Toast notification system
│   │   ├── App.tsx                 # Main application component
│   │   ├── main.tsx                # Application entry point
│   │   └── index.css               # Global styles and theme
│   └── index.html                  # HTML template
├── server/                         # Backend (not used in static deployment)
│   ├── index.ts                    # Express server setup
│   ├── routes.ts                   # API routes
│   ├── storage.ts                  # Data storage interface
│   └── vite.ts                     # Vite integration
├── shared/                         # Shared TypeScript types
│   └── schema.ts                   # Data schemas and types
├── vercel.json                     # Vercel deployment configuration
├── package.json                    # Dependencies and scripts
├── tailwind.config.ts              # Tailwind CSS configuration
├── vite.config.ts                  # Vite build configuration
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This comprehensive guide
```

## 🎨 Advanced Customization Guide

### Theme Customization
The portfolio uses a strict black and white theme with Apple-inspired design:

#### Color Variables (`client/src/index.css`)
```css
:root {
  --background: 255 255 255;     /* Pure white background */
  --foreground: 0 0 0;           /* Pure black text */
  --muted: 156 163 175;          /* Gray-400 for subtle text */
  --accent: 0 0 0;               /* Black for emphasis */
}
```

#### Typography System
- **Headers**: SF Pro Display (system font fallback)
- **Body Text**: SF Pro Text (system font fallback)
- **Code**: SF Mono (monospace fallback)

### Content Customization

#### Personal Information
Update these key files with your information:

**Hero Section (`client/src/components/Hero.tsx`)**
```tsx
// Update personal details
const titles = [
  "Full Stack Developer",
  "React Specialist", 
  "TypeScript Engineer",
  "Your Custom Title"
];

// Update statistics
<div className="text-2xl font-semibold">2+</div> // Years of experience
<div className="text-2xl font-semibold">500+</div> // Users served
<div className="text-2xl font-semibold">40%</div> // Efficiency improvement
```

**About Section (`client/src/components/About.tsx`)**
```tsx
// Update your story and background
Results-driven Full Stack Developer and Student at MIT Ujjain with 2+ years...
```

**Skills Section (`client/src/components/Skills.tsx`)**
```tsx
// Update your technical skills
const skills = [
  "React", "TypeScript", "Node.js", "Python", 
  "Add Your Skills Here"
];
```

**Projects Section (`client/src/components/Projects.tsx`)**
```tsx
// Add your actual projects
const projects = [
  {
    title: "Your Project Name",
    description: "Your project description with real achievements",
    tech: ["React", "TypeScript", "Your Tech Stack"],
    github: "https://github.com/yourusername/your-repo",
    video: "/videos/your-demo.mp4",
    live: "https://your-live-site.com" // Optional
  }
];
```

### Animation Customization

#### Framer Motion Settings
Adjust animation timing and effects in component files:

```tsx
// Example: Slower animations
transition={{ duration: 1.2, delay: 0.3 }} // Instead of 0.8, 0.2

// Example: Different animation types
initial={{ opacity: 0, scale: 0.8 }}       // Scale instead of y-translate
animate={{ opacity: 1, scale: 1 }}
```

## 📱 Advanced Mobile Features

### Touch Gestures
```tsx
// Add swipe gestures to project cards
import { motion, PanInfo } from "framer-motion";

const handleSwipe = (event: any, info: PanInfo) => {
  if (info.offset.x > 100) {
    // Swipe right action
  } else if (info.offset.x < -100) {
    // Swipe left action
  }
};

<motion.div 
  onPan={handleSwipe}
  // ... other props
>
```

### Performance Optimizations

#### Image Optimization
```tsx
// Lazy loading for images
<img 
  src="/images/project.jpg"
  loading="lazy"
  alt="Project screenshot"
/>

// Multiple formats for better performance
<picture>
  <source srcSet="/images/project.webp" type="image/webp" />
  <source srcSet="/images/project.jpg" type="image/jpeg" />
  <img src="/images/project.jpg" alt="Project screenshot" />
</picture>
```

#### Video Optimization
```tsx
// Intersection Observer for video autoplay
const [isVisible, setIsVisible] = useState(false);
const videoRef = useRef<HTMLVideoElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => setIsVisible(entry.isIntersecting),
    { threshold: 0.5 }
  );
  
  if (videoRef.current) observer.observe(videoRef.current);
  return () => observer.disconnect();
}, []);
```

## 🔍 SEO Optimization

### Meta Tags (`client/index.html`)
```html
<meta name="description" content="Kamlesh Porwal - Full Stack Developer and MIT Ujjain Student. Specializing in React, TypeScript, and modern web development.">
<meta name="keywords" content="Full Stack Developer, React Developer, TypeScript, MIT Ujjain, Portfolio">
<meta property="og:title" content="Kamlesh Porwal - Full Stack Developer Portfolio">
<meta property="og:description" content="Experienced developer with 2+ years in React and TypeScript development">
<meta property="og:image" content="/images/portfolio-preview.jpg">
<meta name="twitter:card" content="summary_large_image">
```

### Structured Data
Add JSON-LD structured data for better search visibility:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Kamlesh Porwal",
  "jobTitle": "Full Stack Developer",
  "alumniOf": "MIT Ujjain",
  "url": "https://your-portfolio-url.vercel.app",
  "sameAs": [
    "https://github.com/yourusername",
    "https://linkedin.com/in/yourusername"
  ]
}
</script>
```

## 🚀 Advanced Deployment Options

### Vercel Environment Variables
For dynamic features, set environment variables in Vercel:

```bash
# Example environment variables
VITE_GITHUB_TOKEN=your_github_token
VITE_EMAIL_SERVICE_ID=your_email_service
VITE_ANALYTICS_ID=your_analytics_id
```

### Custom Domain Setup
1. Purchase domain from registrar (Namecheap, GoDaddy, etc.)
2. In Vercel dashboard: Settings → Domains
3. Add your domain: `yourname.dev` or `yourportfolio.com`
4. Update DNS records as instructed by Vercel

### Performance Monitoring
Add analytics and performance monitoring:

```tsx
// Google Analytics integration
import { useEffect } from 'react';

useEffect(() => {
  // Initialize GA4
  window.gtag('config', 'GA_MEASUREMENT_ID');
}, []);
```

## 🛠️ Troubleshooting Common Issues

### Build Errors
```bash
# Clear cache and rebuild
rm -rf node_modules client/dist
npm install
npm run build
```

### Video Not Playing
- Check file format (MP4 with H.264 codec)
- Ensure file size is under 10MB
- Verify file path starts with `/videos/`
- Test on different browsers

### Mobile Navigation Issues
- Verify touch targets are at least 44px
- Check z-index conflicts
- Test on real mobile devices

### Slow Loading
- Compress images and videos
- Use WebP format for images
- Enable lazy loading
- Minimize bundle size

## 📞 Support and Community

### Getting Help
- **GitHub Issues**: Create issues for bugs or feature requests
- **Community**: Join React and TypeScript communities
- **Documentation**: Refer to official docs for dependencies

### Contributing
If others want to contribute to your portfolio:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License and Credits

### Open Source License
This project is available under the MIT License, allowing free use and modification.

### Dependencies Credits
- **React**: Meta (Facebook) - UI library
- **Tailwind CSS**: Tailwind Labs - Utility-first CSS
- **Framer Motion**: Framer - Animation library
- **Vite**: Evan You - Build tool
- **TypeScript**: Microsoft - Type safety

## 👨‍💻 About the Developer

**Kamlesh Porwal**  
🎓 Student at MIT Ujjain  
💻 Full Stack Developer with 2+ years experience  
🚀 Specializing in React, TypeScript, and MERN stack  

### Connect with Kamlesh
- **GitHub**: [Your GitHub Profile]
- **LinkedIn**: [Your LinkedIn Profile]  
- **Email**: [Your Professional Email]
- **Portfolio**: [Your Live Portfolio URL]

---

**Built with passion and modern web technologies**  
© 2025 Kamlesh Porwal. All rights reserved.