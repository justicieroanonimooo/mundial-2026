// Todos los horarios están almacenados en UTC
// Conversión desde hora local de cada ciudad en verano:
// México (CDMX, GDL, MTY): UTC-6 → sumar 6h
// Este USA (NJ, Boston, Miami, Atlanta, Philadelphia, Toronto): UTC-4 → sumar 4h
// Centro USA (Dallas/Arlington, Kansas City, Houston): UTC-5 → sumar 5h
// Pacífico USA (LA, Santa Clara, Seattle, Vancouver): UTC-7 → sumar 7h

export const horariosPartidos = {
  // ===== GRUPO A =====
  1:  '2026-06-11T19:00:00Z',  // México vs Sudáfrica
  2:  '2026-06-12T02:00:00Z',  // Corea del Sur vs República Checa
  3:  '2026-06-19T01:00:00Z',  // México vs Corea del Sur
  4:  '2026-06-18T16:00:00Z',  // República Checa vs Sudáfrica
  5:  '2026-06-25T01:00:00Z',  // Czechia vs México
  6:  '2026-06-25T01:00:00Z',  // Sudáfrica vs Corea del Sur

  // ===== GRUPO B =====
  7:  '2026-06-12T19:00:00Z',  // Canadá vs Bosnia
  8:  '2026-06-13T19:00:00Z',  // Qatar vs Suiza
  9:  '2026-06-18T22:00:00Z',  // Canadá vs Qatar
  10: '2026-06-18T19:00:00Z',  // Suiza vs Bosnia
  11: '2026-06-24T19:00:00Z',  // Suiza vs Canadá
  12: '2026-06-24T19:00:00Z',  // Bosnia vs Qatar

  // ===== GRUPO C =====
  13: '2026-06-13T22:00:00Z',  // Brasil vs Marruecos
  14: '2026-06-14T01:00:00Z',  // Haití vs Escocia
  15: '2026-06-20T00:30:00Z',  // Brasil vs Haití
  16: '2026-06-19T22:00:00Z',  // Escocia vs Marruecos
  17: '2026-06-24T22:00:00Z',  // Escocia vs Brasil
  18: '2026-06-24T22:00:00Z',  // Marruecos vs Haití

  // ===== GRUPO D =====
  19: '2026-06-13T01:00:00Z',  // Estados Unidos vs Paraguay
  20: '2026-06-14T04:00:00Z',  // Australia vs Turquía
  21: '2026-06-19T19:00:00Z',  // Estados Unidos vs Australia
  22: '2026-06-20T03:00:00Z',  // Turquía vs Paraguay
  23: '2026-06-26T02:00:00Z',  // Turquía vs Estados Unidos
  24: '2026-06-26T02:00:00Z',  // Paraguay vs Australia

  // ===== GRUPO E =====
  25: '2026-06-14T17:00:00Z',  // Alemania vs Curazao
  26: '2026-06-14T23:00:00Z',  // Costa de Marfil vs Ecuador
  27: '2026-06-20T20:00:00Z',  // Alemania vs Costa de Marfil
  28: '2026-06-21T00:00:00Z',  // Ecuador vs Curazao
  29: '2026-06-25T20:00:00Z',  // Ecuador vs Alemania
  30: '2026-06-25T20:00:00Z',  // Curazao vs Costa de Marfil

  // ===== GRUPO F =====
  31: '2026-06-14T20:00:00Z',  // Países Bajos vs Japón
  32: '2026-06-15T02:00:00Z',  // Suecia vs Túnez
  33: '2026-06-20T17:00:00Z',  // Países Bajos vs Suecia
  34: '2026-06-21T04:00:00Z',  // Túnez vs Japón
  35: '2026-06-25T23:00:00Z',  // Japón vs Suecia
  36: '2026-06-25T23:00:00Z',  // Túnez vs Países Bajos

  // ===== GRUPO G =====
  37: '2026-06-15T19:00:00Z',  // Bélgica vs Egipto
  38: '2026-06-16T01:00:00Z',  // Irán vs Nueva Zelanda
  39: '2026-06-21T19:00:00Z',  // Bélgica vs Irán
  40: '2026-06-22T01:00:00Z',  // Nueva Zelanda vs Egipto
  41: '2026-06-27T03:00:00Z',  // Egipto vs Irán
  42: '2026-06-27T03:00:00Z',  // Nueva Zelanda vs Bélgica

  // ===== GRUPO H =====
  43: '2026-06-15T16:00:00Z',  // España vs Cabo Verde
  44: '2026-06-15T22:00:00Z',  // Arabia Saudí vs Uruguay
  45: '2026-06-21T16:00:00Z',  // España vs Arabia Saudí
  46: '2026-06-21T22:00:00Z',  // Uruguay vs Cabo Verde
  47: '2026-06-27T00:00:00Z',  // Uruguay vs España
  48: '2026-06-27T00:00:00Z',  // Cabo Verde vs Arabia Saudí

  // ===== GRUPO I =====
  49: '2026-06-16T19:00:00Z',  // Francia vs Senegal
  50: '2026-06-16T22:00:00Z',  // Irak vs Noruega
  51: '2026-06-22T21:00:00Z',  // Francia vs Irak
  52: '2026-06-23T00:00:00Z',  // Noruega vs Senegal
  53: '2026-06-26T19:00:00Z',  // Noruega vs Francia
  54: '2026-06-26T19:00:00Z',  // Senegal vs Irak

  // ===== GRUPO J =====
  55: '2026-06-17T01:00:00Z',  // Argentina vs Argelia
  56: '2026-06-17T04:00:00Z',  // Austria vs Jordania
  57: '2026-06-22T17:00:00Z',  // Argentina vs Austria
  58: '2026-06-23T03:00:00Z',  // Jordania vs Argelia
  59: '2026-06-28T02:00:00Z',  // Jordania vs Argentina
  60: '2026-06-28T02:00:00Z',  // Argelia vs Austria

  // ===== GRUPO K =====
  61: '2026-06-17T17:00:00Z',  // Portugal vs R.D. del Congo
  62: '2026-06-18T02:00:00Z',  // Uzbekistán vs Colombia
  63: '2026-06-23T17:00:00Z',  // Portugal vs Uzbekistán
  64: '2026-06-24T02:00:00Z',  // Colombia vs R.D. del Congo
  65: '2026-06-27T23:30:00Z',  // Colombia vs Portugal
  66: '2026-06-27T23:30:00Z',  // R.D. del Congo vs Uzbekistán

  // ===== GRUPO L =====
  67: '2026-06-17T20:00:00Z',  // Inglaterra vs Croacia
  68: '2026-06-17T23:00:00Z',  // Ghana vs Panamá
  69: '2026-06-23T20:00:00Z',  // Inglaterra vs Ghana
  70: '2026-06-23T23:00:00Z',  // Panamá vs Croacia
  71: '2026-06-27T21:00:00Z',  // Panamá vs Inglaterra
  72: '2026-06-27T21:00:00Z',  // Croacia vs Ghana

  // ===== 16AVOS =====
  73: '2026-06-28T19:00:00Z',  // SoFi Stadium, LA
  74: '2026-06-29T20:30:00Z',  // Gillette Stadium, Boston
  75: '2026-06-30T01:00:00Z',  // Estadio BBVA, Monterrey
  76: '2026-06-29T17:00:00Z',  // NRG Stadium, Houston
  77: '2026-06-30T21:00:00Z',  // MetLife Stadium, NJ
  78: '2026-06-30T17:00:00Z',  // AT&T Stadium, Dallas
  79: '2026-07-01T01:00:00Z',  // Estadio Azteca, CDMX
  80: '2026-07-01T16:00:00Z',  // Mercedes-Benz, Atlanta
  81: '2026-07-02T00:00:00Z',  // Levi's Stadium, Santa Clara
  82: '2026-07-01T20:00:00Z',  // Lumen Field, Seattle
  83: '2026-07-02T23:00:00Z',  // BMO Field, Toronto
  84: '2026-07-02T19:00:00Z',  // SoFi Stadium, LA
  85: '2026-07-03T03:00:00Z',  // BC Place, Vancouver
  86: '2026-07-03T22:00:00Z',  // Hard Rock, Miami
  87: '2026-07-04T01:30:00Z',  // Arrowhead, Kansas City
  88: '2026-07-03T18:00:00Z',  // AT&T Stadium, Dallas

  // ===== OCTAVOS =====
  89: '2026-07-04T21:00:00Z',  // Lincoln Financial, Philadelphia
  90: '2026-07-04T17:00:00Z',  // NRG Stadium, Houston
  91: '2026-07-05T20:00:00Z',  // MetLife Stadium, NJ
  92: '2026-07-06T00:00:00Z',  // Estadio Azteca, CDMX
  93: '2026-07-06T19:00:00Z',  // AT&T Stadium, Dallas
  94: '2026-07-07T00:00:00Z',  // Lumen Field, Seattle
  95: '2026-07-07T16:00:00Z',  // Mercedes-Benz, Atlanta
  96: '2026-07-07T20:00:00Z',  // BC Place, Vancouver

  // ===== CUARTOS =====
  97: '2026-07-09T20:00:00Z',  // Gillette Stadium, Boston
  98: '2026-07-10T19:00:00Z',  // SoFi Stadium, LA
  99: '2026-07-11T21:00:00Z',  // Hard Rock, Miami
  100: '2026-07-12T01:00:00Z', // Arrowhead, Kansas City

  // ===== SEMIS =====
  101: '2026-07-14T19:00:00Z', // AT&T Stadium, Dallas
  102: '2026-07-15T19:00:00Z', // Mercedes-Benz, Atlanta

  // ===== TERCER PUESTO Y FINAL =====
  103: '2026-07-18T21:00:00Z', // Hard Rock, Miami
  104: '2026-07-19T19:00:00Z', // MetLife Stadium, NJ
};

export function formatearHoraLocal(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}