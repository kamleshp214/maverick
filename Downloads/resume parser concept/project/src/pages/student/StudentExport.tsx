import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ArrowLeft, Check, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useResumeContext } from '../../context/ResumeContext';

const StudentExport: React.FC = () => {
  const navigate = useNavigate();
  const { studentFeedback } = useResumeContext();
  const [exportOptions, setExportOptions] = useState({
    includeScore: true,
    includeStrengths: true,
    includeWeaknesses: true,
    includeSuggestions: true,
    includeKeywords: true,
    includeInterviewQuestions: true,
    includeChart: true,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  
  if (!studentFeedback) {
    navigate('/upload/student');
    return null;
  }

  const handleOptionToggle = (option: keyof typeof exportOptions) => {
    setExportOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleExport = () => {
    // In a real application, this would generate and download the PDF
    // This is a mock implementation
    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      alert('Resume feedback report has been downloaded!');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/student/feedback')}
          icon={<ArrowLeft size={16} />}
          className="mr-3"
        >
          Back to Feedback
        </Button>
        <h1 className="text-2xl font-bold text-charcoal">Export Feedback Report</h1>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold text-charcoal mb-6">Report Options</h2>
          
          <div className="space-y-3 mb-8">
            {Object.entries(exportOptions).map(([option, isSelected]) => (
              <motion.div
                key={option}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                whileHover={{ x: 5 }}
              >
                <label className="flex items-center justify-between p-3 bg-ivory rounded-md cursor-pointer">
                  <span className="text-charcoal capitalize">
                    {option.replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase())
                      .replace('Include ', '')}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center ${
                      isSelected ? 'bg-coral' : 'border-2 border-gray-300'
                    }`}
                    onClick={() => handleOptionToggle(option as keyof typeof exportOptions)}
                  >
                    {isSelected && <Check size={16} className="text-white" />}
                  </div>
                </label>
              </motion.div>
            ))}
          </div>
          
          <div className="bg-ivory rounded-md p-4 mb-8">
            <h3 className="font-medium text-charcoal mb-2">Report Preview</h3>
            <div className="flex items-center">
              <FileText size={40} className="text-charcoal mr-4" />
              <div>
                <p className="font-medium">Resume Feedback Report.pdf</p>
                <p className="text-sm text-charcoal-light">
                  Your report will include {Object.values(exportOptions).filter(Boolean).length} sections with
                  personalized feedback and suggestions.
                </p>
              </div>
            </div>
          </div>
          
          <Button
            onClick={handleExport}
            className="w-full"
            disabled={isGenerating}
            icon={isGenerating ? undefined : <Download size={18} />}
          >
            {isGenerating ? (
              <div className="flex items-center">
                <FileText className="animate-pulse mr-2" size={18} />
                <span>Generating Report...</span>
              </div>
            ) : (
              'Download PDF Report'
            )}
          </Button>
        </Card>

        <div className="text-center text-sm text-charcoal-light mb-8">
          <p>
            Your data is never stored on our servers and will be permanently deleted after your session.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentExport;