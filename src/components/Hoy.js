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
};

const todosLosPartidos = [
  { id: 1, local: 'México', visita: 'Sudáfrica', sede: 'Ciudad de México', grupo: 'A' },
  { id: 2, local: 'Corea del Sur', visita: 'República Checa', sede: 'Guadalajara', grupo: 'A' },
  { id: 3, local: 'México', visita: 'Corea del Sur', sede: 'Guadalajara', grupo: 'A' },
  { id: 4, local: 'República Checa', visita: 'Sudáfrica', sede: 'Atlanta', grupo: 'A' },
  { id: 5, local: 'República Checa', visita: 'México', sede: 'Ciudad de México', grupo: 'A' },
  { id: 6, local: 'Sudáfrica', visita: 'Corea del Sur', sede: 'Monterrey', grupo: 'A' },
  { id: 7, local: 'Canadá', visita: 'Bosnia y Herzegovina', sede: 'Toronto', grupo: 'B' },
  { id: 8, local: 'Catar', visita: 'Suiza', sede: 'San Francisco', grupo: 'B' },
  { id: 9, local: 'Canadá', visita: 'Catar', sede: 'Vancouver', grupo: 'B' },
  { id: 10, local: 'Suiza', visita: 'Bosnia y Herzegovina', sede: 'Los Ángeles', grupo: 'B' },
  { id: 11, local: 'Suiza', visita: 'Canadá', sede: 'Vancouver', grupo: 'B' },
  { id: 12, local: 'Bosnia y Herzegovina', visita: 'Catar', sede: 'Seattle', grupo: 'B' },
  { id: 13, local: 'Brasil', visita: 'Marruecos', sede: 'Nueva York', grupo: 'C' },
  { id: 14, local: 'Haití', visita: 'Escocia', sede: 'Boston', grupo: 'C' },
  { id: 15, local: 'Brasil', visita: 'Haití', sede: 'Filadelfia', grupo: 'C' },
  { id: 16, local: 'Escocia', visita: 'Marruecos', sede: 'Boston', grupo: 'C' },
  { id: 17, local: 'Brasil', visita: 'Escocia', sede: 'Miami', grupo: 'C' },
  { id: 18, local: 'Marruecos', visita: 'Haití', sede: 'Atlanta', grupo: 'C' },
  { id: 19, local: 'Estados Unidos', visita: 'Paraguay', sede: 'Los Ángeles', grupo: 'D' },
  { id: 20, local: 'Australia', visita: 'Turquía', sede: 'Vancouver', grupo: 'D' },
  { id: 21, local: 'Estados Unidos', visita: 'Australia', sede: 'Seattle', grupo: 'D' },
  { id: 22, local: 'Turquía', visita: 'Paraguay', sede: 'San Francisco', grupo: 'D' },
  { id: 23, local: 'Turquía', visita: 'Estados Unidos', sede: 'Los Ángeles', grupo: 'D' },
  { id: 24, local: 'Paraguay', visita: 'Australia', sede: 'San Francisco', grupo: 'D' },
  { id: 25, local: 'Alemania', visita: 'Curazao', sede: 'Houston', grupo: 'E' },
  { id: 26, local: 'Costa de Marfil', visita: 'Ecuador', sede: 'Filadelfia', grupo: 'E' },
  { id: 27, local: 'Alemania', visita: 'Costa de Marfil', sede: 'Toronto', grupo: 'E' },
  { id: 28, local: 'Ecuador', visita: 'Curazao', sede: 'Kansas City', grupo: 'E' },
  { id: 29, local: 'Ecuador', visita: 'Alemania', sede: 'Nueva York', grupo: 'E' },
  { id: 30, local: 'Curazao', visita: 'Costa de Marfil', sede: 'Filadelfia', grupo: 'E' },
  { id: 31, local: 'Países Bajos', visita: 'Japón', sede: 'Dallas', grupo: 'F' },
  { id: 32, local: 'Suecia', visita: 'Túnez', sede: 'Monterrey', grupo: 'F' },
  { id: 33, local: 'Países Bajos', visita: 'Suecia', sede: 'Houston', grupo: 'F' },
  { id: 34, local: 'Túnez', visita: 'Japón', sede: 'Monterrey', grupo: 'F' },
  { id: 35, local: 'Japón', visita: 'Suecia', sede: 'Dallas', grupo: 'F' },
  { id: 36, local: 'Túnez', visita: 'Países Bajos', sede: 'Kansas City', grupo: 'F' },
  { id: 37, local: 'Bélgica', visita: 'Egipto', sede: 'Seattle', grupo: 'G' },
  { id: 38, local: 'Irán', visita: 'Nueva Zelanda', sede: 'Los Ángeles', grupo: 'G' },
  { id: 39, local: 'Bélgica', visita: 'Irán', sede: 'Los Ángeles', grupo: 'G' },
  { id: 40, local: 'Nueva Zelanda', visita: 'Egipto', sede: 'Vancouver', grupo: 'G' },
  { id: 41, local: 'Egipto', visita: 'Irán', sede: 'Seattle', grupo: 'G' },
  { id: 42, local: 'Nueva Zelanda', visita: 'Bélgica', sede: 'Vancouver', grupo: 'G' },
  { id: 43, local: 'España', visita: 'Cabo Verde', sede: 'Atlanta', grupo: 'H' },
  { id: 44, local: 'Arabia Saudí', visita: 'Uruguay', sede: 'Miami', grupo: 'H' },
  { id: 45, local: 'España', visita: 'Arabia Saudí', sede: 'Atlanta', grupo: 'H' },
  { id: 46, local: 'Uruguay', visita: 'Cabo Verde', sede: 'Miami', grupo: 'H' },
  { id: 47, local: 'Uruguay', visita: 'España', sede: 'Guadalajara', grupo: 'H' },
  { id: 48, local: 'Cabo Verde', visita: 'Arabia Saudí', sede: 'Houston', grupo: 'H' },
  { id: 49, local: 'Francia', visita: 'Senegal', sede: 'Nueva York', grupo: 'I' },
  { id: 50, local: 'Irak', visita: 'Noruega', sede: 'Boston', grupo: 'I' },
  { id: 51, local: 'Francia', visita: 'Irak', sede: 'Filadelfia', grupo: 'I' },
  { id: 52, local: 'Noruega', visita: 'Senegal', sede: 'Nueva York', grupo: 'I' },
  { id: 53, local: 'Noruega', visita: 'Francia', sede: 'Boston', grupo: 'I' },
  { id: 54, local: 'Senegal', visita: 'Irak', sede: 'Toronto', grupo: 'I' },
  { id: 55, local: 'Argentina', visita: 'Argelia', sede: 'Kansas City', grupo: 'J' },
  { id: 56, local: 'Austria', visita: 'Jordania', sede: 'San Francisco', grupo: 'J' },
  { id: 57, local: 'Argentina', visita: 'Austria', sede: 'Dallas', grupo: 'J' },
  { id: 58, local: 'Jordania', visita: 'Argelia', sede: 'San Francisco', grupo: 'J' },
  { id: 59, local: 'Jordania', visita: 'Argentina', sede: 'Dallas', grupo: 'J' },
  { id: 60, local: 'Argelia', visita: 'Austria', sede: 'Kansas City', grupo: 'J' },
  { id: 61, local: 'Portugal', visita: 'R.D. del Congo', sede: 'Houston', grupo: 'K' },
  { id: 62, local: 'Uzbekistán', visita: 'Colombia', sede: 'Ciudad de México', grupo: 'K' },
  { id: 63, local: 'Portugal', visita: 'Uzbekistán', sede: 'Houston', grupo: 'K' },
  { id: 64, local: 'Colombia', visita: 'R.D. del Congo', sede: 'Guadalajara', grupo: 'K' },
  { id: 65, local: 'Colombia', visita: 'Portugal', sede: 'Miami', grupo: 'K' },
  { id: 66, local: 'R.D. del Congo', visita: 'Uzbekistán', sede: 'Atlanta', grupo: 'K' },
  { id: 67, local: 'Inglaterra', visita: 'Croacia', sede: 'Dallas', grupo: 'L' },
  { id: 68, local: 'Ghana', visita: 'Panamá', sede: 'Toronto', grupo: 'L' },
  { id: 69, local: 'Inglaterra', visita: 'Ghana', sede: 'Boston', grupo: 'L' },
  { id: 70, local: 'Panamá', visita: 'Croacia', sede: 'Toronto', grupo: 'L' },
  { id: 71, local: 'Panamá', visita: 'Inglaterra', sede: 'Nueva York', grupo: 'L' },
  { id: 72, local: 'Croacia', visita: 'Ghana', sede: 'Filadelfia', grupo: 'L' },
  { id: 73, local: '', visita: '', sede: 'Los Ángeles', grupo: 'R32' },
  { id: 74, local: '', visita: '', sede: 'Boston', grupo: 'R32' },
  { id: 75, local: '', visita: '', sede: 'Monterrey', grupo: 'R32' },
  { id: 76, local: '', visita: '', sede: 'Houston', grupo: 'R32' },
  { id: 77, local: '', visita: '', sede: 'Nueva York', grupo: 'R32' },
  { id: 78, local: '', visita: '', sede: 'Dallas', grupo: 'R32' },
  { id: 79, local: '', visita: '', sede: 'Ciudad de México', grupo: 'R32' },
  { id: 80, local: '', visita: '', sede: 'Atlanta', grupo: 'R32' },
  { id: 81, local: '', visita: '', sede: 'San Francisco', grupo: 'R32' },
  { id: 82, local: '', visita: '', sede: 'Seattle', grupo: 'R32' },
  { id: 83, local: '', visita: '', sede: 'Toronto', grupo: 'R32' },
  { id: 84, local: '', visita: '', sede: 'Los Ángeles', grupo: 'R32' },
  { id: 85, local: '', visita: '', sede: 'Vancouver', grupo: 'R32' },
  { id: 86, local: '', visita: '', sede: 'Miami', grupo: 'R32' },
  { id: 87, local: '', visita: '', sede: 'Kansas City', grupo: 'R32' },
  { id: 88, local: '', visita: '', sede: 'Dallas', grupo: 'R32' },
  { id: 89, local: '', visita: '', sede: 'Filadelfia', grupo: 'R16' },
  { id: 90, local: '', visita: '', sede: 'Houston', grupo: 'R16' },
  { id: 91, local: '', visita: '', sede: 'Nueva York', grupo: 'R16' },
  { id: 92, local: '', visita: '', sede: 'Ciudad de México', grupo: 'R16' },
  { id: 93, local: '', visita: '', sede: 'Dallas', grupo: 'R16' },
  { id: 94, local: '', visita: '', sede: 'Seattle', grupo: 'R16' },
  { id: 95, local: '', visita: '', sede: 'Atlanta', grupo: 'R16' },
  { id: 96, local: '', visita: '', sede: 'Vancouver', grupo: 'R16' },
  { id: 97, local: '', visita: '', sede: 'Boston', grupo: 'QF' },
  { id: 98, local: '', visita: '', sede: 'Los Ángeles', grupo: 'QF' },
  { id: 99, local: '', visita: '', sede: 'Miami', grupo: 'QF' },
  { id: 100, local: '', visita: '', sede: 'Kansas City', grupo: 'QF' },
  { id: 101, local: '', visita: '', sede: 'Dallas', grupo: 'SF' },
  { id: 102, local: '', visita: '', sede: 'Atlanta', grupo: 'SF' },
  { id: 103, local: '', visita: '', sede: 'Miami', grupo: '3P' },
  { id: 104, local: '', visita: '', sede: 'Nueva York', grupo: 'Final' },
];

function etiqueta(grupo) {
  const map = { R32: '16avos', R16: 'Octavos', QF: 'Cuartos', SF: 'Semis', '3P': '3er Puesto', Final: 'Final' };
  return map[grupo] || `Grupo ${grupo}`;
}

function TarjetaPartido({ partido, resultados, setResultados, tema, enCurso }) {
  const [editando, setEditando] = useState(false);
  const res = resultados[partido.id] || {};
  const localNombre = res.local || partido.local;
  const visitaNombre = res.visita || partido.visita;
  const jugado = res.golesLocal !== undefined && res.golesVisita !== undefined && res.golesLocal !== '' && res.golesVisita !== '';

  return (
    <div style={{
      background: imagenesEstadios[partido.sede]
        ? `url(${imagenesEstadios[partido.sede]}) center/cover no-repeat`
        : tema.tarjeta,
      borderRadius: '12px',
      boxShadow: enCurso ? '0 0 20px rgba(0,255,100,0.4)' : tema.sombra,
      marginBottom: '12px',
      position: 'relative',
      overflow: 'hidden',
      border: enCurso ? '2px solid rgba(0,255,100,0.6)' : '2px solid transparent',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1, padding: '16px' }}>

        {enCurso && (
          <div style={{ textAlign: 'center', marginBottom: '4px' }}>
            <span style={{ background: 'rgba(0,255,100,0.3)', color: '#00ff64', fontSize: '0.7rem', fontWeight: 'bold', padding: '2px 10px', borderRadius: '20px' }}>
              🔴 EN VIVO
            </span>
          </div>
        )}

        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: '8px' }}>
          📅 {horariosPartidos[partido.id] ? formatearHoraLocal(horariosPartidos[partido.id]) : ''} · 📍 {partido.sede} · {etiqueta(partido.grupo)}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1rem', flex: 1, textAlign: 'right', color: 'white', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
            {localNombre || '?'}
          </span>

          <div style={{ margin: '0 16px', textAlign: 'center' }}>
            {editando ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input type="number" min="0" max="20" value={res.golesLocal ?? ''}
                  onChange={e => setResultados(prev => ({ ...prev, [partido.id]: { ...prev[partido.id], golesLocal: e.target.value } }))}
                  style={{ width: '45px', textAlign: 'center', fontSize: '1.2rem', borderRadius: '8px', border: 'none', padding: '4px', background: 'rgba(255,255,255,0.2)', color: 'white' }} />
                <span style={{ color: 'white', fontWeight: 'bold' }}>-</span>
                <input type="number" min="0" max="20" value={res.golesVisita ?? ''}
                  onChange={e => setResultados(prev => ({ ...prev, [partido.id]: { ...prev[partido.id], golesVisita: e.target.value } }))}
                  style={{ width: '45px', textAlign: 'center', fontSize: '1.2rem', borderRadius: '8px', border: 'none', padding: '4px', background: 'rgba(255,255,255,0.2)', color: 'white' }} />
              </div>
            ) : (
              <span style={{ fontSize: '1.6rem', fontWeight: 'bold', color: jugado ? '#4fc3f7' : 'rgba(255,255,255,0.5)' }}>
                {jugado ? `${res.golesLocal} - ${res.golesVisita}` : 'vs'}
              </span>
            )}
          </div>

          <span style={{ fontWeight: 'bold', fontSize: '1rem', flex: 1, color: 'white', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
            {visitaNombre || '?'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '10px' }}>
          <button onClick={() => setEditando(!editando)} style={{
            padding: '4px 16px', background: editando ? '#4caf50' : 'rgba(255,255,255,0.2)',
            color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '0.8rem'
          }}>
            {editando ? '✅ Guardar' : '✏️ Editar'}
          </button>
          {jugado && (
            <button onClick={() => setResultados(prev => { const n = { ...prev }; delete n[partido.id]; return n; })} style={{
              padding: '4px 16px', background: 'rgba(255,0,0,0.4)',
              color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '0.8rem'
            }}>🗑️</button>
          )}
        </div>
      </div>
    </div>
  );
}

function Hoy({ resultados, setResultados }) {
  const tema = useContext(TemaContext);
  const { t } = useContext(IdiomaContext);
  const ahora = new Date();
  const dosHoras = 2 * 60 * 60 * 1000;

  // Ordenar todos por horario
  const ordenados = [...todosLosPartidos]
    .filter(p => horariosPartidos[p.id])
    .sort((a, b) => new Date(horariosPartidos[a.id]) - new Date(horariosPartidos[b.id]));

  // Encontrar el primer partido que no terminó (inicio + 2hs > ahora)
  const primerIdx = ordenados.findIndex(p => {
    const inicio = new Date(horariosPartidos[p.id]);
    return inicio.getTime() + dosHoras > ahora.getTime();
  });

  const desde = primerIdx === -1 ? Math.max(0, ordenados.length - 5) : primerIdx;
  const proximosCinco = ordenados.slice(desde, desde + 5);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: tema.primario, textAlign: 'center', marginBottom: '4px' }}>
        {t.nav.hoy || '📅 Próximos Partidos'}
      </h2>
      <p style={{ textAlign: 'center', color: tema.subtexto, fontSize: '0.85rem', marginBottom: '20px' }}>
        {ahora.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
      </p>

      {proximosCinco.map(partido => {
        const inicio = new Date(horariosPartidos[partido.id]);
        const enCurso = inicio <= ahora && ahora <= new Date(inicio.getTime() + dosHoras);
        return (
          <TarjetaPartido
            key={partido.id}
            partido={partido}
            resultados={resultados}
            setResultados={setResultados}
            tema={tema}
            enCurso={enCurso}
          />
        );
      })}
    </div>
  );
}

export default Hoy;