import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import User from './pages/User';
import Navbar from './components/Navbar';
import HomePage from './pages/HonePage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
