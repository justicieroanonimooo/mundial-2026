import React, { useContext, useRef } from 'react';
import { TemaContext, IdiomaContext } from '../App';

function getAbrevBracket(nombre) {
  const mapa = {
    'México': 'MEX', 'Argentina': 'ARG', 'España': 'ESP',
    'Brasil': 'BRA', 'Francia': 'FRA', 'Inglaterra': 'ENG',
    'Alemania': 'GER', 'Portugal': 'POR', 'Países Bajos': 'NED',
    'Uruguay': 'URU', 'Colombia': 'COL', 'Croacia': 'CRO',
    'Senegal': 'SEN', 'Marruecos': 'MAR', 'Japón': 'JPN',
    'Corea del Sur': 'KOR', 'Australia': 'AUS', 'Estados Unidos': 'USA',
    'Canadá': 'CAN', 'Ecuador': 'ECU', 'Suiza': 'SUI',
    'Bélgica': 'BEL', 'Turquía': 'TUR', 'Arabia Saudí': 'KSA',
    'Ghana': 'GHA', 'Túnez': 'TUN', 'Suecia': 'SWE',
    'Noruega': 'NOR', 'Austria': 'AUT', 'Paraguay': 'PAR',
    'Irán': 'IRN', 'Irak': 'IRQ', 'Nueva Zelanda': 'NZL',
    'Escocia': 'SCO', 'Haití': 'HAI', 'Sudáfrica': 'RSA',
    'República Checa': 'CZE', 'Bosnia y Herzegovina': 'BIH',
    'Catar': 'QAT', 'Costa de Marfil': 'CIV', 'Curazao': 'CUW',
    'Cabo Verde': 'CPV', 'Argelia': 'ALG', 'Jordania': 'JOR',
    'R.D. del Congo': 'COD', 'Uzbekistán': 'UZB', 'Panamá': 'PAN',
    'Egipto': 'EGY',
  };
  return mapa[nombre] || nombre.substring(0, 3).toUpperCase();
}

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

const CARD_HEIGHT = 100;
const CARD_WIDTH = 200;
const RONDA_WIDTH = 210;
const V_GAP_BASE = 60;

const izquierda = [
  [73, 75, 74, 77, 76, 78, 79, 80],
  [90, 89, 91, 92],
  [97, 99],
  [101],
];

const derecha = [
  [81, 82, 83, 84, 86, 88, 85, 87],
  [93, 94, 95, 96],
  [98, 100],
  [102],
];

function calcularPosiciones(rondas) {
  const posiciones = [];
  const primeraPosY = rondas[0].map((_, i) => i * (CARD_HEIGHT + V_GAP_BASE));
  posiciones.push(primeraPosY);
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

function PartidoBracket({ id, resultados, tema, x, y, espejo, oscuro }) {
  const res = resultados[id] || {};
  const jugado = res.local && res.visita && res.golesLocal !== '' && res.golesLocal !== undefined;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <defs>
        <clipPath id={`clipLeft${id}`}>
          <rect x="0" y="0" width={CARD_WIDTH/2} height={CARD_HEIGHT} rx="8" />
        </clipPath>
        <clipPath id={`clipRight${id}`}>
          <rect x={CARD_WIDTH/2} y="0" width={CARD_WIDTH/2} height={CARD_HEIGHT} rx="8" />
        </clipPath>
      </defs>
      <rect width={CARD_WIDTH} height={CARD_HEIGHT} rx="8" ry="8" fill={tema.tarjeta} stroke={jugado ? tema.puntaje : tema.borde} strokeWidth="1.5" />
      {res.local && <rect x="0" y="0" width={CARD_WIDTH/2} height={CARD_HEIGHT} fill="white" opacity="0.15" clipPath={`url(#clipLeft${id})`} />}
      {res.local && <image href={`/escudos/${getAbrevBracket(res.local)}.png`} x="0" y="0" width={CARD_WIDTH/2} height={CARD_HEIGHT} opacity="0.35" preserveAspectRatio="xMidYMid meet" clipPath={`url(#clipLeft${id})`} />}
      {res.visita && <rect x={CARD_WIDTH/2} y="0" width={CARD_WIDTH/2} height={CARD_HEIGHT} fill="white" opacity="0.15" clipPath={`url(#clipRight${id})`} />}
      {res.visita && <image href={`/escudos/${getAbrevBracket(res.visita)}.png`} x={CARD_WIDTH/2} y="0" width={CARD_WIDTH/2} height={CARD_HEIGHT} opacity="0.35" preserveAspectRatio="xMidYMid meet" clipPath={`url(#clipRight${id})`} />}

      {/* Nombre local - izquierda arriba */}
      <text x={CARD_WIDTH/4} y="28" fontSize={res.local ? "11" : "8"} fill={oscuro ? "white" : "#111"} fontWeight="bold" textAnchor="middle">
        {(res.local || infoPartidos[id]?.desc.split(' vs ')[0] || '?').substring(0, 10)}
      </text>

      {/* Nombre visita - derecha arriba */}
      <text x={CARD_WIDTH * 3/4} y="28" fontSize={res.visita ? "11" : "8"} fill={oscuro ? "white" : "#111"} fontWeight="bold" textAnchor="middle">
        {(res.visita || infoPartidos[id]?.desc.split(' vs ')[1] || '?').substring(0, 10)}
      </text>

      {/* Línea divisoria */}
      <line x1="0" y1={CARD_HEIGHT * 0.55} x2={CARD_WIDTH} y2={CARD_HEIGHT * 0.55} stroke={tema.borde} strokeWidth="1" />

      {/* Resultado local - abajo izquierda */}
      <text x={CARD_WIDTH * 0.28} y={CARD_HEIGHT * 0.82} fontSize="13" fill={oscuro ? "white" : "#111"} fontWeight="bold" textAnchor="middle">
        {jugado ? (res.penalesLocal !== undefined && res.penalesLocal !== '' ? `(${res.penalesLocal}) ${res.golesLocal}` : res.golesLocal) : ''}
      </text>

      {/* Guion central */}
      <text x={CARD_WIDTH/2} y={CARD_HEIGHT * 0.82} fontSize="13" fill={oscuro ? "white" : "#111"} fontWeight="bold" textAnchor="middle">
        {jugado ? '-' : 'vs'}
      </text>

      {/* Resultado visita - abajo derecha */}
      <text x={CARD_WIDTH * 0.76} y={CARD_HEIGHT * 0.82} fontSize="13" fill={oscuro ? "white" : "#111"} fontWeight="bold" textAnchor="middle">
        {jugado ? (res.penalesVisita !== undefined && res.penalesVisita !== '' ? `${res.golesVisita} (${res.penalesVisita})` : res.golesVisita) : ''}
      </text>

      {/* ID partido */}
      <text x={CARD_WIDTH/2} y="12" fontSize="8" fill={tema.puntaje} fontWeight="bold" textAnchor="middle">P{id}</text>
    </g>
  );
}

function BracketLado({ rondas, posiciones, resultados, tema, offsetX, espejo, oscuro }) {
  const elementos = [];

  rondas.forEach((ronda, rondaIdx) => {
    const x = espejo
      ? offsetX - (rondaIdx + 1) * RONDA_WIDTH
      : offsetX + rondaIdx * RONDA_WIDTH;

    ronda.forEach((id, partidoIdx) => {
      const y = posiciones[rondaIdx][partidoIdx];

      elementos.push(
        <PartidoBracket key={`card-${id}`} id={id} resultados={resultados} tema={tema} x={x} y={y} espejo={espejo} oscuro={oscuro} />
      );

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
          <path key={`line-${id}`} d={`M ${salida} ${midCardY} H ${midX} V ${midNextY} H ${entrada}`}
            fill="none" stroke={tema.puntaje} strokeWidth="1.5" opacity="0.6" />
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
  const anchoTotal = 2048;
  const centroX = 1024;

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '100%', margin: '0 auto' }}>
      <h2 style={{ color: tema.primario, textAlign: 'center', marginBottom: '8px' }}>{t.bracket.titulo}</h2>
      <p style={{ textAlign: 'center', color: tema.subtexto, fontSize: '0.8rem', marginBottom: '16px' }}>
        {t.bracket.subtitulo}
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
        <button onClick={() => scroll(-1)} style={{ padding: '8px 20px', background: tema.primario, color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '1.2rem' }}>◀</button>
        <button onClick={() => scroll(1)} style={{ padding: '8px 20px', background: tema.primario, color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '1.2rem' }}>▶</button>
      </div>

      <div ref={scrollRef} style={{ overflowX: 'auto', borderRadius: '16px', boxShadow: tema.sombra, position: 'relative' }}>
        <img src="/estadio.jpg" alt="" style={{
          position: 'absolute', top: 0, left: 0,
          width: `${anchoTotal}px`, height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          opacity: 0.15, borderRadius: '16px', pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', padding: '20px' }}>
          <svg width={anchoTotal} height={alturaTotal + 60}>

            {/* Lado izquierdo — empieza en x=0 */}
            <g transform="translate(0, 20)">
              <BracketLado
                rondas={izquierda}
                posiciones={posIzq}
                resultados={resultados}
                tema={tema}
                offsetX={45}
                espejo={false}
                oscuro={oscuro}
              />
            </g>

            {/* Centro — Copa y Final — centrado en x=1024 */}
            <g transform={`translate(${centroX - CARD_WIDTH / 2}, ${alturaTotal / 2 - 98})`}>
              <image href={oscuro ? "/copa-oscuro.png" : "/copa-claro.png"} x={CARD_WIDTH / 2 - 180} y="-370" width="360" height="360" opacity="0.85" />
              <text x={CARD_WIDTH / 2} y="10" fontSize="10" fill={tema.puntaje} fontWeight="bold" textAnchor="middle">
                {t.bracket.final}
              </text>
              <rect width={CARD_WIDTH} height={CARD_HEIGHT} rx="8" fill={tema.tarjeta} stroke="#FFD700" strokeWidth="2" y="20" />
              <text x={CARD_WIDTH/2} y="38" fontSize="9" fill="#FFD700" fontWeight="bold" textAnchor="middle">P104</text>
              <line x1="0" y1={CARD_HEIGHT / 2 + 20} x2={CARD_WIDTH} y2={CARD_HEIGHT / 2 + 20} stroke={tema.borde} strokeWidth="1" />
              <text x={CARD_WIDTH/2} y="54" fontSize="7" fill={tema.texto} fontWeight="bold" textAnchor="middle">Gan. P101</text>
              <text x={CARD_WIDTH/2} y="84" fontSize="7" fill={tema.texto} textAnchor="middle">Gan. P102</text>
              <text x={CARD_WIDTH / 2} y="130" fontSize="10" fill={tema.subtexto} textAnchor="middle">{t.bracket.tercero}</text>
              <rect width={CARD_WIDTH} height={CARD_HEIGHT} rx="8" fill={tema.tarjeta} stroke={tema.borde} strokeWidth="1.5" y="140" />
              <text x={CARD_WIDTH/2} y="158" fontSize="9" fill={tema.puntaje} fontWeight="bold" textAnchor="middle">P103</text>
              <line x1="0" y1={CARD_HEIGHT / 2 + 140} x2={CARD_WIDTH} y2={CARD_HEIGHT / 2 + 140} stroke={tema.borde} strokeWidth="1" />
              <text x={CARD_WIDTH/2} y="174" fontSize="7" fill={tema.texto} fontWeight="bold" textAnchor="middle">Per. P101</text>
              <text x={CARD_WIDTH/2} y="204" fontSize="7" fill={tema.texto} textAnchor="middle">Per. P102</text>
            </g>

            {/* Lado derecho — termina en x=2048 */}
            <g transform="translate(0, 20)">
              <BracketLado
                rondas={derecha}
                posiciones={posDer}
                resultados={resultados}
                tema={tema}
                offsetX={anchoTotal - CARD_WIDTH - -160}
                espejo={true}
                oscuro={oscuro}
              />
            </g>

          </svg>
        </div>
      </div>
    </div>
  );
}

export default Bracket;