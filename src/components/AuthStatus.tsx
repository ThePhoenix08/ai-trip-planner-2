import React from 'react';
import { useAuth } from '@/state/AuthContext';

const AuthStatus: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return <div>{user ? `Logged in as ${user.displayName}` : 'Not logged in'}</div>;
};

export default AuthStatus;