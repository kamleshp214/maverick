import React from 'react';

const About = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">About Me</h1>
            <p className="mb-4">
                I am a passionate web developer with experience in building dynamic and responsive web applications. 
                My journey in web development started with a fascination for creating interactive user experiences.
            </p>
            <h2 className="text-2xl font-semibold mb-2">Skills</h2>
            <ul className="list-disc list-inside mb-4">
                <li>JavaScript</li>
                <li>React</li>
                <li>Tailwind CSS</li>
                <li>Node.js</li>
                <li>Express</li>
            </ul>
            <p>
                I enjoy collaborating with others and continuously learning new technologies to enhance my skills. 
                Feel free to check out my projects and get in touch!
            </p>
        </div>
    );
};

export default About;