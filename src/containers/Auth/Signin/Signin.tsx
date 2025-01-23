import { useSignupMutation } from 'src/apollo/hooks';

const Signin = () => {
  const [signup] = useSignupMutation();

  return 'Hello Signin Page';
};

export default Signin;
