import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import RecruiterComparison from './pages/recruiter/RecruiterComparison';
import RecruiterExport from './pages/recruiter/RecruiterExport';
import StudentFeedback from './pages/student/StudentFeedback';
import StudentExport from './pages/student/StudentExport';
import Layout from './components/Layout';
import { ResumeProvider } from './context/ResumeContext';

const App = () => {
  return (
    <ResumeProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="upload/:role" element={<UploadPage />} />
          <Route path="recruiter">
            <Route path="dashboard" element={<RecruiterDashboard />} />
            <Route path="compare" element={<RecruiterComparison />} />
            <Route path="export" element={<RecruiterExport />} />
          </Route>
          <Route path="student">
            <Route path="feedback" element={<StudentFeedback />} />
            <Route path="export" element={<StudentExport />} />
          </Route>
        </Route>
      </Routes>
    </ResumeProvider>
  );
};

export default App;