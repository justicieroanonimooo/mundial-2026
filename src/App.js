import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Grupos from './components/Grupos';
import Fixture from './components/Fixture';
import Eliminatoria from './components/Eliminatoria';
import Bracket from './components/Bracket';
import { idiomas } from './idiomas';
import './App.css';

export const TemaContext = React.createContext();
export const IdiomaContext = React.createContext();

function App() {
  const [seccion, setSeccion] = useState('grupos');
  const [oscuro, setOscuro] = useState(false);
  const [idiomaActual, setIdiomaActual] = useState(() => {
    return localStorage.getItem('idioma_mundial') || 'es';
  });
  const [resultados, setResultados] = useState(() => {
    const guardados = localStorage.getItem('resultados_mundial');
    return guardados ? JSON.parse(guardados) : {};
  });

  useEffect(() => {
    localStorage.setItem('resultados_mundial', JSON.stringify(resultados));
  }, [resultados]);

  useEffect(() => {
    localStorage.setItem('idioma_mundial', idiomaActual);
  }, [idiomaActual]);

  const t = idiomas[idiomaActual];

  const tema = {
    fondo: oscuro ? '#121212' : '#f0f4f0',
    tarjeta: oscuro ? '#1e1e1e' : 'white',
    texto: oscuro ? '#e0e0e0' : '#333',
    subtexto: oscuro ? '#888' : '#888',
    nav: oscuro ? '#1a1a1a' : 'white',
    primario: oscuro ? '#112540' : '#1a472a',
    puntaje: oscuro ? '#2d5f8a' : '#1a472a',
    botonInactivo: oscuro ? '#2c2c2c' : '#e0e0e0',
    textoInactivo: oscuro ? '#aaa' : '#333',
    borde: oscuro ? '#333' : '#eee',
    sombra: oscuro ? '0 2px 8px rgba(0,0,0,0.6)' : '0 2px 8px rgba(0,0,0,0.08)',
  };

  const botones = [
    { id: 'grupos', label: t.nav.grupos },
    { id: 'fixture', label: t.nav.fixture },
    { id: 'eliminatoria', label: t.nav.eliminatoria },
    { id: 'bracket', label: t.nav.bracket },
  ];

  return (
    <TemaContext.Provider value={tema}>
      <IdiomaContext.Provider value={{ t, idiomaActual, setIdiomaActual }}>
        <div style={{ minHeight: '100vh', background: tema.fondo, transition: 'all 0.3s' }}>
          <Header oscuro={oscuro} setOscuro={setOscuro} tema={tema} />

          <nav style={{
            display: 'flex', justifyContent: 'center', gap: '10px',
            padding: '16px', background: tema.nav,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            flexWrap: 'wrap',
            transition: 'all 0.3s'
          }}>
            {botones.map(b => (
              <button key={b.id} onClick={() => setSeccion(b.id)} style={{
                padding: '10px 24px',
                background: seccion === b.id ? tema.primario : tema.botonInactivo,
                color: seccion === b.id ? 'white' : tema.textoInactivo,
                border: 'none', borderRadius: '20px',
                cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem',
                transition: 'all 0.3s'
              }}>
                {b.label}
              </button>
            ))}
          </nav>

          {seccion === 'grupos' && <Grupos resultados={resultados} />}
          {seccion === 'fixture' && <Fixture resultados={resultados} setResultados={setResultados} />}
          {seccion === 'eliminatoria' && <Eliminatoria resultados={resultados} setResultados={setResultados} />}
          {seccion === 'bracket' && <Bracket resultados={resultados} setResultados={setResultados} />}
        </div>
      </IdiomaContext.Provider>
    </TemaContext.Provider>
  );
}

export default App;