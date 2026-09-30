import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import LandingPage, { LANDING_PATH } from './components/LandingPage.tsx';
import { LanguageProvider } from './contexts/LanguageContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
          {/* Landing ẩn: không nằm trong menu, chỉ mở được khi có link */}
          <Route path={LANDING_PATH} element={<LandingPage />} />
          <Route path="*" element={<App />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);

