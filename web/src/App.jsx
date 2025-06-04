import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
// import DestaquesPage from '@/pages/DestaquesPage'; // HomePage é usada para /destaques
import MinhaIgrejaPage from '@/pages/MinhaIgrejaPage';
import EventosPage from '@/pages/EventosPage';
import NoticiasPage from '@/pages/NoticiasPage';
import AoVivoPage from '@/pages/AoVivoPage';
import MidiasPage from '@/pages/MidiasPage';
import BibliaPage from '@/pages/BibliaPage';
import ContribuicoesPage from '@/pages/ContribuicoesPage';
import AniversariantesPage from '@/pages/AniversariantesPage';
import ContatosPage from '@/pages/ContatosPage';
import ProcurarGRsPage from '@/pages/ProcurarGRsPage';
import MinisteriosPage from '@/pages/MinisteriosPage';
import EnsinoPage from '@/pages/EnsinoPage';
import PerfilPage from '@/pages/PerfilPage';

// Placeholder para rotas de detalhes, se necessário no futuro
// import EventoDetailPage from '@/pages/EventoDetailPage'; 
// import NoticiaDetailPage from '@/pages/NoticiaDetailPage';

function AppContent() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/destaques" element={<HomePage />} /> 
        <Route path="/minha-igreja" element={<MinhaIgrejaPage />} />
        
        <Route path="/eventos" element={<EventosPage />} />
        {/* Exemplo de rota de detalhe, se fosse uma página separada:
        <Route path="/eventos/:id" element={<EventoDetailPage />} /> 
        */}

        <Route path="/noticias" element={<NoticiasPage />} />
        {/* <Route path="/noticias/:id" element={<NoticiaDetailPage />} /> */}

        <Route path="/ao-vivo" element={<AoVivoPage />} />
        <Route path="/midias" element={<MidiasPage />} />
        <Route path="/biblia" element={<BibliaPage />} />
        <Route path="/contribuicoes" element={<ContribuicoesPage />} />
        <Route path="/aniversariantes" element={<AniversariantesPage />} />
        <Route path="/contatos" element={<ContatosPage />} />
        <Route path="/procurar-grs" element={<ProcurarGRsPage />} />
        <Route path="/ministerios" element={<MinisteriosPage />} />
        <Route path="/ensino" element={<EnsinoPage />} />
        <Route path="/perfil" element={<PerfilPage />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;