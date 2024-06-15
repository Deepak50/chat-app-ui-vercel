import './App.css';
import Chat from './Components/Chat';
import Login from './Components/Login';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [authCode, setAuthCode] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login authCode={authCode} setAuthCode={setAuthCode} />}></Route>
          <Route path="/chat" element={<Chat authCode={authCode} setAuthCode={setAuthCode} />}></Route>
          <Route path="/login" element={<Login authCode={authCode} setAuthCode={setAuthCode} />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;