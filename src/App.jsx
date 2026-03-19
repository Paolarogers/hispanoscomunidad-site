import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Nav from './components/layout/Nav.jsx';
import Footer from './components/layout/Footer.jsx';
import FloatingContact from './components/layout/FloatingContact.jsx';
import Home from './pages/Home.jsx';
import Bonanza from './pages/Bonanza.jsx';
import Zivo from './pages/Zivo.jsx';
import Events from './pages/Events.jsx';
import Gallery from './pages/Gallery.jsx';
import Blog from './pages/Blog.jsx';
import Unidos from './pages/Unidos.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Contacto from './pages/Contacto.jsx';
import Media from './pages/Media.jsx';

import './styles/tokens.css';
import './styles/reset.css';
import './styles/global.css';

function ComingSoon({ name }) {
  return (
    <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', padding: '120px 24px 80px' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--hc-navy)', fontWeight: 300 }}>{name}</h1>
      <p style={{ color: 'var(--hc-soft)', fontSize: '1rem' }}>Página en construcción · Coming soon</p>
    </main>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bonanza" element={<Bonanza />} />
          <Route path="/zivo" element={<Zivo />} />
          <Route path="/media" element={<Media />} />
          <Route path="/unidos" element={<Unidos />} />
          <Route path="/eventos" element={<Events />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Blog />} />
          <Route path="/shows" element={<ComingSoon name="Programas y Shows" />} />
          <Route path="/galeria" element={<Gallery />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/seguridad" element={<ComingSoon name="Seguridad de datos" />} />
          <Route path="/terminos" element={<ComingSoon name="Términos" />} />
          <Route path="*" element={<ComingSoon name="404 — Página no encontrada" />} />
        </Routes>
        <Footer />
        <FloatingContact />
      </BrowserRouter>
    </HelmetProvider>
  );
}
