import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const parseResumes = async (files: File[], jobDescription?: string) => {
  const formData = new FormData();
  
  files.forEach((file) => {
    formData.append('file', file);
  });
  
  if (jobDescription) {
    formData.append('jobDescription', jobDescription);
  }
  
  try {
    const response = await axios.post(`${API_URL}/api/parse`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error parsing resumes:', error);
    throw error;
  }
};