import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { CountryPage } from './pages/CountryPage';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:alpha2" element={<CountryPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
