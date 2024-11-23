import { Routes, Route } from 'react-router-dom';
import EncryptPage from './pages/encrypt-page';
import DecryptPage from './pages/decrypt-page';
import RootLayout from './pages/root-layout';
import HowItWorksPage from './pages/how-it-works-page';

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path='/' element={<EncryptPage />} />
        <Route path='/:id' element={<DecryptPage />} />
        <Route path='/how' element={<HowItWorksPage />} />
      </Route>
    </Routes>
  );
}

export default App;
