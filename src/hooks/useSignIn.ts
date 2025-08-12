import { useNavigate } from 'react-router-dom';

const useSignIn = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/dashboard');
  };

  return {
    handleSignIn
  };
};

export default useSignIn;