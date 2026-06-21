import React, { useState, useContext } from 'react';
import { TemaContext, IdiomaContext } from '../App';
import { horariosPartidos, formatearHoraLocal } from '../horarios';

const imagenesEstadios = {
  'Ciudad de México': '/estadio-azteca.jpg',
  'Dallas': '/estadio-dallas.jpg',
  'Monterrey': '/estadio-monterrey.jpg',
  'Boston': '/estadio-boston.jpg',
  'Houston': '/estadio-houston.jpg',
  'Nueva York': '/estadio-newyork.jpg',
  'Miami': '/estadio-miami.jpg',
  'Atlanta': '/estadio-atlanta.jpg',
  'Los Ángeles': '/estadio-losangeles.jpg',
  'Seattle': '/estadio-seattle.jpg',
  'Vancouver': '/estadio-vancouver.jpg',
  'Toronto': '/estadio-toronto.jpg',
  'Kansas City': '/estadio-kansas.jpg',
  'Filadelfia': '/estadio-filadelfia.jpg',
  'San Francisco': '/estadio-sanfrancisco.jpg',
  'Guadalajara': '/estadio-guadalajara.jpg',
  'Denver': '/estadio-dallas.jpg',
};

const partidos = {
  A: [
    { id: 1, local: 'México', visita: 'Sudáfrica', fecha: '11 Jun', hora: '14:00', sede: 'Ciudad de México' },
    { id: 2, local: 'Corea del Sur', visita: 'República Checa', fecha: '11 Jun', hora: '21:00', sede: 'Guadalajara' },
    { id: 3, local: 'México', visita: 'Corea del Sur', fecha: '18 Jun', hora: '20:00', sede: 'Guadalajara' },
    { id: 4, local: 'República Checa', visita: 'Sudáfrica', fecha: '18 Jun', hora: '11:00', sede: 'Atlanta' },
    { id: 5, local: 'República Checa', visita: 'México', fecha: '24 Jun', hora: '20:00', sede: 'Ciudad de México' },
    { id: 6, local: 'Sudáfrica', visita: 'Corea del Sur', fecha: '24 Jun', hora: '20:00', sede: 'Monterrey' },
  ],
  B: [
    { id: 7, local: 'Canadá', visita: 'Bosnia y Herzegovina', fecha: '12 Jun', hora: '14:00', sede: 'Toronto' },
    { id: 8, local: 'Catar', visita: 'Suiza', fecha: '13 Jun', hora: '14:00', sede: 'San Francisco' },
    { id: 9, local: 'Canadá', visita: 'Catar', fecha: '18 Jun', hora: '17:00', sede: 'Vancouver' },
    { id: 10, local: 'Suiza', visita: 'Bosnia y Herzegovina', fecha: '18 Jun', hora: '14:00', sede: 'Los Ángeles' },
    { id: 11, local: 'Suiza', visita: 'Canadá', fecha: '24 Jun', hora: '14:00', sede: 'Vancouver' },
    { id: 12, local: 'Bosnia y Herzegovina', visita: 'Catar', fecha: '24 Jun', hora: '14:00', sede: 'Seattle' },
  ],
  C: [
    { id: 13, local: 'Brasil', visita: 'Marruecos', fecha: '13 Jun', hora: '17:00', sede: 'Nueva York' },
    { id: 14, local: 'Haití', visita: 'Escocia', fecha: '13 Jun', hora: '20:00', sede: 'Boston' },
    { id: 15, local: 'Brasil', visita: 'Haití', fecha: '19 Jun', hora: '20:00', sede: 'Filadelfia' },
    { id: 16, local: 'Escocia', visita: 'Marruecos', fecha: '19 Jun', hora: '17:00', sede: 'Boston' },
    { id: 17, local: 'Brasil', visita: 'Escocia', fecha: '24 Jun', hora: '17:00', sede: 'Miami' },
    { id: 18, local: 'Marruecos', visita: 'Haití', fecha: '24 Jun', hora: '17:00', sede: 'Atlanta' },
  ],
  D: [
    { id: 19, local: 'Estados Unidos', visita: 'Paraguay', fecha: '12 Jun', hora: '20:00', sede: 'Los Ángeles' },
    { id: 20, local: 'Australia', visita: 'Turquía', fecha: '12 Jun', hora: '23:00', sede: 'Vancouver' },
    { id: 21, local: 'Estados Unidos', visita: 'Australia', fecha: '19 Jun', hora: '14:00', sede: 'Seattle' },
    { id: 22, local: 'Turquía', visita: 'Paraguay', fecha: '18 Jun', hora: '23:00', sede: 'San Francisco' },
    { id: 23, local: 'Turquía', visita: 'Estados Unidos', fecha: '25 Jun', hora: '21:00', sede: 'Los Ángeles' },
    { id: 24, local: 'Paraguay', visita: 'Australia', fecha: '25 Jun', hora: '21:00', sede: 'San Francisco' },
  ],
  E: [
    { id: 25, local: 'Alemania', visita: 'Curazao', fecha: '14 Jun', hora: '12:00', sede: 'Houston' },
    { id: 26, local: 'Costa de Marfil', visita: 'Ecuador', fecha: '14 Jun', hora: '18:00', sede: 'Filadelfia' },
    { id: 27, local: 'Alemania', visita: 'Costa de Marfil', fecha: '20 Jun', hora: '15:00', sede: 'Toronto' },
    { id: 28, local: 'Ecuador', visita: 'Curazao', fecha: '20 Jun', hora: '19:00', sede: 'Kansas City' },
    { id: 29, local: 'Ecuador', visita: 'Alemania', fecha: '25 Jun', hora: '15:00', sede: 'Nueva York' },
    { id: 30, local: 'Curazao', visita: 'Costa de Marfil', fecha: '25 Jun', hora: '15:00', sede: 'Filadelfia' },
  ],
  F: [
    { id: 31, local: 'Países Bajos', visita: 'Japón', fecha: '14 Jun', hora: '15:00', sede: 'Dallas' },
    { id: 32, local: 'Suecia', visita: 'Túnez', fecha: '14 Jun', hora: '21:00', sede: 'Monterrey' },
    { id: 33, local: 'Países Bajos', visita: 'Suecia', fecha: '20 Jun', hora: '12:00', sede: 'Houston' },
    { id: 34, local: 'Túnez', visita: 'Japón', fecha: '19 Jun', hora: '23:00', sede: 'Monterrey' },
    { id: 35, local: 'Japón', visita: 'Suecia', fecha: '25 Jun', hora: '18:00', sede: 'Dallas' },
    { id: 36, local: 'Túnez', visita: 'Países Bajos', fecha: '25 Jun', hora: '18:00', sede: 'Kansas City' },
  ],
  G: [
    { id: 37, local: 'Bélgica', visita: 'Egipto', fecha: '15 Jun', hora: '14:00', sede: 'Seattle' },
    { id: 38, local: 'Irán', visita: 'Nueva Zelanda', fecha: '15 Jun', hora: '20:00', sede: 'Los Ángeles' },
    { id: 39, local: 'Bélgica', visita: 'Irán', fecha: '21 Jun', hora: '14:00', sede: 'Los Ángeles' },
    { id: 40, local: 'Nueva Zelanda', visita: 'Egipto', fecha: '21 Jun', hora: '20:00', sede: 'Vancouver' },
    { id: 41, local: 'Egipto', visita: 'Irán', fecha: '26 Jun', hora: '22:00', sede: 'Seattle' },
    { id: 42, local: 'Nueva Zelanda', visita: 'Bélgica', fecha: '26 Jun', hora: '22:00', sede: 'Vancouver' },
  ],
  H: [
    { id: 43, local: 'España', visita: 'Cabo Verde', fecha: '15 Jun', hora: '11:00', sede: 'Atlanta' },
    { id: 44, local: 'Arabia Saudí', visita: 'Uruguay', fecha: '15 Jun', hora: '17:00', sede: 'Miami' },
    { id: 45, local: 'España', visita: 'Arabia Saudí', fecha: '21 Jun', hora: '11:00', sede: 'Atlanta' },
    { id: 46, local: 'Uruguay', visita: 'Cabo Verde', fecha: '21 Jun', hora: '17:00', sede: 'Miami' },
    { id: 47, local: 'Uruguay', visita: 'España', fecha: '26 Jun', hora: '19:00', sede: 'Guadalajara' },
    { id: 48, local: 'Cabo Verde', visita: 'Arabia Saudí', fecha: '26 Jun', hora: '19:00', sede: 'Houston' },
  ],
  I: [
    { id: 49, local: 'Francia', visita: 'Senegal', fecha: '16 Jun', hora: '14:00', sede: 'Nueva York' },
    { id: 50, local: 'Irak', visita: 'Noruega', fecha: '16 Jun', hora: '17:00', sede: 'Boston' },
    { id: 51, local: 'Francia', visita: 'Irak', fecha: '22 Jun', hora: '16:00', sede: 'Filadelfia' },
    { id: 52, local: 'Noruega', visita: 'Senegal', fecha: '22 Jun', hora: '19:00', sede: 'Nueva York' },
    { id: 53, local: 'Noruega', visita: 'Francia', fecha: '26 Jun', hora: '14:00', sede: 'Boston' },
    { id: 54, local: 'Senegal', visita: 'Irak', fecha: '26 Jun', hora: '14:00', sede: 'Toronto' },
  ],
  J: [
    { id: 55, local: 'Argentina', visita: 'Argelia', fecha: '16 Jun', hora: '20:00', sede: 'Kansas City' },
    { id: 56, local: 'Austria', visita: 'Jordania', fecha: '15 Jun', hora: '23:00', sede: 'San Francisco' },
    { id: 57, local: 'Argentina', visita: 'Austria', fecha: '22 Jun', hora: '12:00', sede: 'Dallas' },
    { id: 58, local: 'Jordania', visita: 'Argelia', fecha: '22 Jun', hora: '22:00', sede: 'San Francisco' },
    { id: 59, local: 'Jordania', visita: 'Argentina', fecha: '27 Jun', hora: '21:00', sede: 'Dallas' },
    { id: 60, local: 'Argelia', visita: 'Austria', fecha: '27 Jun', hora: '21:00', sede: 'Kansas City' },
  ],
  K: [
    { id: 61, local: 'Portugal', visita: 'R.D. del Congo', fecha: '17 Jun', hora: '12:00', sede: 'Houston' },
    { id: 62, local: 'Uzbekistán', visita: 'Colombia', fecha: '17 Jun', hora: '21:00', sede: 'Ciudad de México' },
    { id: 63, local: 'Portugal', visita: 'Uzbekistán', fecha: '23 Jun', hora: '12:00', sede: 'Houston' },
    { id: 64, local: 'Colombia', visita: 'R.D. del Congo', fecha: '23 Jun', hora: '21:00', sede: 'Guadalajara' },
    { id: 65, local: 'Colombia', visita: 'Portugal', fecha: '27 Jun', hora: '18:30', sede: 'Miami' },
    { id: 66, local: 'R.D. del Congo', visita: 'Uzbekistán', fecha: '27 Jun', hora: '18:30', sede: 'Atlanta' },
  ],
  L: [
    { id: 67, local: 'Inglaterra', visita: 'Croacia', fecha: '17 Jun', hora: '15:00', sede: 'Dallas' },
    { id: 68, local: 'Ghana', visita: 'Panamá', fecha: '17 Jun', hora: '18:00', sede: 'Toronto' },
    { id: 69, local: 'Inglaterra', visita: 'Ghana', fecha: '23 Jun', hora: '15:00', sede: 'Boston' },
    { id: 70, local: 'Panamá', visita: 'Croacia', fecha: '23 Jun', hora: '18:00', sede: 'Toronto' },
    { id: 71, local: 'Panamá', visita: 'Inglaterra', fecha: '27 Jun', hora: '16:00', sede: 'Nueva York' },
    { id: 72, local: 'Croacia', visita: 'Ghana', fecha: '27 Jun', hora: '16:00', sede: 'Filadelfia' },
  ],
};

function Fixture({ resultados, setResultados, grupoActivo, setGrupoActivo }) {
  const tema = useContext(TemaContext);
  const { t } = useContext(IdiomaContext);
  const [editando, setEditando] = useState(null);

  const actualizarResultado = (id, campo, valor) => {
    setResultados(prev => ({
      ...prev,
      [id]: { ...prev[id], [campo]: valor }
    }));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: tema.primario, textAlign: 'center' }}>{t.fixture.titulo}</h2>

      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '8px',
        justifyContent: 'center', marginBottom: '20px'
      }}>
        {Object.keys(partidos).map(g => (
          <button key={g} onClick={() => setGrupoActivo(g)} style={{
            padding: '8px 16px',
            background: grupoActivo === g ? tema.primario : tema.botonInactivo,
            color: grupoActivo === g ? 'white' : tema.textoInactivo,
            border: 'none', borderRadius: '20px',
            cursor: 'pointer', fontWeight: 'bold',
            transition: 'all 0.3s'
          }}>
            {t.grupos.equipo === 'Team' ? 'Group' : 'Grupo'} {g}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {partidos[grupoActivo].map(partido => {
          const res = resultados[partido.id] || {};
          const jugado = res.golesLocal !== undefined && res.golesVisita !== undefined && res.golesLocal !== '' && res.golesVisita !== '';
          return (
            <div key={partido.id} style={{
              background: imagenesEstadios[partido.sede]
                ? `url(${imagenesEstadios[partido.sede]}) center/cover no-repeat`
                : tema.tarjeta,
              borderRadius: '12px',
              boxShadow: tema.sombra, padding: '16px',
              transition: 'all 0.3s',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.6)',
                zIndex: 0,
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', marginBottom: '8px', textAlign: 'center' }}>
                  📅 {horariosPartidos[partido.id] ? formatearHoraLocal(horariosPartidos[partido.id]) : `${partido.fecha} ${partido.hora}`} · 📍 {partido.sede}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1rem', flex: 1, textAlign: 'right', color: 'white' }}>{partido.local}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 12px' }}>
                    {editando === partido.id ? (
                      <>
                        <input type="number" min="0" max="20" value={res.golesLocal ?? ''} onChange={e => actualizarResultado(partido.id, 'golesLocal', e.target.value)}
                          style={{ width: '40px', textAlign: 'center', fontSize: '1.2rem', border: `2px solid ${tema.primario}`, borderRadius: '6px', padding: '4px', background: 'rgba(0,0,0,0.5)', color: 'white' }} />
                        <span style={{ fontWeight: 'bold', color: 'white' }}>-</span>
                        <input type="number" min="0" max="20" value={res.golesVisita ?? ''} onChange={e => actualizarResultado(partido.id, 'golesVisita', e.target.value)}
                          style={{ width: '40px', textAlign: 'center', fontSize: '1.2rem', border: `2px solid ${tema.primario}`, borderRadius: '6px', padding: '4px', background: 'rgba(0,0,0,0.5)', color: 'white' }} />
                      </>
                    ) : (
                        <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'white' }}>
                        {jugado ? `${res.golesLocal} - ${res.golesVisita}` : 'vs'}
                      </span>
                    )}
                  </div>
                  <span style={{ fontWeight: 'bold', fontSize: '1rem', flex: 1, color: 'white' }}>{partido.visita}</span>
                </div>
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button onClick={() => setEditando(editando === partido.id ? null : partido.id)} style={{
                      padding: '4px 16px',
                      background: editando === partido.id ? tema.primario : 'rgba(255,255,255,0.2)',
                      color: 'white',
                      border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '0.8rem',
                      transition: 'all 0.3s'
                    }}>
                      {editando === partido.id ? t.fixture.guardar : t.fixture.editar}
                    </button>
                    {jugado && (
                      <button onClick={() => {
                        setResultados(prev => {
                          const nuevos = { ...prev };
                          delete nuevos[partido.id];
                          return nuevos;
                        });
                      }} style={{
                        padding: '4px 16px',
                        background: 'rgba(255,0,0,0.4)',
                        color: 'white',
                        border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '0.8rem',
                        transition: 'all 0.3s'
                      }}>
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Fixture;