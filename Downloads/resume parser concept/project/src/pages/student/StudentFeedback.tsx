import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ExternalLink, ChevronRight, FileText, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  ResponsiveContainer 
} from 'recharts';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useResumeContext } from '../../context/ResumeContext';

const StudentFeedback: React.FC = () => {
  const navigate = useNavigate();
  const { studentFeedback, jobDescription } = useResumeContext();
  
  if (!studentFeedback) {
    navigate('/upload/student');
    return null;
  }

  const chartData = [
    { category: 'Structure', value: studentFeedback.scoreBreakdown.structure },
    { category: 'Content', value: studentFeedback.scoreBreakdown.content },
    { category: 'Keywords', value: studentFeedback.scoreBreakdown.keywords },
    { category: 'Formatting', value: studentFeedback.scoreBreakdown.formatting },
    { category: 'Overall', value: studentFeedback.scoreBreakdown.overall },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-charcoal mb-2">Resume Feedback</h1>
          <p className="text-charcoal-light">
            AI-powered analysis and suggestions for your resume
            {jobDescription && ' • Matched to your target job'}
          </p>
        </div>
        
        <div className="flex mt-4 md:mt-0">
          <Button
            onClick={() => navigate('/student/export')}
            icon={<Download size={18} />}
          >
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-charcoal">Resume Score</h2>
              <div className={`px-3 py-1 rounded-full font-medium text-sm ${
                studentFeedback.score >= 80 ? 'bg-olive/10 text-olive' :
                studentFeedback.score >= 60 ? 'bg-amber-500/10 text-amber-500' : 
                'bg-coral/10 text-coral'
              }`}>
                {studentFeedback.score}/100
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                  <PolarGrid stroke="#e0e0e0" />
                  <PolarAngleAxis dataKey="category" tick={{ fill: '#2D2D2D', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#2D2D2D' }} />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#FF6B6B"
                    fill="#FF6B6B"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 text-sm text-charcoal-light">
              <p>This chart shows how your resume scores across different dimensions.</p>
            </div>
          </Card>

          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold text-charcoal mb-6">Areas to Improve</h2>
            
            <div className="space-y-4">
              {studentFeedback.weaknesses.map((weakness, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-coral/5 rounded-lg border-l-4 border-coral"
                >
                  <div className="flex">
                    <Info size={20} className="text-coral mr-3 shrink-0 mt-0.5" />
                    <p className="text-charcoal">{weakness}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold text-charcoal mb-6">Recommended Keywords</h2>
            <p className="text-charcoal-light mb-4">
              Including these keywords can help your resume get past Applicant Tracking Systems (ATS).
            </p>
            
            <div className="flex flex-wrap gap-2">
              {studentFeedback.keywordSuggestions.map((keyword, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-3 py-1.5 bg-olive/10 text-olive rounded-full text-sm"
                >
                  {keyword}
                </motion.span>
              ))}
            </div>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold text-charcoal mb-6">Strengths</h2>
            
            <div className="space-y-3">
              {studentFeedback.strengths.map((strength, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <div className="rounded-full bg-olive/10 p-1 mr-3 mt-0.5">
                    <Check size={16} className="text-olive" />
                  </div>
                  <p className="text-charcoal">{strength}</p>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold text-charcoal mb-6">Actionable Suggestions</h2>
            
            <div className="space-y-4">
              {studentFeedback.suggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start p-3 rounded-md hover:bg-gray-50 transition-colors">
                    <div className="mr-3 mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity">
                      <ChevronRight size={16} className="text-coral" />
                    </div>
                    <p className="text-charcoal">{suggestion}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-charcoal mb-6">Sample Interview Questions</h2>
            <p className="text-charcoal-light mb-4">
              Based on your resume, be prepared to answer these questions in interviews.
            </p>
            
            <div className="space-y-4">
              {studentFeedback.interviewQuestions.map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-ivory p-4 rounded-md"
                >
                  <div className="flex">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-charcoal flex items-center justify-center mr-3">
                      <span className="text-xs text-ivory font-medium">{index + 1}</span>
                    </div>
                    <p className="text-charcoal">{question}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Check = (props: React.ComponentProps<typeof motion.svg>) => (
  <motion.svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </motion.svg>
);

export default StudentFeedback;