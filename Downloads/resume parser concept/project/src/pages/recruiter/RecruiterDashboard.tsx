import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Search, ChevronDown, ChevronUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useResumeContext } from '../../context/ResumeContext';
import { Candidate } from '../../types';

const RecruiterDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { candidates, selectedCandidates, toggleCandidateSelection, jobDescription } = useResumeContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'matchScore' | 'name'>('matchScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  if (candidates.length === 0) {
    navigate('/upload/recruiter');
    return null;
  }

  const handleSortChange = (field: 'matchScore' | 'name') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      candidate.name.toLowerCase().includes(searchLower) ||
      candidate.skills.some((skill) => skill.toLowerCase().includes(searchLower))
    );
  });

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortField === 'matchScore') {
      const scoreA = a.matchScore || 0;
      const scoreB = b.matchScore || 0;
      return sortDirection === 'asc' ? scoreA - scoreB : scoreB - scoreA;
    } else {
      return sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
  });

  const handleCompareClick = () => {
    if (selectedCandidates.length > 0) {
      navigate('/recruiter/compare');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-charcoal mb-2">Candidate Dashboard</h1>
          <p className="text-charcoal-light">
            {filteredCandidates.length} candidates found
            {jobDescription && ' • Matched to your job description'}
          </p>
        </div>
        
        <div className="flex mt-4 md:mt-0">
          <Button
            onClick={handleCompareClick}
            disabled={selectedCandidates.length === 0}
            className="mr-3"
            icon={<Users size={18} />}
          >
            Compare {selectedCandidates.length > 0 && `(${selectedCandidates.length})`}
          </Button>
          <Button
            onClick={() => navigate('/recruiter/export')}
            variant="outline"
          >
            Export Data
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Button
                onClick={() => handleSortChange('matchScore')}
                className="flex items-center"
                variant="outline"
                icon={<Filter size={18} />}
              >
                Sort by Score
                {sortField === 'matchScore' && (
                  sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                )}
              </Button>
            </div>
            
            <div className="relative">
              <Button
                onClick={() => handleSortChange('name')}
                className="flex items-center"
                variant="outline"
              >
                Sort by Name
                {sortField === 'name' && (
                  sortDirection === 'asc' ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCandidates.map((candidate, index) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            isSelected={selectedCandidates.includes(candidate.id)}
            onSelect={() => toggleCandidateSelection(candidate.id)}
            index={index}
          />
        ))}
      </div>

      {sortedCandidates.length === 0 && (
        <div className="text-center p-12 bg-white rounded-lg shadow-sm">
          <p className="text-lg text-charcoal-light">No candidates match your search criteria.</p>
        </div>
      )}
    </div>
  );
};

interface CandidateCardProps {
  candidate: Candidate;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, isSelected, onSelect, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <Card
        className={`relative p-6 ${isSelected ? 'border-2 border-coral' : ''}`}
        hoverable
        onClick={onSelect}
      >
        {candidate.matchScore !== undefined && (
          <div className="absolute top-4 right-4 bg-ivory rounded-full w-12 h-12 flex items-center justify-center">
            <div className={`font-bold text-sm ${
              candidate.matchScore >= 80 ? 'text-olive' :
              candidate.matchScore >= 60 ? 'text-amber-500' : 'text-coral'
            }`}>
              {candidate.matchScore}%
            </div>
          </div>
        )}

        <h3 className="text-xl font-bold text-charcoal mb-2">{candidate.name}</h3>
        
        {candidate.experience.length > 0 && (
          <p className="text-charcoal-light text-sm mb-3">
            {candidate.experience[0].title} at {candidate.experience[0].company}
          </p>
        )}
        
        <div className="mb-4">
          <h4 className="font-medium text-charcoal mb-1">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.slice(0, 4).map((skill, i) => (
              <span
                key={i}
                className="bg-charcoal/5 text-charcoal px-2 py-1 rounded-md text-xs"
              >
                {skill}
              </span>
            ))}
            {candidate.skills.length > 4 && (
              <span className="bg-charcoal/5 text-charcoal px-2 py-1 rounded-md text-xs">
                +{candidate.skills.length - 4} more
              </span>
            )}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-charcoal mb-1">Education</h4>
          {candidate.education.length > 0 ? (
            <p className="text-sm text-charcoal-light">
              {candidate.education[0].degree} - {candidate.education[0].institution}
            </p>
          ) : (
            <p className="text-sm text-charcoal-light">Not specified</p>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">{candidate.fileName}</p>
            <div className="w-5 h-5 rounded-full border-2 border-coral flex items-center justify-center">
              {isSelected && <div className="w-3 h-3 bg-coral rounded-full"></div>}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default RecruiterDashboard;