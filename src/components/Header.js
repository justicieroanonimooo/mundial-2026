import React, { useContext } from 'react';
import { IdiomaContext } from '../App';
import { idiomasDisponibles, idiomas } from '../idiomas';

function Header({ oscuro, setOscuro }) {
  const { t, idiomaActual, setIdiomaActual } = useContext(IdiomaContext);

  return (
    <header style={{
      position: 'relative',
      overflow: 'hidden',
      color: 'white',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
      flexWrap: 'wrap',
      gap: '10px',
      minHeight: '100px',
    }}>

      {/* Imagen de banderas como fondo */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url(/banderas.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} />

      {/* Capa oscura para legibilidad */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: oscuro ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.55)',
      }} />

      {/* Selector de idioma */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
        {idiomasDisponibles.map(id => (
          <button key={id} onClick={() => setIdiomaActual(id)} style={{
            padding: '4px 10px',
            background: idiomaActual === id ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
            border: idiomaActual === id ? '2px solid white' : '2px solid rgba(255,255,255,0.3)',
            borderRadius: '12px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: idiomaActual === id ? 'bold' : 'normal',
            transition: 'all 0.3s'
          }}>
            {idiomas[id].bandera} {idiomas[id].nombre}
          </button>
        ))}
      </div>

      {/* Título */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
      <h1 style={{ margin: 0, fontSize: '1.6rem', textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
          {t.header.titulo}
        </h1>
        <p style={{ margin: '4px 0 0', opacity: 0.95, fontSize: '0.9rem', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
          {t.header.subtitulo}
        </p>
      </div>

      {/* Botón tema */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <button onClick={() => setOscuro(!oscuro)} style={{
          background: 'rgba(255,255,255,0.15)',
          border: '2px solid rgba(255,255,255,0.5)',
          borderRadius: '20px',
          color: 'white',
          padding: '8px 16px',
          cursor: 'pointer',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          transition: 'all 0.3s'
        }}>
          {oscuro ? t.header.claro : t.header.oscuro}
        </button>
      </div>

    </header>
  );
}

export default Header;