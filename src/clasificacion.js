// Mapa de qué 1ro y 2do de cada grupo va a qué partido de 16avos
export const clasificacionGrupos = {
  A: { primero: { partido: 79, rol: 'local' }, segundo: { partido: 73, rol: 'local' } },
  B: { primero: { partido: 85, rol: 'local' }, segundo: { partido: 73, rol: 'visita' } },
  C: { primero: { partido: 76, rol: 'local' }, segundo: { partido: 75, rol: 'visita' } },
  D: { primero: { partido: 81, rol: 'local' }, segundo: { partido: 88, rol: 'local' } },
  E: { primero: { partido: 74, rol: 'local' }, segundo: { partido: 78, rol: 'local' } },
  F: { primero: { partido: 75, rol: 'local' }, segundo: { partido: 76, rol: 'visita' } },
  G: { primero: { partido: 82, rol: 'local' }, segundo: { partido: 88, rol: 'visita' } },
  H: { primero: { partido: 84, rol: 'local' }, segundo: { partido: 86, rol: 'visita' } },
  I: { primero: { partido: 77, rol: 'local' }, segundo: { partido: 78, rol: 'visita' } },
  J: { primero: { partido: 86, rol: 'local' }, segundo: { partido: 84, rol: 'visita' } },
  K: { primero: { partido: 87, rol: 'local' }, segundo: { partido: 83, rol: 'local' } },
  L: { primero: { partido: 80, rol: 'local' }, segundo: { partido: 83, rol: 'visita' } },
};

// Partidos de cada grupo para verificar si están todos jugados
export const partidosPorGrupo = {
  A: [1, 2, 3, 4, 5, 6],
  B: [7, 8, 9, 10, 11, 12],
  C: [13, 14, 15, 16, 17, 18],
  D: [19, 20, 21, 22, 23, 24],
  E: [25, 26, 27, 28, 29, 30],
  F: [31, 32, 33, 34, 35, 36],
  G: [37, 38, 39, 40, 41, 42],
  H: [43, 44, 45, 46, 47, 48],
  I: [49, 50, 51, 52, 53, 54],
  J: [55, 56, 57, 58, 59, 60],
  K: [61, 62, 63, 64, 65, 66],
  L: [67, 68, 69, 70, 71, 72],
};

// Mapa de ganadores: partido actual -> donde va el ganador
export const progresionEliminatoria = {
  // 16avos -> Octavos
  73: { partido: 90, rol: 'local' },
  74: { partido: 89, rol: 'local' },
  75: { partido: 90, rol: 'visita' },
  76: { partido: 91, rol: 'local' },
  77: { partido: 89, rol: 'visita' },
  78: { partido: 91, rol: 'visita' },
  79: { partido: 92, rol: 'local' },
  80: { partido: 92, rol: 'visita' },
  81: { partido: 93, rol: 'local' },
  82: { partido: 93, rol: 'visita' },
  83: { partido: 94, rol: 'local' },
  84: { partido: 94, rol: 'visita' },
  85: { partido: 96, rol: 'local' },
  86: { partido: 95, rol: 'local' },
  87: { partido: 96, rol: 'visita' },
  88: { partido: 95, rol: 'visita' },
  // Octavos -> Cuartos
  89: { partido: 97, rol: 'local' },
  90: { partido: 97, rol: 'visita' },
  91: { partido: 99, rol: 'local' },
  92: { partido: 99, rol: 'visita' },
  93: { partido: 98, rol: 'local' },
  94: { partido: 98, rol: 'visita' },
  95: { partido: 100, rol: 'local' },
  96: { partido: 100, rol: 'visita' },
  // Cuartos -> Semis
  97: { partido: 101, rol: 'local' },
  98: { partido: 101, rol: 'visita' },
  99: { partido: 102, rol: 'local' },
  100: { partido: 102, rol: 'visita' },
  // Semis -> Final y 3er puesto
  101: { ganador: { partido: 104, rol: 'local' }, perdedor: { partido: 103, rol: 'local' } },
  102: { ganador: { partido: 104, rol: 'visita' }, perdedor: { partido: 103, rol: 'visita' } },
};

export function grupoCompleto(grupo, resultados) {
  return partidosPorGrupo[grupo].every(id => {
    const res = resultados[id];
    return res && res.golesLocal !== '' && res.golesLocal !== undefined && res.golesVisita !== '' && res.golesVisita !== undefined;
  });
}