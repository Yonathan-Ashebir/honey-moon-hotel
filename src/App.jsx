import { ThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import theme from './theme';
import Login from './pages/Login';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Room from './pages/Room';
import Guests from './pages/Guests';
import Guest from './pages/Guest';
import Reservation from './pages/Reservation';
import Settings from './pages/Settings';
import ApprovalRequests from './pages/ApprovalRequests';
import Layout from './components/Layout';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Protected Route wrapper component
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

// Manager Route wrapper component
function ManagerRoute({ children }) {
  const { user, isManager } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!isManager) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route path="/" element={<Home />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/room/:id" element={<Room />} />
                <Route path="/guests" element={<Guests />} />
                <Route path="/guest/:id" element={<Guest />} />
                <Route path="/reservation/:id" element={<Reservation />} />
                <Route path="/approvals" element={
                  <ManagerRoute>
                    <ApprovalRequests />
                  </ManagerRoute>
                } />
                <Route path="/settings" element={
                  <ManagerRoute>
                    <Settings />
                  </ManagerRoute>
                } />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;