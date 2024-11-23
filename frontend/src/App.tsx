import { Routes, Route } from 'react-router-dom';
import EncryptPage from './pages/encrypt-page';
import DecryptPage from './pages/decrypt-page';
import RootLayout from './pages/root-layout';
import HowItWorksPage from './pages/how-it-works-page';
import TermsOfServicePage from './pages/tos-page';

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path='/' element={<EncryptPage />} />
        <Route path='/:id' element={<DecryptPage />} />
        <Route path='/how' element={<HowItWorksPage />} />
        <Route path='/tos' element={<TermsOfServicePage />} />
      </Route>
    </Routes>
  );
}

export default App;
