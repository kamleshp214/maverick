import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
                <p>
                    <a href="https://github.com/yourusername" className="text-gray-400 hover:text-white">GitHub</a> | 
                    <a href="https://linkedin.com/in/yourusername" className="text-gray-400 hover:text-white"> LinkedIn</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;