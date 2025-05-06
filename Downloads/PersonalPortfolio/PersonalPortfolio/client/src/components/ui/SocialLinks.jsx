const SocialLinks = ({ vertical = false }) => {
  const socialMedia = [
    { icon: "ri-github-fill", href: "https://github.com", label: "GitHub" },
    { icon: "ri-linkedin-fill", href: "https://linkedin.com", label: "LinkedIn" },
    { icon: "ri-twitter-fill", href: "https://twitter.com", label: "Twitter" },
    { icon: "ri-dribbble-fill", href: "https://dribbble.com", label: "Dribbble" }
  ];

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