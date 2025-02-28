import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
const apiUrl = import.meta.env.VITE_DOCUMENT_URL + "auth";


interface LoginFormData {
  email: string;
  password: string;
}

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  verified: boolean;
}

interface LoginResponse {
  token: string;
  user: UserData;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    // Check if user was redirected from email verification
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('verified') === 'true') {
      setMessage('Your email has been verified successfully. You can now login.');
    }
  }, [location]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post<LoginResponse>(`${apiUrl}/login`, formData);
      // Store token in localStorage or secure cookie
      localStorage.setItem('token', response.data.token);
      // Store user info if needed
      localStorage.setItem('user', JSON.stringify(response.data.user));
      // Redirect to dashboard or home page
      navigate('/courtney-sessions');
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'Login failed');
      } else {
        setError('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="">
          <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
          <p className='text-center text-md font-medium'>Welcome Back to Courtney Sessions</p>
        </div>
        
        {message && (
          <div className="p-4 text-center text-green-800 bg-green-100 rounded-md">
            {message}
          </div>
        )}
        
        {error && (
          <div className="p-4 text-center text-red-800 bg-red-100 rounded-md">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className='relative'>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute right-2 top-1/2 transform my-auto bg-gray-100 cursor-pointer hover:bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full mt-3 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-black bg-[#ffd900] rounded-md hover:bg-[#e2c627] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="space-y-2 text-center text-sm text-gray-600">
          <div>
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-[#1a4699]">
              Register
            </Link>
          </div>
          <div>
            <Link to="/reset-password" className="font-medium text-[#1a4699]">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;