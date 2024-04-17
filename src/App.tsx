import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import AirdropPage from './pages/AirdropPage';
import ModalWindow from './components/Modal';
import ContestPage from './pages/ContestPage';

function App() {
  return (
    <>
      <ModalWindow />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/airdrop" element={<AirdropPage />} /> 
        <Route path="/contests" element={<ContestPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
