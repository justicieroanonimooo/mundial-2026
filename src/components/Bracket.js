import React, { useContext, useRef } from 'react';
import { TemaContext, IdiomaContext } from '../App';

// eslint-disable-next-line no-unused-vars
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

const CARD_HEIGHT = 80;
const CARD_WIDTH = 160;
const RONDA_WIDTH = 180;
const V_GAP_BASE = 20;

// Estructura izquierda y derecha
const izquierda = [
  [73, 74, 75, 76, 77, 78, 79, 80],
  [90, 89, 91, 92],
  [97, 98],
  [101],
];

const derecha = [
  [81, 82, 83, 84, 85, 86, 87, 88],
  [94, 93, 95, 96],
  [98, 100],
  [102],
];

function calcularPosiciones(rondas) {
  // Para cada ronda calcula la posición Y centrada entre sus "padres"
  const posiciones = [];

  // Primera ronda: posiciones equidistantes
  const primeraRonda = rondas[0];
  const primeraPosY = primeraRonda.map((_, i) => i * (CARD_HEIGHT + V_GAP_BASE));
  posiciones.push(primeraPosY);

  // Rondas siguientes: centradas entre pares
  for (let r = 1; r < rondas.length; r++) {
    const prevPos = posiciones[r - 1];
    const nuevaPos = [];
    for (let i = 0; i < rondas[r].length; i++) {
      const top = prevPos[i * 2];
      const bottom = prevPos[i * 2 + 1];
      nuevaPos.push((top + bottom) / 2);
    }
    posiciones.push(nuevaPos);
  }

  return posiciones;
}

function PartidoBracket({ id, resultados, tema, x, y }) {
  const res = resultados[id] || {};
  const jugado = res.local && res.visita && res.golesLocal !== '' && res.golesLocal !== undefined;

  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Fondo tarjeta */}
      <rect
        width={CARD_WIDTH} height={CARD_HEIGHT}
        rx="8" ry="8"
        fill={tema.tarjeta}
        stroke={jugado ? tema.puntaje : tema.borde}
        strokeWidth="1.5"
      />
      {/* ID partido */}
      <text x="8" y="14" fontSize="9" fill={tema.puntaje} fontWeight="bold">P{id}</text>
      {/* Línea divisoria */}
      <line x1="0" y1={CARD_HEIGHT / 2} x2={CARD_WIDTH} y2={CARD_HEIGHT / 2} stroke={tema.borde} strokeWidth="1" />
      {/* Equipo local */}
      <text x="8" y="34" fontSize="11" fill={tema.texto} fontWeight="bold">
        {(res.local || '?').substring(0, 16)}
      </text>
      {/* Goles local */}
      {jugado && <text x={CARD_WIDTH - 10} y="34" fontSize="11" fill={tema.puntaje} fontWeight="bold" textAnchor="end">{res.golesLocal}</text>}
      {/* Equipo visita */}
      <text x="8" y="64" fontSize="11" fill={tema.texto}>
        {(res.visita || '?').substring(0, 16)}
      </text>
      {/* Goles visita */}
      {jugado && <text x={CARD_WIDTH - 10} y="64" fontSize="11" fill={tema.puntaje} fontWeight="bold" textAnchor="end">{res.golesVisita}</text>}
    </g>
  );
}

function BracketLado({ rondas, posiciones, resultados, tema, offsetX, espejo }) {
  const elementos = [];

  rondas.forEach((ronda, rondaIdx) => {
    const x = espejo
      ? offsetX - (rondaIdx + 1) * RONDA_WIDTH
      : offsetX + rondaIdx * RONDA_WIDTH;

    ronda.forEach((id, partidoIdx) => {
      const y = posiciones[rondaIdx][partidoIdx];

      // Tarjeta
      elementos.push(
        <PartidoBracket
          key={`card-${id}`}
          id={id}
          resultados={resultados}
          tema={tema}
          x={x}
          y={y}
        />
      );

      // Línea conectora hacia siguiente ronda
      if (rondaIdx < rondas.length - 1) {
        const nextIdx = Math.floor(partidoIdx / 2);
        const nextY = posiciones[rondaIdx + 1][nextIdx];
        const nextX = espejo
          ? offsetX - (rondaIdx + 2) * RONDA_WIDTH
          : offsetX + (rondaIdx + 1) * RONDA_WIDTH;

        const salida = espejo ? x : x + CARD_WIDTH;
        const entrada = espejo ? nextX + CARD_WIDTH : nextX;
        const midCardY = y + CARD_HEIGHT / 2;
        const midNextY = nextY + CARD_HEIGHT / 2;
        const midX = (salida + entrada) / 2;

        elementos.push(
          <path
            key={`line-${id}`}
            d={`M ${salida} ${midCardY} H ${midX} V ${midNextY} H ${entrada}`}
            fill="none"
            stroke={tema.puntaje}
            strokeWidth="1.5"
            opacity="0.6"
          />
        );
      }
    });
  });

  return <>{elementos}</>;
}

function Bracket({ resultados, oscuro }) {
    const tema = useContext(TemaContext);
    const { t } = useContext(IdiomaContext);
  const scrollRef = useRef(null);

  const posIzq = calcularPosiciones(izquierda);
  const posDer = calcularPosiciones(derecha);

  const alturaTotal = izquierda[0].length * (CARD_HEIGHT + V_GAP_BASE) + 40;
  const anchoTotal = (izquierda.length + derecha.length) * RONDA_WIDTH + CARD_WIDTH + 200;
  const centroX = anchoTotal / 2;

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' });
    }
  };

  // Etiquetas de rondas
  const rondasIzq = [t.bracket.dieciseisavos, t.bracket.octavos, t.bracket.cuartos, t.bracket.semis];
  const rondasDer = [t.bracket.dieciseisavos, t.bracket.octavos, t.bracket.cuartos, t.bracket.semis];

  return (
    <div style={{ padding: '20px', maxWidth: '100%', margin: '0 auto' }}>
      <h2 style={{ color: tema.primario, textAlign: 'center', marginBottom: '8px' }}>{t.bracket.titulo}</h2>
      <p style={{ textAlign: 'center', color: tema.subtexto, fontSize: '0.8rem', marginBottom: '16px' }}>
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

      {/* Bracket SVG scrolleable */}
      <div ref={scrollRef} style={{
        overflowX: 'auto',
        borderRadius: '16px',
        boxShadow: tema.sombra,
        position: 'relative',
      }}>
        {/* Fondo estadio */}
        <img src="/estadio.jpg" alt="" style={{
          position: 'absolute',
          top: 0, left: 0,
          width: `${anchoTotal}px`,
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0.15,
          borderRadius: '16px',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', padding: '20px' }}>
        <svg width={anchoTotal} height={alturaTotal + 60}>

          {/* Etiquetas rondas izquierda */}
          {rondasIzq.map((label, i) => (
            <text
              key={`liq-${i}`}
              x={i * RONDA_WIDTH + CARD_WIDTH / 2}
              y="16"
              fontSize="10"
              fill={tema.puntaje}
              fontWeight="bold"
              textAnchor="middle"
            >
              {label}
            </text>
          ))}

          {/* Etiquetas rondas derecha */}
          {rondasDer.map((label, i) => (
            <text
              key={`ldr-${i}`}
              x={centroX + 120 + (3 - i) * RONDA_WIDTH + CARD_WIDTH / 2}
              y="16"
              fontSize="10"
              fill={tema.puntaje}
              fontWeight="bold"
              textAnchor="middle"
            >
              {label}
            </text>
          ))}

          {/* Lado izquierdo */}
          <g transform="translate(0, 30)">
            <BracketLado
              rondas={izquierda}
              posiciones={posIzq}
              resultados={resultados}
              tema={tema}
              offsetX={0}
              espejo={false}
            />
          </g>

          {/* Centro — Copa y Final */}
          <g transform={`translate(${centroX - CARD_WIDTH / 2}, ${alturaTotal / 2 - 60})`}>
          <image href={oscuro ? "/copa-oscuro.png" : "/copa-claro.png"} x={CARD_WIDTH / 2 - 180} y="-370" width="360" height="360" opacity="0.85" />
            <text x={CARD_WIDTH / 2} y="10" fontSize="10" fill={tema.puntaje} fontWeight="bold" textAnchor="middle">
              {t.bracket.final}
            </text>
            <rect width={CARD_WIDTH} height={CARD_HEIGHT} rx="8" fill={tema.tarjeta} stroke="#FFD700" strokeWidth="2" y="20" />
            <text x="8" y="38" fontSize="9" fill="#FFD700" fontWeight="bold">P104</text>
            <line x1="0" y1={CARD_HEIGHT / 2 + 20} x2={CARD_WIDTH} y2={CARD_HEIGHT / 2 + 20} stroke={tema.borde} strokeWidth="1" />
            <text x="8" y="54" fontSize="11" fill={tema.texto} fontWeight="bold">?</text>
            <text x="8" y="84" fontSize="11" fill={tema.texto}>?</text>

            {/* 3er puesto */}
            <text x={CARD_WIDTH / 2} y="130" fontSize="10" fill={tema.subtexto} textAnchor="middle">
              {t.bracket.tercero}
            </text>
            <rect width={CARD_WIDTH} height={CARD_HEIGHT} rx="8" fill={tema.tarjeta} stroke={tema.borde} strokeWidth="1.5" y="140" />
            <text x="8" y="158" fontSize="9" fill={tema.puntaje} fontWeight="bold">P103</text>
            <line x1="0" y1={CARD_HEIGHT / 2 + 140} x2={CARD_WIDTH} y2={CARD_HEIGHT / 2 + 140} stroke={tema.borde} strokeWidth="1" />
            <text x="8" y="174" fontSize="11" fill={tema.texto} fontWeight="bold">?</text>
            <text x="8" y="204" fontSize="11" fill={tema.texto}>?</text>
          </g>

          {/* Lado derecho */}
          <g transform="translate(0, 30)">
            <BracketLado
              rondas={derecha}
              posiciones={posDer}
              resultados={resultados}
              tema={tema}
              offsetX={centroX + 120 + (derecha.length - 1) * RONDA_WIDTH + CARD_WIDTH}
              espejo={true}
            />
          </g>

        </svg>
        </div>
      </div>
    </div>
  );
}

export default Bracket;