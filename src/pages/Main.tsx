import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>Hi there, I'm Stylus!</p>
      <div onClick={() => navigate('/stylus/project/1')}>
        <p>Fake Project One</p>
      </div>

      <div onClick={() => navigate('/stylus/project/2')}>
        <p>Fake Project Two</p>
      </div>

      <div onClick={() => navigate('/stylus/project/3')}>
        <p>Fake Project Three</p>
      </div>
    </div>
  );
};

export default MainPage;
