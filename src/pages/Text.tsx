import { useNavigate, useParams } from 'react-router-dom';

const TextPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  function getTextName() {
    if (id === '101') return 'One';
    if (id === '102') return 'Two';
    if (id === '103') return 'Three';
  }

  return (
    <div>
      <p>Hi there, I'm Fake Text {getTextName()}</p>
      <br />
      <button onClick={() => navigate('/stylus')}>Home</button>
    </div>
  );
};

export default TextPage;
