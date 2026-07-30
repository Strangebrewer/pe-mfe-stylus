import { useNavigate, useParams } from 'react-router-dom';

const SubjectPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  function getSubjectName() {
    if (id === '11') return 'One';
    if (id === '12') return 'Two';
    if (id === '13') return 'Three';
  }

  return (
    <div>
      <p>Hi there, I'm Fake Subject {getSubjectName()}</p>
      <div onClick={() => navigate('/stylus/text/101')}>
        <p>Fake Text One</p>
      </div>

      <div onClick={() => navigate('/stylus/text/102')}>
        <p>Fake Text Two</p>
      </div>

      <div onClick={() => navigate('/stylus/text/103')}>
        <p>Fake Text Three</p>
      </div>
    </div>
  );
};

export default SubjectPage;
