import React, { useState, useContext } from 'react';
import { TemaContext, IdiomaContext } from '../App';
import { horariosPartidos, formatearHoraLocal } from '../horarios';
import { gruposValidosTercero, getTercerosDisponibles } from '../terceros';
import { getAbrev, getBandera } from '../equipos';

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

const dieciseisavos = [
  { id: 73, label: 'P73', desc: '2º Grupo A vs 2º Grupo B', fecha: '28 Jun', sede: 'Ciudad de México' },
  { id: 74, label: 'P74', desc: '1º Grupo E vs 3º A/B/C/D/F', fecha: '28 Jun', sede: 'Dallas' },
  { id: 75, label: 'P75', desc: '1º Grupo F vs 2º Grupo C', fecha: '29 Jun', sede: 'Seattle' },
  { id: 76, label: 'P76', desc: '1º Grupo C vs 2º Grupo F', fecha: '29 Jun', sede: 'Boston' },
  { id: 77, label: 'P77', desc: '1º Grupo I vs 3º C/D/F/G/H', fecha: '30 Jun', sede: 'Nueva York' },
  { id: 78, label: 'P78', desc: '2º Grupo E vs 2º Grupo I', fecha: '30 Jun', sede: 'Miami' },
  { id: 79, label: 'P79', desc: '1º Grupo A vs 3º C/E/F/H/I', fecha: '1 Jul', sede: 'Guadalajara' },
  { id: 80, label: 'P80', desc: '1º Grupo L vs 3º E/H/I/J/K', fecha: '1 Jul', sede: 'Atlanta' },
  { id: 81, label: 'P81', desc: '1º Grupo D vs 3º B/E/F/I/J', fecha: '2 Jul', sede: 'Los Ángeles' },
  { id: 82, label: 'P82', desc: '1º Grupo G vs 3º A/E/H/I/J', fecha: '2 Jul', sede: 'Houston' },
  { id: 83, label: 'P83', desc: '2º Grupo K vs 2º Grupo L', fecha: '3 Jul', sede: 'Vancouver' },
  { id: 84, label: 'P84', desc: '1º Grupo H vs 2º Grupo J', fecha: '3 Jul', sede: 'Kansas City' },
  { id: 85, label: 'P85', desc: '1º Grupo B vs 3º E/F/G/I/J', fecha: '3 Jul', sede: 'Toronto' },
  { id: 86, label: 'P86', desc: '1º Grupo J vs 2º Grupo H', fecha: '3 Jul', sede: 'San Francisco' },
  { id: 87, label: 'P87', desc: '1º Grupo K vs 3º D/E/I/J/L', fecha: '3 Jul', sede: 'Filadelfia' },
  { id: 88, label: 'P88', desc: '2º Grupo D vs 2º Grupo G', fecha: '3 Jul', sede: 'Denver' },
];

const octavos = [
  { id: 89, label: 'P89', desc: 'Gan. P74 vs Gan. P77', fecha: '4 Jul', sede: 'Dallas' },
  { id: 90, label: 'P90', desc: 'Gan. P73 vs Gan. P75', fecha: '4 Jul', sede: 'Los Ángeles' },
  { id: 91, label: 'P91', desc: 'Gan. P76 vs Gan. P78', fecha: '5 Jul', sede: 'Miami' },
  { id: 92, label: 'P92', desc: 'Gan. P79 vs Gan. P80', fecha: '5 Jul', sede: 'Atlanta' },
  { id: 93, label: 'P93', desc: 'Gan. P83 vs Gan. P84', fecha: '6 Jul', sede: 'Kansas City' },
  { id: 94, label: 'P94', desc: 'Gan. P81 vs Gan. P82', fecha: '6 Jul', sede: 'Seattle' },
  { id: 95, label: 'P95', desc: 'Gan. P86 vs Gan. P88', fecha: '7 Jul', sede: 'Boston' },
  { id: 96, label: 'P96', desc: 'Gan. P85 vs Gan. P87', fecha: '7 Jul', sede: 'Vancouver' },
];

const cuartos = [
  { id: 97, label: 'P97', desc: 'Gan. P89 vs Gan. P90', fecha: '9 Jul', sede: 'Boston' },
  { id: 98, label: 'P98', desc: 'Gan. P93 vs Gan. P94', fecha: '10 Jul', sede: 'Los Ángeles' },
  { id: 99, label: 'P99', desc: 'Gan. P91 vs Gan. P92', fecha: '11 Jul', sede: 'Miami' },
  { id: 100, label: 'P100', desc: 'Gan. P95 vs Gan. P96', fecha: '11 Jul', sede: 'Kansas City' },
];

const semis = [
  { id: 101, label: 'P101', desc: 'Gan. P97 vs Gan. P98', fecha: '14 Jul', sede: 'Dallas' },
  { id: 102, label: 'P102', desc: 'Gan. P99 vs Gan. P100', fecha: '15 Jul', sede: 'Atlanta' },
];

const tercerPuesto = { id: 103, label: 'P103', desc: 'Per. P101 vs Per. P102', fecha: '18 Jul', sede: 'Miami' };
const final = { id: 104, label: 'P104', desc: 'Gan. P101 vs Gan. P102', fecha: '19 Jul', sede: 'Nueva York' };

function PartidoCard({ partido, resultados, setResultados, tema, oscuro }) {
  const [editando, setEditando] = useState(false);
  const res = resultados[partido.id] || {};
  const jugado = res.local && res.visita && res.golesLocal !== undefined && res.golesVisita !== undefined && res.golesLocal !== '' && res.golesVisita !== '';

  const necesitaTercero = gruposValidosTercero[partido.id];

  const actualizar = (campo, valor) => {
    setResultados(prev => ({
      ...prev,
      [partido.id]: { ...prev[partido.id], [campo]: valor }
    }));
  };

  let opcionesTercero = [];
  if (necesitaTercero) {
    const todosLosTerceros = getTercerosDisponibles(resultados);
    const usadosEnOtrosPartidos = Object.entries(resultados)
      .filter(([id]) => gruposValidosTercero[id] && parseInt(id) !== partido.id)
      .map(([, r]) => r.visita)
      .filter(Boolean);

    opcionesTercero = todosLosTerceros.filter(t =>
      necesitaTercero.includes(t.grupo) &&
      (!usadosEnOtrosPartidos.includes(t.nombre) || t.nombre === res.visita)
    );
  }

  return (
    <div style={{
        background: imagenesEstadios[partido.sede] 
        ? `url(${imagenesEstadios[partido.sede]}) center/cover no-repeat`
        : tema.tarjeta,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '10px',
        boxShadow: tema.sombra,
        padding: '10px',
        minWidth: '180px',
        maxWidth: '200px',
        transition: 'all 0.3s',
        border: jugado ? `2px solid ${tema.puntaje}` : `2px solid ${tema.borde}`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: oscuro ? 'rgba(0,0,0,0.82)' : 'rgba(0,0,0,0.65)',
          zIndex: 0,
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ fontSize: '0.7rem', color: tema.puntaje, fontWeight: 'bold', marginBottom: '4px' }}>
        {partido.label}
      </div>
      <div style={{ fontSize: '0.7rem', color: tema.subtexto, marginBottom: '6px' }}>
         📅 {horariosPartidos[partido.id] ? formatearHoraLocal(horariosPartidos[partido.id]) : partido.fecha} · 📍 {partido.sede}
         </div>

      {editando ? (
        <div>
          <input placeholder="Equipo local" value={res.local || ''} onChange={e => actualizar('local', e.target.value)}
            style={{ width: '100%', marginBottom: '4px', padding: '4px', borderRadius: '4px', border: `1px solid ${tema.borde}`, background: tema.fondo, color: tema.texto, fontSize: '0.8rem', boxSizing: 'border-box' }} />
          {/* Goles 90 min */}
<div style={{ fontSize: '0.65rem', color: tema.subtexto, textAlign: 'center', marginBottom: '2px' }}>90 min</div>
<div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginBottom: '4px' }}>
  <input type="number" min="0" max="20" placeholder="0" value={res.golesLocal ?? ''} onChange={e => actualizar('golesLocal', e.target.value)}
    style={{ width: '45px', padding: '4px', borderRadius: '4px', border: `1px solid ${tema.borde}`, background: tema.fondo, color: tema.texto, textAlign: 'center' }} />
  <span style={{ color: tema.texto, fontWeight: 'bold' }}>-</span>
  <input type="number" min="0" max="20" placeholder="0" value={res.golesVisita ?? ''} onChange={e => actualizar('golesVisita', e.target.value)}
    style={{ width: '45px', padding: '4px', borderRadius: '4px', border: `1px solid ${tema.borde}`, background: tema.fondo, color: tema.texto, textAlign: 'center' }} />
</div>

{/* Alargue — solo si empate en 90 */}
{res.golesLocal !== '' && res.golesVisita !== '' && res.golesLocal !== undefined && parseInt(res.golesLocal) === parseInt(res.golesVisita) && (
  <>
    <div style={{ fontSize: '0.65rem', color: tema.subtexto, textAlign: 'center', marginBottom: '2px' }}>Alargue</div>
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginBottom: '4px' }}>
      <input type="number" min="0" max="20" placeholder="0" value={res.golesLocalAlargue ?? ''} onChange={e => actualizar('golesLocalAlargue', e.target.value)}
        style={{ width: '45px', padding: '4px', borderRadius: '4px', border: `1px solid ${tema.borde}`, background: tema.fondo, color: tema.texto, textAlign: 'center' }} />
      <span style={{ color: tema.texto, fontWeight: 'bold' }}>-</span>
      <input type="number" min="0" max="20" placeholder="0" value={res.golesVisitaAlargue ?? ''} onChange={e => actualizar('golesVisitaAlargue', e.target.value)}
        style={{ width: '45px', padding: '4px', borderRadius: '4px', border: `1px solid ${tema.borde}`, background: tema.fondo, color: tema.texto, textAlign: 'center' }} />
    </div>
  </>
)}

{/* Penales — solo si empate en alargue */}
{res.golesLocalAlargue !== '' && res.golesVisitaAlargue !== '' && res.golesLocalAlargue !== undefined && parseInt(res.golesLocalAlargue) === parseInt(res.golesVisitaAlargue) && (
  <>
    <div style={{ fontSize: '0.65rem', color: tema.subtexto, textAlign: 'center', marginBottom: '2px' }}>Penales</div>
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginBottom: '4px' }}>
      <input type="number" min="0" max="20" placeholder="0" value={res.penalesLocal ?? ''} onChange={e => actualizar('penalesLocal', e.target.value)}
        style={{ width: '45px', padding: '4px', borderRadius: '4px', border: `1px solid ${tema.borde}`, background: tema.fondo, color: tema.texto, textAlign: 'center' }} />
      <span style={{ color: tema.texto, fontWeight: 'bold' }}>-</span>
      <input type="number" min="0" max="20" placeholder="0" value={res.penalesVisita ?? ''} onChange={e => actualizar('penalesVisita', e.target.value)}
        style={{ width: '45px', padding: '4px', borderRadius: '4px', border: `1px solid ${tema.borde}`, background: tema.fondo, color: tema.texto, textAlign: 'center' }} />
    </div>
  </>
)}
          {necesitaTercero ? (
            <select value={res.visita || ''} onChange={e => actualizar('visita', e.target.value)}
              style={{ width: '100%', marginBottom: '6px', padding: '4px', borderRadius: '4px', border: `1px solid ${tema.borde}`, background: tema.fondo, color: tema.texto, fontSize: '0.75rem', boxSizing: 'border-box' }}>
              <option value="">-- 3º {necesitaTercero.join('/')} --</option>
              {opcionesTercero.map(t => (
                <option key={t.nombre} value={t.nombre}>
                  {getBandera(t.nombre)} {getAbrev(t.nombre)} ({t.pts}pts)
                </option>
              ))}
            </select>
          ) : (
            <input placeholder="Equipo visita" value={res.visita || ''} onChange={e => actualizar('visita', e.target.value)}
              style={{ width: '100%', marginBottom: '6px', padding: '4px', borderRadius: '4px', border: `1px solid ${tema.borde}`, background: tema.fondo, color: tema.texto, fontSize: '0.8rem', boxSizing: 'border-box' }} />
          )}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '6px 0' }}>
          <div style={{ fontWeight: 'bold', color: 'white', fontSize: res.local ? '0.85rem' : '0.65rem', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
            {res.local || partido.desc.split(' vs ')[0]}
          </div>
          <div style={{ color: jugado ? '#4fc3f7' : 'rgba(255,255,255,0.6)', fontWeight: 'bold', fontSize: '1.1rem', margin: '2px 0' }}>
            {jugado ? `${res.golesLocal} - ${res.golesVisita}` : 'vs'}
          </div>
          <div style={{ fontWeight: 'bold', color: 'white', fontSize: res.visita ? '0.85rem' : '0.65rem', textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}>
            {res.visita || partido.desc.split(' vs ')[1]}
          </div>
        </div>
      )}

      <div style={{ fontSize: '0.7rem', color: tema.subtexto, marginBottom: '6px', textAlign: 'center' }}>
        {partido.desc}
      </div>

      <button onClick={() => setEditando(!editando)} style={{
        width: '100%', padding: '4px', fontSize: '0.75rem',
        background: editando ? tema.primario : tema.botonInactivo,
        color: editando ? 'white' : tema.textoInactivo,
        border: 'none', borderRadius: '6px', cursor: 'pointer',
        transition: 'all 0.3s'
      }}>
        {editando ? '✅ Listo' : '✏️ Editar'}
      </button>
      </div>
    </div>
  );
}

function Ronda({ titulo, partidos, resultados, setResultados, tema, oscuro }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{ color: tema.puntaje, textAlign: 'center', marginBottom: '16px', letterSpacing: '1px' }}>
        {titulo}
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
        {partidos.map(p => (
          <PartidoCard key={p.id} partido={p} resultados={resultados} setResultados={setResultados} tema={tema} oscuro={oscuro} />
        ))}
      </div>
    </div>
  );
}

function Eliminatoria({ resultados, setResultados, oscuro }) {
    const tema = useContext(TemaContext);
    const { t } = useContext(IdiomaContext);

  return (
    <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto' }}>
      <h2 style={{ color: tema.primario, textAlign: 'center', fontSize: '1.5rem', marginBottom: '8px' }}>
        {t.eliminatoria.titulo}
      </h2>
      <p style={{ textAlign: 'center', color: tema.subtexto, fontSize: '0.85rem', marginBottom: '32px' }}>
        {t.eliminatoria.subtitulo}
      </p>

      {/* Copa del Mundo centrada */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
      <img src={oscuro ? "/copa-oscuro.png" : "/copa-claro.png"} alt="Copa Mundial" style={{ width: '120px', height: '120px', objectFit: 'contain', opacity: 0.9 }} />
        <div style={{ color: tema.puntaje, fontWeight: 'bold', fontSize: '1rem', marginTop: '8px', letterSpacing: '2px' }}>
          {t.eliminatoria.copaTitulo}
        </div>
      </div>

      <Ronda titulo={t.eliminatoria.dieciseisavos} partidos={dieciseisavos} resultados={resultados} setResultados={setResultados} tema={tema} />
      <Ronda titulo={t.eliminatoria.octavos} partidos={octavos} resultados={resultados} setResultados={setResultados} tema={tema} />
      <Ronda titulo={t.eliminatoria.cuartos} partidos={cuartos} resultados={resultados} setResultados={setResultados} tema={tema} />
      <Ronda titulo={t.eliminatoria.semis} partidos={semis} resultados={resultados} setResultados={setResultados} tema={tema} />

      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
        <div>
          <h3 style={{ color: tema.subtexto, textAlign: 'center', marginBottom: '16px' }}>{t.eliminatoria.tercero}</h3>
          <PartidoCard partido={tercerPuesto} resultados={resultados} setResultados={setResultados} tema={tema} />
        </div>
        <div>
          <h3 style={{ color: '#FFD700', textAlign: 'center', marginBottom: '16px' }}>{t.eliminatoria.final}</h3>
          <PartidoCard partido={final} resultados={resultados} setResultados={setResultados} tema={tema} />
        </div>
      </div>
    </div>
  );
}

export default Eliminatoria;