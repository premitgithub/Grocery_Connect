import { AuthWrapper } from "../components/Auth";

const Login = ({ onLoginSuccess }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100">
      <AuthWrapper onLoginSuccess={onLoginSuccess} />
    </div>
  );
};

export default Login;
