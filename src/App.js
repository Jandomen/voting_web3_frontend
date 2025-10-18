import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import VotePage from './pages/VotePage';
import ResultsPage from './pages/ResultsPage';
import ChainPage from './pages/ChainPage';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URL,
  cache: new InMemoryCache(),
});

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored === 'true') setDarkMode(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div
          className={`min-h-screen flex flex-col transition-all duration-500 ${
            darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
          }`}
        >
          <nav
            className={`p-4 flex justify-between items-center shadow-md sticky top-0 z-10 transition-colors duration-500 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <div className="flex gap-5 text-sm sm:text-base">
              <Link to="/" className="hover:underline">Emitir Voto</Link>
              <Link to="/resultados" className="hover:underline">Resultados</Link>
              <Link to="/cadena" className="hover:underline">Blockchain</Link>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-3 py-1 rounded-lg shadow transition-all duration-300 ${
                darkMode
                  ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {darkMode ? '☀️ Claro' : '🌙 Oscuro'}
            </button>
          </nav>

          <main className="flex-grow p-5 max-w-5xl mx-auto transition-all duration-500">
            <Routes>
              <Route path="/" element={<VotePage />} />
              <Route path="/resultados" element={<ResultsPage />} />
              <Route path="/cadena" element={<ChainPage />} />
            </Routes>
          </main>

          <footer
            className={`text-center py-4 mt-10 text-sm transition-all duration-500 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            © {new Date().getFullYear()} Mini Blockchain · Desarrollado por <strong>Jandochat</strong>
          </footer>
        </div>
      </Router>
    </ApolloProvider>
  );
}
