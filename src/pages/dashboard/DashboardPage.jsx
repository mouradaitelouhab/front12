import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Crown } from 'lucide-react';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Redirect based on user role
      if (user.role === 'Admin') {
        navigate('/dashboard/admin');
      } else if (user.role === 'Seller') {
        navigate('/dashboard/seller');
      } else {
        // For regular users, show a basic dashboard or redirect to profile
        navigate('/profile');
      }
    }
  }, [user, navigate]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen pt-32 flex items-center justify-center">
      <div className="text-center">
        <Crown className="w-16 h-16 mx-auto mb-4 text-purple-600" />
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Redirection vers votre tableau de bord...</p>
      </div>
    </div>
  );
};

export default DashboardPage;
