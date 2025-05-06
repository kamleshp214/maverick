import React from 'react';

const Projects = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Projects</h1>
            <p className="mb-4">Here are some of the projects I've worked on:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Example project card */}
                <div className="border rounded-lg p-4 shadow-lg">
                    <h2 className="text-xl font-semibold">Project Title</h2>
                    <p className="mt-2">Brief description of the project.</p>
                    <a href="#" className="text-blue-500 hover:underline mt-2 inline-block">View Project</a>
                </div>
                {/* Add more project cards as needed */}
            </div>
        </div>
    );
};

export default Projects;