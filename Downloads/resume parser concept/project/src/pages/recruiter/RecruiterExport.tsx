import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, ArrowLeft, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useResumeContext } from '../../context/ResumeContext';

const RecruiterExport: React.FC = () => {
  const navigate = useNavigate();
  const { candidates, selectedCandidates } = useResumeContext();
  const [selectedFields, setSelectedFields] = useState({
    name: true,
    email: true,
    phone: true,
    skills: true,
    education: true,
    experience: true,
    matchScore: true,
  });
  const [exportFormat, setExportFormat] = useState<'csv' | 'json'>('csv');
  const [exportType, setExportType] = useState<'all' | 'selected'>('all');
  
  if (candidates.length === 0) {
    navigate('/recruiter/dashboard');
    return null;
  }

  const handleFieldToggle = (field: keyof typeof selectedFields) => {
    setSelectedFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleExport = () => {
    // In a real application, this would generate and download the file
    // This is a mock implementation
    const fieldsToExport = Object.entries(selectedFields)
      .filter(([_, isSelected]) => isSelected)
      .map(([field]) => field);
    
    const candidatesToExport = exportType === 'selected'
      ? candidates.filter((c) => selectedCandidates.includes(c.id))
      : candidates;
    
    alert(`Exporting ${candidatesToExport.length} candidates with fields: ${fieldsToExport.join(', ')} as ${exportFormat.toUpperCase()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => navigate('/recruiter/dashboard')}
          icon={<ArrowLeft size={16} />}
          className="mr-3"
        >
          Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold text-charcoal">Export Data</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-charcoal mb-6">Export Options</h2>
          
          <div className="mb-6">
            <h3 className="font-medium text-charcoal mb-3">Data to Export</h3>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  checked={exportType === 'all'}
                  onChange={() => setExportType('all')}
                  className="mr-2 accent-coral"
                />
                <span>All Candidates ({candidates.length})</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  checked={exportType === 'selected'}
                  onChange={() => setExportType('selected')}
                  className="mr-2 accent-coral"
                  disabled={selectedCandidates.length === 0}
                />
                <span>
                  Selected Candidates ({selectedCandidates.length})
                  {selectedCandidates.length === 0 && ' - Select candidates first'}
                </span>
              </label>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-medium text-charcoal mb-3">File Format</h3>
            <div className="space-y-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  checked={exportFormat === 'csv'}
                  onChange={() => setExportFormat('csv')}
                  className="mr-2 accent-coral"
                />
                <span>CSV (Excel, Google Sheets)</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  checked={exportFormat === 'json'}
                  onChange={() => setExportFormat('json')}
                  className="mr-2 accent-coral"
                />
                <span>JSON (Developer friendly)</span>
              </label>
            </div>
          </div>
          
          <div>
            <Button
              onClick={handleExport}
              className="w-full"
              icon={<Download size={18} />}
            >
              Export Data
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-charcoal mb-6">Fields to Include</h2>
          
          <div className="space-y-3">
            {Object.entries(selectedFields).map(([field, isSelected]) => (
              <motion.div
                key={field}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                whileHover={{ x: 5 }}
              >
                <label className="flex items-center justify-between p-3 bg-ivory rounded-md cursor-pointer">
                  <span className="text-charcoal capitalize">{field}</span>
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center ${
                      isSelected ? 'bg-coral' : 'border-2 border-gray-300'
                    }`}
                    onClick={() => handleFieldToggle(field as keyof typeof selectedFields)}
                  >
                    {isSelected && <Check size={16} className="text-white" />}
                  </div>
                </label>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 text-sm text-charcoal-light">
            <p>
              Selected fields will be included in your export file. The data will not be stored on our servers.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RecruiterExport;