import React from 'react';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-center mb-4">Welcome to My Portfolio</h1>
            <p className="text-lg text-center mb-8">I'm a passionate developer showcasing my work and skills.</p>
            <a href="#projects" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                View My Projects
            </a>
        </div>
    );
};

export default Home;