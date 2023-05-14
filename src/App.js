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
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase/config';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/dashboard/Profile';
import History from './components/History';
import { collection, onSnapshot } from 'firebase/firestore';
import Authentication from './pages/auth/Authentication';

function App() {
  const [userId, setUserId] = useState()
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      snapshot.forEach((doc) => {
        if (doc.data().email === user?.email) {
          setUserId(doc.id)
        }
      })
    })
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          id: userId
        }))
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch, userId, user?.email])

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
        <Route path="/auth" element={<Authentication user={user} />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
