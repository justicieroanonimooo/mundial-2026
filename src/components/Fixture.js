import React, { useState, useContext } from 'react';
import { TemaContext, IdiomaContext } from '../App';
import { horariosPartidos, formatearHoraLocal } from '../horarios';

const partidos = {
  A: [
    { id: 1, local: 'México', visita: 'Sudáfrica', fecha: '11 Jun', hora: '15:00', sede: 'Ciudad de México' },
    { id: 2, local: 'Corea del Sur', visita: 'República Checa', fecha: '11 Jun', hora: '18:00', sede: 'Ciudad de México' },
    { id: 3, local: 'México', visita: 'Corea del Sur', fecha: '15 Jun', hora: '15:00', sede: 'Guadalajara' },
    { id: 4, local: 'Sudáfrica', visita: 'República Checa', fecha: '15 Jun', hora: '18:00', sede: 'Guadalajara' },
    { id: 5, local: 'México', visita: 'República Checa', fecha: '19 Jun', hora: '18:00', sede: 'Monterrey' },
    { id: 6, local: 'Sudáfrica', visita: 'Corea del Sur', fecha: '19 Jun', hora: '18:00', sede: 'Monterrey' },
  ],
  B: [
    { id: 7, local: 'Canadá', visita: 'Bosnia y Herzegovina', fecha: '12 Jun', hora: '15:00', sede: 'Toronto' },
    { id: 8, local: 'Catar', visita: 'Suiza', fecha: '12 Jun', hora: '18:00', sede: 'Toronto' },
    { id: 9, local: 'Canadá', visita: 'Catar', fecha: '16 Jun', hora: '15:00', sede: 'Vancouver' },
    { id: 10, local: 'Bosnia y Herzegovina', visita: 'Suiza', fecha: '16 Jun', hora: '18:00', sede: 'Vancouver' },
    { id: 11, local: 'Canadá', visita: 'Suiza', fecha: '20 Jun', hora: '18:00', sede: 'Toronto' },
    { id: 12, local: 'Bosnia y Herzegovina', visita: 'Catar', fecha: '20 Jun', hora: '18:00', sede: 'Vancouver' },
  ],
  C: [
    { id: 13, local: 'Brasil', visita: 'Marruecos', fecha: '12 Jun', hora: '21:00', sede: 'Los Ángeles' },
    { id: 14, local: 'Haití', visita: 'Escocia', fecha: '12 Jun', hora: '21:00', sede: 'Nueva York' },
    { id: 15, local: 'Brasil', visita: 'Haití', fecha: '16 Jun', hora: '21:00', sede: 'Los Ángeles' },
    { id: 16, local: 'Marruecos', visita: 'Escocia', fecha: '16 Jun', hora: '21:00', sede: 'Nueva York' },
    { id: 17, local: 'Brasil', visita: 'Escocia', fecha: '20 Jun', hora: '21:00', sede: 'Los Ángeles' },
    { id: 18, local: 'Marruecos', visita: 'Haití', fecha: '20 Jun', hora: '21:00', sede: 'Nueva York' },
  ],
  D: [
    { id: 19, local: 'EE. UU.', visita: 'Paraguay', fecha: '13 Jun', hora: '18:00', sede: 'Nueva York' },
    { id: 20, local: 'Australia', visita: 'Turquía', fecha: '13 Jun', hora: '21:00', sede: 'Dallas' },
    { id: 21, local: 'EE. UU.', visita: 'Australia', fecha: '17 Jun', hora: '18:00', sede: 'Los Ángeles' },
    { id: 22, local: 'Paraguay', visita: 'Turquía', fecha: '17 Jun', hora: '21:00', sede: 'Miami' },
    { id: 23, local: 'EE. UU.', visita: 'Turquía', fecha: '21 Jun', hora: '21:00', sede: 'Nueva York' },
    { id: 24, local: 'Paraguay', visita: 'Australia', fecha: '21 Jun', hora: '21:00', sede: 'Dallas' },
  ],
  E: [
    { id: 25, local: 'Alemania', visita: 'Curazao', fecha: '13 Jun', hora: '15:00', sede: 'San Francisco' },
    { id: 26, local: 'Costa de Marfil', visita: 'Ecuador', fecha: '13 Jun', hora: '18:00', sede: 'Houston' },
    { id: 27, local: 'Alemania', visita: 'Costa de Marfil', fecha: '17 Jun', hora: '15:00', sede: 'San Francisco' },
    { id: 28, local: 'Curazao', visita: 'Ecuador', fecha: '17 Jun', hora: '18:00', sede: 'Houston' },
    { id: 29, local: 'Alemania', visita: 'Ecuador', fecha: '21 Jun', hora: '18:00', sede: 'San Francisco' },
    { id: 30, local: 'Curazao', visita: 'Costa de Marfil', fecha: '21 Jun', hora: '18:00', sede: 'Houston' },
  ],
  F: [
    { id: 31, local: 'Países Bajos', visita: 'Japón', fecha: '14 Jun', hora: '15:00', sede: 'Seattle' },
    { id: 32, local: 'Suecia', visita: 'Túnez', fecha: '14 Jun', hora: '18:00', sede: 'Boston' },
    { id: 33, local: 'Países Bajos', visita: 'Suecia', fecha: '18 Jun', hora: '15:00', sede: 'Seattle' },
    { id: 34, local: 'Japón', visita: 'Túnez', fecha: '18 Jun', hora: '18:00', sede: 'Boston' },
    { id: 35, local: 'Países Bajos', visita: 'Túnez', fecha: '22 Jun', hora: '18:00', sede: 'Seattle' },
    { id: 36, local: 'Japón', visita: 'Suecia', fecha: '22 Jun', hora: '18:00', sede: 'Boston' },
  ],
  G: [
    { id: 37, local: 'Bélgica', visita: 'Egipto', fecha: '14 Jun', hora: '21:00', sede: 'Miami' },
    { id: 38, local: 'Irán', visita: 'Nueva Zelanda', fecha: '14 Jun', hora: '21:00', sede: 'Atlanta' },
    { id: 39, local: 'Bélgica', visita: 'Irán', fecha: '18 Jun', hora: '21:00', sede: 'Miami' },
    { id: 40, local: 'Egipto', visita: 'Nueva Zelanda', fecha: '18 Jun', hora: '21:00', sede: 'Atlanta' },
    { id: 41, local: 'Bélgica', visita: 'Nueva Zelanda', fecha: '22 Jun', hora: '21:00', sede: 'Miami' },
    { id: 42, local: 'Egipto', visita: 'Irán', fecha: '22 Jun', hora: '21:00', sede: 'Atlanta' },
  ],
  H: [
    { id: 43, local: 'España', visita: 'Cabo Verde', fecha: '15 Jun', hora: '15:00', sede: 'Dallas' },
    { id: 44, local: 'Arabia Saudí', visita: 'Uruguay', fecha: '15 Jun', hora: '18:00', sede: 'Kansas City' },
    { id: 45, local: 'España', visita: 'Arabia Saudí', fecha: '19 Jun', hora: '15:00', sede: 'Dallas' },
    { id: 46, local: 'Cabo Verde', visita: 'Uruguay', fecha: '19 Jun', hora: '18:00', sede: 'Kansas City' },
    { id: 47, local: 'España', visita: 'Uruguay', fecha: '23 Jun', hora: '18:00', sede: 'Dallas' },
    { id: 48, local: 'Cabo Verde', visita: 'Arabia Saudí', fecha: '23 Jun', hora: '18:00', sede: 'Kansas City' },
  ],
  I: [
    { id: 49, local: 'Francia', visita: 'Senegal', fecha: '15 Jun', hora: '21:00', sede: 'Chicago' },
    { id: 50, local: 'Irak', visita: 'Noruega', fecha: '15 Jun', hora: '21:00', sede: 'Filadelfia' },
    { id: 51, local: 'Francia', visita: 'Irak', fecha: '19 Jun', hora: '21:00', sede: 'Chicago' },
    { id: 52, local: 'Senegal', visita: 'Noruega', fecha: '19 Jun', hora: '21:00', sede: 'Filadelfia' },
    { id: 53, local: 'Francia', visita: 'Noruega', fecha: '23 Jun', hora: '21:00', sede: 'Chicago' },
    { id: 54, local: 'Senegal', visita: 'Irak', fecha: '23 Jun', hora: '21:00', sede: 'Filadelfia' },
  ],
  J: [
    { id: 55, local: 'Argentina', visita: 'Argelia', fecha: '16 Jun', hora: '15:00', sede: 'San Francisco' },
    { id: 56, local: 'Austria', visita: 'Jordania', fecha: '16 Jun', hora: '18:00', sede: 'Denver' },
    { id: 57, local: 'Argentina', visita: 'Austria', fecha: '20 Jun', hora: '15:00', sede: 'San Francisco' },
    { id: 58, local: 'Argelia', visita: 'Jordania', fecha: '20 Jun', hora: '18:00', sede: 'Denver' },
    { id: 59, local: 'Argentina', visita: 'Jordania', fecha: '24 Jun', hora: '18:00', sede: 'San Francisco' },
    { id: 60, local: 'Argelia', visita: 'Austria', fecha: '24 Jun', hora: '18:00', sede: 'Denver' },
  ],
  K: [
    { id: 61, local: 'Portugal', visita: 'R.D. del Congo', fecha: '16 Jun', hora: '21:00', sede: 'Boston' },
    { id: 62, local: 'Uzbekistán', visita: 'Colombia', fecha: '16 Jun', hora: '21:00', sede: 'Atlanta' },
    { id: 63, local: 'Portugal', visita: 'Uzbekistán', fecha: '20 Jun', hora: '21:00', sede: 'Boston' },
    { id: 64, local: 'R.D. del Congo', visita: 'Colombia', fecha: '20 Jun', hora: '21:00', sede: 'Atlanta' },
    { id: 65, local: 'Portugal', visita: 'Colombia', fecha: '24 Jun', hora: '21:00', sede: 'Boston' },
    { id: 66, local: 'R.D. del Congo', visita: 'Uzbekistán', fecha: '24 Jun', hora: '21:00', sede: 'Atlanta' },
  ],
  L: [
    { id: 67, local: 'Inglaterra', visita: 'Croacia', fecha: '17 Jun', hora: '18:00', sede: 'Nueva York' },
    { id: 68, local: 'Ghana', visita: 'Panamá', fecha: '17 Jun', hora: '21:00', sede: 'Houston' },
    { id: 69, local: 'Inglaterra', visita: 'Ghana', fecha: '21 Jun', hora: '18:00', sede: 'Nueva York' },
    { id: 70, local: 'Croacia', visita: 'Panamá', fecha: '21 Jun', hora: '21:00', sede: 'Houston' },
    { id: 71, local: 'Inglaterra', visita: 'Panamá', fecha: '25 Jun', hora: '18:00', sede: 'Nueva York' },
    { id: 72, local: 'Croacia', visita: 'Ghana', fecha: '25 Jun', hora: '21:00', sede: 'Houston' },
  ],
};

function Fixture({ resultados, setResultados }) {
    const tema = useContext(TemaContext);
    const { t } = useContext(IdiomaContext);
    const [grupoActivo, setGrupoActivo] = useState('A');
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
              background: tema.tarjeta, borderRadius: '12px',
              boxShadow: tema.sombra, padding: '16px',
              transition: 'all 0.3s'
            }}>
              <div style={{ fontSize: '0.8rem', color: tema.subtexto, marginBottom: '8px', textAlign: 'center' }}>
             📅 {horariosPartidos[partido.id] ? formatearHoraLocal(horariosPartidos[partido.id]) : `${partido.fecha} ${partido.hora}`} · 📍 {partido.sede}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1rem', flex: 1, textAlign: 'right', color: tema.texto }}>{partido.local}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 12px' }}>
                  {editando === partido.id ? (
                    <>
                      <input type="number" min="0" max="20" value={res.golesLocal ?? ''} onChange={e => actualizarResultado(partido.id, 'golesLocal', e.target.value)}
                        style={{ width: '40px', textAlign: 'center', fontSize: '1.2rem', border: `2px solid ${tema.primario}`, borderRadius: '6px', padding: '4px', background: tema.tarjeta, color: tema.texto }} />
                      <span style={{ fontWeight: 'bold', color: tema.texto }}>-</span>
                      <input type="number" min="0" max="20" value={res.golesVisita ?? ''} onChange={e => actualizarResultado(partido.id, 'golesVisita', e.target.value)}
                        style={{ width: '40px', textAlign: 'center', fontSize: '1.2rem', border: `2px solid ${tema.primario}`, borderRadius: '6px', padding: '4px', background: tema.tarjeta, color: tema.texto }} />
                    </>
                  ) : (
                    <span style={{ fontSize: '1.4rem', fontWeight: 'bold', color: jugado ? tema.puntaje : tema.subtexto }}>
                      {jugado ? `${res.golesLocal} - ${res.golesVisita}` : 'vs'}
                    </span>
                  )}
                </div>
                <span style={{ fontWeight: 'bold', fontSize: '1rem', flex: 1, color: tema.texto }}>{partido.visita}</span>
              </div>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <button onClick={() => setEditando(editando === partido.id ? null : partido.id)} style={{
                  padding: '4px 16px',
                  background: editando === partido.id ? tema.primario : tema.botonInactivo,
                  color: editando === partido.id ? 'white' : tema.textoInactivo,
                  border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '0.8rem',
                  transition: 'all 0.3s'
                }}>
                  {editando === partido.id ? t.fixture.guardar : t.fixture.editar}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Fixture;