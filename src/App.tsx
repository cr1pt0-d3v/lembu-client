import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import AirdropPage from './pages/AirdropPage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/airdrop" element={<AirdropPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
