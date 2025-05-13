import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import FileUpload from '../components/FileUpload';
import { useResumeContext } from '../context/ResumeContext';
import { parseResumes } from '../utils/api';

const UploadPage: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [jobDescription, setJobDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const { setCandidates, setStudentFeedback, setJobDescription: setContextJobDescription } = useResumeContext();

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedFiles.length === 0) {
      return;
    }
    
    setIsUploading(true);
    
    try {
      const results = await parseResumes(selectedFiles, jobDescription);
      setContextJobDescription(jobDescription);
      
      if (role === 'recruiter') {
        setCandidates(results);
        navigate('/recruiter/dashboard');
      } else if (role === 'student') {
        setStudentFeedback(results[0]);
        navigate('/student/feedback');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      // Handle error (show error message to user)
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-charcoal mb-4">
            {role === 'recruiter' ? 'Upload Resumes' : 'Upload Your Resume'}
          </h1>
          <p className="text-charcoal-light">
            {role === 'recruiter'
              ? 'Upload up to 10 resumes to analyze and compare candidates'
              : 'Upload your resume to receive AI-powered feedback and suggestions'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <FileUpload
            multiple={role === 'recruiter'}
            onFilesSelected={handleFilesSelected}
            maxFiles={role === 'recruiter' ? 10 : 1}
            className="mb-8"
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
          />

          <div className="mb-8">
            <label htmlFor="jobDescription" className="block font-medium text-charcoal mb-2">
              Job Description (Optional)
            </label>
            <p className="text-sm text-charcoal-light mb-3">
              {role === 'recruiter'
                ? 'Add a job description to match candidates to your requirements'
                : 'Add a job description to receive tailored feedback for this specific role'}
            </p>
            <textarea
              id="jobDescription"
              rows={5}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
              placeholder="Paste the job description here..."
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={selectedFiles.length === 0 || isUploading}
              icon={isUploading ? undefined : <Upload size={18} />}
              className="min-w-[150px]"
            >
              {isUploading ? (
                <div className="flex items-center">
                  <FileText className="animate-pulse mr-2" size={18} />
                  <span>Processing...</span>
                </div>
              ) : (
                'Upload & Analyze'
              )}
            </Button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-charcoal-light">
          <p>
            By uploading, you agree that your data is processed in-memory only and not stored.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default UploadPage;