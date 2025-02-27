// UpdatePassword.tsx
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
const apiUrl = import.meta.env.VITE_DOCUMENT_URL + "auth";


interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const UpdatePassword: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PasswordFormData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      // Send update request with authorization header
      const response = await axios.put(
        `${apiUrl}/update-password`,
        {
          password: formData.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setMessage('Password updated successfully');
      // Clear form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Redirect to profile after a delay
      setTimeout(() => {
        navigate('/courtney-sessions');
      }, 2000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || 'Failed to update password');
      } else {
        setError('Failed to update password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Update Password</h2>
        
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
          <div className='relative'>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute right-2 top-1/2 transform my-auto bg-gray-100 cursor-pointer hover:bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full mt-3 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </div>
          </div>
          
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
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
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
        
        <div className="text-center text-sm">
          <Link to="/profile" className="font-medium text-amber-800 hover:text-blue-500">
            Back to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;