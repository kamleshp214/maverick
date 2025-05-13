export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: string[];
  matchScore?: number;
  fileName: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  description: string[];
}

export interface StudentFeedbackData {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  keywordSuggestions: string[];
  interviewQuestions: string[];
  scoreBreakdown: {
    structure: number;
    content: number;
    keywords: number;
    formatting: number;
    overall: number;
  };
}

export interface ResumeContextType {
  userRole: 'recruiter' | 'student' | null;
  candidates: Candidate[];
  selectedCandidates: string[];
  studentFeedback: StudentFeedbackData | null;
  jobDescription: string;
  setUserRole: (role: 'recruiter' | 'student' | null) => void;
  setCandidates: (candidates: Candidate[]) => void;
  setSelectedCandidates: (ids: string[]) => void;
  setStudentFeedback: (feedback: StudentFeedbackData) => void;
  setJobDescription: (description: string) => void;
  toggleCandidateSelection: (id: string) => void;
  clearAll: () => void;
}