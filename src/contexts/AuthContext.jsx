import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const AUTH_STORAGE_KEY = 'honeymoon_hotel_auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedAuth) {
      setUser(JSON.parse(savedAuth));
    }
    setLoading(false);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }
  }, [user, loading, location, navigate]);

  const login = async (username, password) => {
    // Mock login - in real app, this would call an API
    const mockUser = {
      id: '1',
      username,
      role: username.includes('manager') ? 'manager' : 'clerk',
      name: username.includes('manager') ? 'Hotel Manager' : 'Hotel Clerk',
    };
    
    setUser(mockUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
    navigate('/', { replace: true });
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    navigate('/login', { replace: true });
  };

  const value = {
    user,
    login,
    logout,
    isManager: user?.role === 'manager',
    isClerk: user?.role === 'clerk',
  };

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}