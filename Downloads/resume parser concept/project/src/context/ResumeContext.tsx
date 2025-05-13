import React, { createContext, useContext, useState } from 'react';
import { Candidate, StudentFeedbackData, ResumeContextType } from '../types';

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<'recruiter' | 'student' | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [studentFeedback, setStudentFeedback] = useState<StudentFeedbackData | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');

  const toggleCandidateSelection = (id: string) => {
    setSelectedCandidates((prev) => {
      if (prev.includes(id)) {
        return prev.filter((candidateId) => candidateId !== id);
      } else {
        return prev.length < 3 ? [...prev, id] : prev;
      }
    });
  };

  const clearAll = () => {
    setUserRole(null);
    setCandidates([]);
    setSelectedCandidates([]);
    setStudentFeedback(null);
    setJobDescription('');
  };

  return (
    <ResumeContext.Provider
      value={{
        userRole,
        candidates,
        selectedCandidates,
        studentFeedback,
        jobDescription,
        setUserRole,
        setCandidates,
        setSelectedCandidates,
        setStudentFeedback,
        setJobDescription,
        toggleCandidateSelection,
        clearAll,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResumeContext must be used within a ResumeProvider');
  }
  return context;
};