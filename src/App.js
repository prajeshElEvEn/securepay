import { Route, Routes } from 'react-router-dom';
import './styles/App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/user/userSlice';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/config';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/dashboard/Profile';
import History from './components/History';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/history" element={<History user={user} />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
