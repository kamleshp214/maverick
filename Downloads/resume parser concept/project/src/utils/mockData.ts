import { Candidate, StudentFeedbackData } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const generateMockCandidates = (files: File[], jobDescription: string): Candidate[] => {
  const mockNames = [
    'Emily Johnson', 'Michael Chen', 'Sarah Williams', 'David Rodriguez', 
    'Jessica Lee', 'Robert Smith', 'Olivia Davis', 'James Wilson', 
    'Sophia Martinez', 'Benjamin Taylor'
  ];
  
  const mockSkills = [
    'JavaScript', 'React', 'TypeScript', 'Node.js', 'Python', 'SQL', 
    'AWS', 'Docker', 'Git', 'HTML/CSS', 'UI/UX Design', 'Agile', 
    'Data Analysis', 'MongoDB', 'Redux', 'GraphQL', 'Figma', 
    'Express.js', 'Next.js', 'CI/CD', 'Jest', 'REST APIs'
  ];
  
  const mockEducation = [
    { degree: 'B.S. Computer Science', institution: 'Stanford University', year: '2020' },
    { degree: 'M.S. Software Engineering', institution: 'MIT', year: '2022' },
    { degree: 'B.A. Information Systems', institution: 'UC Berkeley', year: '2019' },
    { degree: 'Ph.D. Computer Science', institution: 'Harvard University', year: '2021' },
    { degree: 'B.S. Web Development', institution: 'Georgia Tech', year: '2018' }
  ];
  
  const mockExperience = [
    { 
      title: 'Senior Frontend Developer', 
      company: 'Google', 
      duration: '2020-Present',
      description: ['Developed React applications', 'Led team of 5 developers', 'Implemented CI/CD pipeline']
    },
    { 
      title: 'Software Engineer', 
      company: 'Microsoft', 
      duration: '2018-2020',
      description: ['Built microservices', 'Improved performance by 40%', 'Implemented unit tests']
    },
    { 
      title: 'Full Stack Developer', 
      company: 'Amazon', 
      duration: '2017-2019',
      description: ['Created REST APIs', 'Developed UI components', 'Optimized database queries']
    },
    { 
      title: 'Frontend Engineer', 
      company: 'Facebook', 
      duration: '2016-2018',
      description: ['Implemented responsive designs', 'Reduced bundle size', 'Built reusable components']
    }
  ];

  return files.map((file, index) => {
    // Randomly select number of skills (between 5-10)
    const skillCount = Math.floor(Math.random() * 6) + 5;
    const shuffledSkills = [...mockSkills].sort(() => 0.5 - Math.random());
    const selectedSkills = shuffledSkills.slice(0, skillCount);
    
    // Randomly select number of education entries (1-2)
    const eduCount = Math.floor(Math.random() * 2) + 1;
    const shuffledEducation = [...mockEducation].sort(() => 0.5 - Math.random());
    const selectedEducation = shuffledEducation.slice(0, eduCount);
    
    // Randomly select number of experience entries (1-3)
    const expCount = Math.floor(Math.random() * 3) + 1;
    const shuffledExperience = [...mockExperience].sort(() => 0.5 - Math.random());
    const selectedExperience = shuffledExperience.slice(0, expCount);
    
    // Calculate a match score if job description provided
    const matchScore = jobDescription 
      ? Math.floor(Math.random() * 41) + 60 // Random score between 60-100
      : undefined;
    
    return {
      id: uuidv4(),
      name: mockNames[index % mockNames.length],
      email: `${mockNames[index % mockNames.length].split(' ')[0].toLowerCase()}@example.com`,
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      skills: selectedSkills,
      education: selectedEducation,
      experience: selectedExperience,
      matchScore,
      fileName: file.name
    };
  });
};

export const generateMockStudentFeedback = (jobDescription: string): StudentFeedbackData => {
  // Generate random scores for each category
  const structureScore = Math.floor(Math.random() * 31) + 70; // 70-100
  const contentScore = Math.floor(Math.random() * 31) + 60; // 60-90
  const keywordsScore = Math.floor(Math.random() * 41) + 50; // 50-90
  const formattingScore = Math.floor(Math.random() * 31) + 70; // 70-100
  
  // Overall score is an average of the other scores
  const overallScore = Math.floor((structureScore + contentScore + keywordsScore + formattingScore) / 4);

  const strengths = [
    'Clear and concise summary statement',
    'Strong technical skills section',
    'Quantified achievements with metrics',
    'Well-organized education section',
    'Consistent formatting throughout'
  ];

  const weaknesses = [
    'Experience descriptions lack specific achievements',
    'Missing relevant keywords for ATS optimization',
    'Too much technical jargon without explanation',
    'Resume exceeds recommended one-page length'
  ];

  const suggestions = [
    'Add measurable achievements to each job experience',
    'Include more industry-specific keywords in your skills section',
    'Tailor your summary statement to match specific job descriptions',
    'Remove outdated or irrelevant experience to focus on recent achievements',
    'Use action verbs to begin each bullet point in your experience section'
  ];

  const keywordSuggestions = jobDescription
    ? ['JavaScript', 'React', 'TypeScript', 'Front-end Development', 'UI/UX', 'Responsive Design', 'Performance Optimization']
    : ['JavaScript', 'React', 'TypeScript', 'Node.js', 'RESTful APIs', 'Git', 'Agile'];

  const interviewQuestions = [
    'Can you describe a challenging project you worked on and how you overcame obstacles?',
    'How do you stay current with the latest trends and technologies in your field?',
    'Tell me about a time when you had to learn a new technology quickly.',
    'How do you approach problem-solving when faced with a complex technical issue?',
    'Describe a situation where you had to collaborate with a difficult team member.'
  ];

  return {
    score: overallScore,
    strengths: strengths.slice(0, 3 + Math.floor(Math.random() * 3)), // 3-5 strengths
    weaknesses: weaknesses.slice(0, 2 + Math.floor(Math.random() * 3)), // 2-4 weaknesses
    suggestions: suggestions.slice(0, 3 + Math.floor(Math.random() * 3)), // 3-5 suggestions
    keywordSuggestions,
    interviewQuestions,
    scoreBreakdown: {
      structure: structureScore,
      content: contentScore,
      keywords: keywordsScore,
      formatting: formattingScore,
      overall: overallScore
    }
  };
};