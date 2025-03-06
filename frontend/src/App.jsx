// App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import  LandingPage  from './pages/LandingPage';
import  LoginPage  from './pages/LoginPage';
import  RegisterPage  from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import LobbyPage from './pages/LobbyPage';
import JoinLobby from './pages/JoinLobby';
import WaitingRoom from './pages/WaitingRoom';

import NotFound from './pages/NotFound';

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/lobby" element={<LobbyPage />} />
          <Route path="/join-lobby" element={<JoinLobby />} />
          <Route path="/waiting-room" element={<WaitingRoom />} />
          

          {/* not found page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
