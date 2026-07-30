import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './index.css';
import MainPage from './pages/Main';
import ProjectPage from './pages/Project';
import SubjectPage from './pages/Subject';
import TextPage from './pages/Text';

const App: React.FC = () => {
  const location = useLocation();
  console.log('Remote Styles App render', location.pathname);

  function NotFound() {
    console.log('rendering NotFound - Stylus');
    return <div>Error, Will Robinson!</div>;
  }

  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="project/:id" element={<ProjectPage />} />
      <Route path="subject/:id" element={<SubjectPage />} />
      <Route path="text/:id" element={<TextPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
