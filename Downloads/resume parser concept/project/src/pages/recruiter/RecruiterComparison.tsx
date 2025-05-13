import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/Button';
import { useResumeContext } from '../../context/ResumeContext';
import Card from '../../components/Card';

const RecruiterComparison: React.FC = () => {
  const navigate = useNavigate();
  const { candidates, selectedCandidates, jobDescription } = useResumeContext();
  
  const selectedCandidateData = candidates.filter((candidate) => 
    selectedCandidates.includes(candidate.id)
  );
  
  if (selectedCandidateData.length === 0) {
    navigate('/recruiter/dashboard');
    return null;
  }

  // Get all unique skills from selected candidates
  const allSkills = new Set<string>();
  selectedCandidateData.forEach((candidate) => {
    candidate.skills.forEach((skill) => allSkills.add(skill));
  });

  // Get all unique education institutions
  const allInstitutions = new Set<string>();
  selectedCandidateData.forEach((candidate) => {
    candidate.education.forEach((edu) => allInstitutions.add(edu.institution));
  });

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
        <h1 className="text-2xl font-bold text-charcoal">Candidate Comparison</h1>
      </div>

      <Card className="mb-8 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3 mb-2">
            <h2 className="text-xl font-semibold text-charcoal mb-3">Candidate Overview</h2>
            {jobDescription && (
              <p className="text-sm text-charcoal-light mb-4">
                Comparing candidates based on the provided job description
              </p>
            )}
          </div>

          {selectedCandidateData.map((candidate) => (
            <motion.div 
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-ivory p-4 rounded-lg"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-charcoal">{candidate.name}</h3>
                {candidate.matchScore !== undefined && (
                  <div className={`text-sm font-bold rounded-full px-3 py-1 ${
                    candidate.matchScore >= 80 ? 'bg-olive/10 text-olive' :
                    candidate.matchScore >= 60 ? 'bg-amber-500/10 text-amber-500' : 
                    'bg-coral/10 text-coral'
                  }`}>
                    {candidate.matchScore}% match
                  </div>
                )}
              </div>
              
              <p className="text-charcoal-light text-sm mb-4">
                {candidate.experience.length > 0 ? 
                  `${candidate.experience[0].title} at ${candidate.experience[0].company}` : 
                  'No experience listed'}
              </p>
              
              <div className="text-sm mb-3">
                <div className="font-medium text-charcoal mb-1">Contact</div>
                <div className="text-charcoal-light">{candidate.email}</div>
                <div className="text-charcoal-light">{candidate.phone}</div>
              </div>
              
              <div className="text-sm">
                <div className="font-medium text-charcoal mb-1">Experience</div>
                <ul className="space-y-1 text-charcoal-light">
                  {candidate.experience.map((exp, i) => (
                    <li key={i}>
                      {exp.title} • {exp.company} • {exp.duration}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-charcoal mb-6">Skills Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-charcoal bg-gray-50 rounded-tl-lg">Skill</th>
                  {selectedCandidateData.map((candidate) => (
                    <th key={candidate.id} className="px-4 py-3 text-center text-sm font-medium text-charcoal bg-gray-50">
                      {candidate.name.split(' ')[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from(allSkills).map((skill, index) => (
                  <tr key={skill} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-sm font-medium text-charcoal">{skill}</td>
                    {selectedCandidateData.map((candidate) => (
                      <td key={candidate.id} className="px-4 py-3 text-center">
                        {candidate.skills.includes(skill) ? (
                          <Check size={18} className="text-olive mx-auto" />
                        ) : (
                          <X size={18} className="text-coral mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-charcoal mb-6">Education Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-medium text-charcoal bg-gray-50 rounded-tl-lg">Institution</th>
                  {selectedCandidateData.map((candidate) => (
                    <th key={candidate.id} className="px-4 py-3 text-center text-sm font-medium text-charcoal bg-gray-50">
                      {candidate.name.split(' ')[0]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from(allInstitutions).map((institution, index) => (
                  <tr key={institution} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 text-sm font-medium text-charcoal">{institution}</td>
                    {selectedCandidateData.map((candidate) => (
                      <td key={candidate.id} className="px-4 py-3 text-center">
                        {candidate.education.some(edu => edu.institution === institution) ? (
                          <div className="text-sm text-charcoal">
                            {candidate.education.find(edu => edu.institution === institution)?.degree}
                          </div>
                        ) : (
                          <X size={18} className="text-coral mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={() => navigate('/recruiter/export')}
          icon={<Download size={18} />}
        >
          Export Comparison
        </Button>
      </div>
    </div>
  );
};

export default RecruiterComparison;