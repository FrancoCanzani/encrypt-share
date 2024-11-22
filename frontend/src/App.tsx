import { Routes, Route } from 'react-router-dom';
import EncryptPage from './pages/encrypt-page';
import DecryptPage from './pages/decrypt-page';

function App() {
  return (
    <Routes>
      <Route path='/' element={<EncryptPage />} />
      <Route path='/:id' element={<DecryptPage />} />
    </Routes>
  );
}

export default App;
