import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_DOCUMENT_URL + "auth";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${apiUrl}/reset-password`, { email });
      setMessage(response.data.message);
      setEmail('');
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'Password reset failed');
      } else {
        setError('Password reset failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Reset Password</h2>
        <p className="text-center text-gray-600">
          Enter your email address and we'll send you a new password.
        </p>
        
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
              value={email}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white bg-amber-800 rounded-md hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Sending...' : 'Reset Password'}
          </button>
        </form>
        
        <div className="text-center text-sm">
          <Link to="/login" className="font-medium text-amber-800 hover:text-blue-500">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;