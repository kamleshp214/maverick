# Professional Portfolio Website

A professional, modern portfolio website built with React and Tailwind CSS.

## Features

- Dark theme with blue and green accent colors
- Smooth animated transitions between pages using Framer Motion
- Responsive design that works on all devices
- Multiple pages with navigation:
  - Home: Hero section with introduction
  - About: Bio, skills, education, and experience
  - Projects: Gallery of projects with descriptions and links
  - Blog: List of blog posts
  - Contact: Contact form and information

## Installation

To install and run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The site will be available at http://localhost:5000.

## Customizing Content

### Personal Information

Edit your personal information in the following files:

- Home page: `client/src/pages/Home.js`
- About page: `client/src/pages/About.js`
- Contact page: `client/src/pages/Contact.js`

### Projects

Modify the projects array in `client/src/pages/Projects.js` to include your own projects.

### Blog Posts

Edit the blog posts array in `client/src/pages/Blog.js` to include your own articles.

### Profile Picture

Replace the image URL in `client/src/pages/Home.js` with your own profile picture.

### Social Links

Update the social media links in `client/src/components/ui/SocialLinks.js`.

## Technology Stack

- React
- Tailwind CSS
- Framer Motion (for animations)
- Wouter (for routing)
- Remix Icon (for icons)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
