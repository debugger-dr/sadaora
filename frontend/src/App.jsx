import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Signup from './auth/Signup';
import Login from './auth/Login';
import Dashboard from './profile/Dashboard';
import Feed from './feed/Feed';
import Navbar from './components/Navbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    navigate('/');
  };

  return (
    <div>
      {isLoggedIn && <Navbar handleLogout={handleLogout} />}
      <Routes>
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/profile" element={isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} />} />
        <Route path="/" element={isLoggedIn ? <Feed /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </div>
  );
}

export default App;
