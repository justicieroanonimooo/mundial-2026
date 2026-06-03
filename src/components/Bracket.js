import React, { useContext, useRef } from 'react';
import { TemaContext, IdiomaContext } from '../App';

const estructura = {
  izquierda: [
    { ronda: '16avos', partidos: [73, 74, 75, 76, 77, 78, 79, 80] },
    { ronda: 'Octavos', partidos: [89, 90, 91, 92] },
    { ronda: 'Cuartos', partidos: [97, 98] },
    { ronda: 'Semifinal', partidos: [101] },
  ],
  derecha: [
    { ronda: '16avos', partidos: [81, 82, 83, 84, 85, 86, 87, 88] },
    { ronda: 'Octavos', partidos: [93, 94, 95, 96] },
    { ronda: 'Cuartos', partidos: [99, 100] },
    { ronda: 'Semifinal', partidos: [102] },
  ],
};

const infoPartidos = {
  73: { desc: '2º A vs 2º B' }, 74: { desc: '1º E vs 3º' },
  75: { desc: '1º F vs 2º C' }, 76: { desc: '1º C vs 2º F' },
  77: { desc: '1º I vs 3º' }, 78: { desc: '2º E vs 2º I' },
  79: { desc: '1º A vs 3º' }, 80: { desc: '1º L vs 3º' },
  81: { desc: '1º D vs 3º' }, 82: { desc: '1º G vs 3º' },
  83: { desc: '2º K vs 2º L' }, 84: { desc: '1º H vs 2º J' },
  85: { desc: '1º B vs 3º' }, 86: { desc: '1º J vs 2º H' },
  87: { desc: '1º K vs 3º' }, 88: { desc: '2º D vs 2º G' },
  89: { desc: 'Gan. 74 vs Gan. 77' }, 90: { desc: 'Gan. 73 vs Gan. 75' },
  91: { desc: 'Gan. 76 vs Gan. 78' }, 92: { desc: 'Gan. 79 vs Gan. 80' },
  93: { desc: 'Gan. 83 vs Gan. 84' }, 94: { desc: 'Gan. 81 vs Gan. 82' },
  95: { desc: 'Gan. 86 vs Gan. 88' }, 96: { desc: 'Gan. 85 vs Gan. 87' },
  97: { desc: 'Gan. 89 vs Gan. 90' }, 98: { desc: 'Gan. 93 vs Gan. 94' },
  99: { desc: 'Gan. 91 vs Gan. 92' }, 100: { desc: 'Gan. 95 vs Gan. 96' },
  101: { desc: 'Gan. 97 vs Gan. 98' }, 102: { desc: 'Gan. 99 vs Gan. 100' },
  103: { desc: '3er Puesto' }, 104: { desc: 'FINAL' },
};

function PartidoBracket({ id, resultados, tema, espejo }) {
  const res = resultados[id] || {};
  const jugado = res.local && res.visita && res.golesLocal !== '' && res.golesLocal !== undefined;

  return (
    <div style={{
      background: tema.tarjeta,
      border: `1px solid ${jugado ? tema.puntaje : tema.borde}`,
      borderRadius: '8px',
      padding: '6px 8px',
      minWidth: '130px',
      maxWidth: '150px',
      margin: '4px 0',
      transition: 'all 0.3s',
    }}>
      <div style={{ fontSize: '0.6rem', color: tema.puntaje, fontWeight: 'bold', marginBottom: '2px', textAlign: espejo ? 'right' : 'left' }}>
        P{id}
      </div>
      <div style={{ display: 'flex', justifyContent: espejo ? 'flex-end' : 'flex-start', alignItems: 'center', gap: '4px' }}>
        {espejo ? (
          <>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: jugado ? tema.puntaje : tema.subtexto }}>
              {jugado ? `${res.golesLocal}-${res.golesVisita}` : 'vs'}
            </span>
            <div>
              <div style={{ fontSize: '0.75rem', color: tema.texto, fontWeight: 'bold', textAlign: 'right' }}>{res.local || '?'}</div>
              <div style={{ fontSize: '0.75rem', color: tema.texto, textAlign: 'right' }}>{res.visita || '?'}</div>
            </div>
          </>
        ) : (
          <>
            <div>
              <div style={{ fontSize: '0.75rem', color: tema.texto, fontWeight: 'bold' }}>{res.local || '?'}</div>
              <div style={{ fontSize: '0.75rem', color: tema.texto }}>{res.visita || '?'}</div>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: jugado ? tema.puntaje : tema.subtexto }}>
              {jugado ? `${res.golesLocal}-${res.golesVisita}` : 'vs'}
            </span>
          </>
        )}
      </div>
      <div style={{ fontSize: '0.55rem', color: tema.subtexto, marginTop: '2px', textAlign: espejo ? 'right' : 'left' }}>
        {infoPartidos[id]?.desc}
      </div>
    </div>
  );
}

function ColumnaRonda({ ronda, partidos, resultados, tema, espejo }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: espejo ? 'flex-end' : 'flex-start', minWidth: '160px' }}>
      <div style={{
        fontSize: '0.7rem', fontWeight: 'bold', color: tema.puntaje,
        textAlign: 'center', width: '100%', marginBottom: '8px',
        padding: '4px', background: tema.botonInactivo, borderRadius: '6px',
        letterSpacing: '1px'
      }}>
        {ronda}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', flex: 1, width: '100%' }}>
        {partidos.map(id => (
          <PartidoBracket key={id} id={id} resultados={resultados} tema={tema} espejo={espejo} />
        ))}
      </div>
    </div>
  );
}

function Bracket({ resultados, setResultados }) {
    const tema = useContext(TemaContext);
    const { t } = useContext(IdiomaContext);
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ color: tema.primario, textAlign: 'center', marginBottom: '8px' }}>{t.bracket.titulo}</h2>
      <p style={{ textAlign: 'center', color: tema.subtexto, fontSize: '0.8rem', marginBottom: '20px' }}>
        {t.bracket.subtitulo}
      </p>

      {/* Botones navegación */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
        <button onClick={() => scroll(-1)} style={{
          padding: '8px 20px', background: tema.primario, color: 'white',
          border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '1.2rem'
        }}>◀</button>
        <button onClick={() => scroll(1)} style={{
          padding: '8px 20px', background: tema.primario, color: 'white',
          border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '1.2rem'
        }}>▶</button>
      </div>

      {/* Bracket scrolleable */}
      <div ref={scrollRef} style={{
        overflowX: 'auto', display: 'flex', alignItems: 'center',
        gap: '8px', padding: '16px',
        background: tema.tarjeta, borderRadius: '16px',
        boxShadow: tema.sombra,
      }}>

        {/* Lado izquierdo */}
        {estructura.izquierda.map((col, i) => (
          <ColumnaRonda key={i} ronda={t.bracket[col.ronda.toLowerCase()] || col.ronda} partidos={col.partidos} resultados={resultados} tema={tema} espejo={false} />
        ))}

        {/* Centro — Copa */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '120px', padding: '0 8px' }}>
          <div style={{ fontSize: '4rem' }}>🏆</div>
          <div style={{ fontSize: '0.6rem', color: tema.puntaje, fontWeight: 'bold', textAlign: 'center', letterSpacing: '1px', marginTop: '4px' }}>
            FINAL
          </div>
          <PartidoBracket id={104} resultados={resultados} tema={tema} espejo={false} />
          <div style={{ fontSize: '0.6rem', color: tema.subtexto, marginTop: '8px', textAlign: 'center' }}>
            19 Jul · Nueva York
          </div>
          <div style={{ marginTop: '16px', fontSize: '0.6rem', color: tema.subtexto, textAlign: 'center' }}>
            {t.bracket.tercero}
          </div>
          <PartidoBracket id={103} resultados={resultados} tema={tema} espejo={false} />
          <div style={{ fontSize: '0.6rem', color: tema.subtexto, marginTop: '4px', textAlign: 'center' }}>
            18 Jul · Miami
          </div>
        </div>

        {/* Lado derecho (espejo) */}
        {[...estructura.derecha].reverse().map((col, i) => (
          <ColumnaRonda key={i} ronda={t.bracket[col.ronda.toLowerCase()] || col.ronda} partidos={col.partidos} resultados={resultados} tema={tema} espejo={true} />
        ))}
      </div>
    </div>
  );
}

export default Bracket;