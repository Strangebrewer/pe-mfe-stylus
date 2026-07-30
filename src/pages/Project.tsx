import { useNavigate, useParams } from 'react-router-dom';

const ProjectPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  function getProjectName() {
    if (id === '1') return 'One';
    if (id === '2') return 'Two';
    if (id === '3') return 'Three';
  }

  return (
    <div>
      <p>Hi there, I'm Fake Project {getProjectName()}</p>
      <div onClick={() => navigate('/stylus/subject/11')}>
        <p>Fake Subject One</p>
      </div>

      <div onClick={() => navigate('/stylus/subject/12')}>
        <p>Fake Subject Two</p>
      </div>

      <div onClick={() => navigate('/stylus/subject/13')}>
        <p>Fake Subject Three</p>
      </div>
    </div>
  );
};

export default ProjectPage;
