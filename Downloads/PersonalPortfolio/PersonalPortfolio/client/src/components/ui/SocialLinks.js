/**
 * Social media links component for the portfolio
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.vertical - Whether to display links vertically with background
 * @returns {JSX.Element} - Rendered component
 * 
 * CUSTOMIZATION GUIDE:
 * - To add/remove social media links, edit the socialMedia array below
 * - Each social link needs: icon, href, and label
 * - Icon names use Remix Icon format (ri-*-fill or ri-*-line)
 *   Find icons at: https://remixicon.com/
 * - Replace the href values with your actual social media profile URLs
 */
const SocialLinks = ({ vertical = false }) => {
  // ============================================================
  // CUSTOMIZE YOUR SOCIAL MEDIA LINKS HERE
  // ============================================================
  const socialMedia = [
    { icon: "ri-github-fill", href: "https://github.com", label: "GitHub" },
    { icon: "ri-linkedin-fill", href: "https://linkedin.com", label: "LinkedIn" },
    // Add more social media platforms as needed by uncommenting or adding new ones:
    // { icon: "ri-twitter-fill", href: "https://twitter.com", label: "Twitter" },
    // { icon: "ri-dribbble-fill", href: "https://dribbble.com", label: "Dribbble" },
    // { icon: "ri-instagram-fill", href: "https://instagram.com", label: "Instagram" },
    // { icon: "ri-medium-fill", href: "https://medium.com", label: "Medium" },
    // { icon: "ri-stack-overflow-fill", href: "https://stackoverflow.com", label: "Stack Overflow" },
    // { icon: "ri-youtube-fill", href: "https://youtube.com", label: "YouTube" },
  ];

  // Vertical layout with background squares (used in About page)
  if (vertical) {
    return (
      <div className="flex gap-4">
        {socialMedia.map((item, index) => (
          <a 
            key={index} 
            href={item.href} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label={item.label}
            className="w-10 h-10 rounded-lg bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-text-primary transition-colors"
          >
            <i className={item.icon}></i>
          </a>
        ))}
      </div>
    );
  }

  // Standard horizontal layout (used in footer, etc.)
  return (
    <div className="flex gap-4">
      {socialMedia.map((item, index) => (
        <a 
          key={index} 
          href={item.href} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label={item.label}
          className="text-text-secondary hover:text-primary-accent transition-colors"
        >
          <i className={`${item.icon} text-xl`}></i>
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
