// Todos los horarios están almacenados en UTC
// Conversión desde hora local de cada ciudad en verano:
// México (CDMX, GDL, MTY): UTC-6 → sumar 6h
// Este USA (NJ, Boston, Miami, Atlanta, Philadelphia, Toronto): UTC-4 → sumar 4h
// Centro USA (Dallas/Arlington, Kansas City, Houston): UTC-5 → sumar 5h
// Pacífico USA (LA, Santa Clara, Seattle, Vancouver): UTC-7 → sumar 7h

function toUTC(fecha, hora, offsetHoras) {
    const [dia, mes] = fecha.split('/').map(Number);
    const [h, m] = hora.split(':').map(Number);
    const year = 2026;
    const date = new Date(Date.UTC(year, mes - 1, dia, h + offsetHoras, m));
    return date.toISOString();
  }
  
  export const horariosPartidos = {
    // ===== GRUPO A =====
    1:  toUTC('11/06', '21:00', 6),  // México vs Sudáfrica - CDMX
    2:  toUTC('12/06', '04:00', 6),  // Corea del Sur vs República Checa - Monterrey
    3:  toUTC('19/06', '03:00', 6),  // México vs Corea del Sur - Guadalajara
    4:  toUTC('18/06', '18:00', 4),  // República Checa vs Sudáfrica - Atlanta
    5:  toUTC('25/06', '03:00', 4),  // República Checa vs México - Atlanta
    6:  toUTC('25/06', '03:00', 4),  // Sudáfrica vs Corea del Sur - Seattle
  
    // ===== GRUPO B =====
    7:  toUTC('12/06', '21:00', 7),  // Canadá vs Bosnia - Vancouver
    8:  toUTC('13/06', '21:00', 5),  // Qatar vs Suiza - Houston
    9:  toUTC('19/06', '00:00', 7),  // Canadá vs Qatar - Vancouver
    10: toUTC('18/06', '21:00', 7),  // Suiza vs Bosnia - Los Ángeles
    11: toUTC('24/06', '21:00', 7),  // Suiza vs Canadá - Vancouver
    12: toUTC('24/06', '21:00', 7),  // Bosnia vs Qatar - Los Ángeles
  
    // ===== GRUPO C =====
    13: toUTC('14/06', '00:00', 4),  // Brasil vs Marruecos - Miami
    14: toUTC('14/06', '03:00', 4),  // Haití vs Escocia - Boston
    15: toUTC('20/06', '02:30', 4),  // Brasil vs Haití - Philadelphia
    16: toUTC('19/06', '00:00', 4),  // Escocia vs Marruecos - Boston
    17: toUTC('25/06', '00:00', 4),  // Escocia vs Brasil - Boston
    18: toUTC('25/06', '00:00', 4),  // Marruecos vs Haití - Atlanta
  
    // ===== GRUPO D =====
    19: toUTC('13/06', '03:00', 4),  // Estados Unidos vs Paraguay - Santa Clara (ET)
    20: toUTC('14/06', '06:00', 4),  // Australia vs Turquía - Atlanta
    21: toUTC('19/06', '21:00', 4),  // Estados Unidos vs Australia - Seattle
    22: toUTC('20/06', '05:00', 7),  // Turquía vs Paraguay - Santa Clara
    23: toUTC('26/06', '04:00', 7),  // Turquía vs Estados Unidos - Seattle
    24: toUTC('26/06', '04:00', 7),  // Paraguay vs Australia - Santa Clara
  
    // ===== GRUPO E =====
    25: toUTC('14/06', '19:00', 5),  // Alemania vs Curazao - Kansas City
    26: toUTC('15/06', '01:00', 4),  // Costa de Marfil vs Ecuador - Philadelphia
    27: toUTC('20/06', '22:00', 5),  // Alemania vs Costa de Marfil - Toronto
    28: toUTC('21/06', '02:00', 5),  // Ecuador vs Curazao - Kansas City
    29: toUTC('25/06', '22:00', 4),  // Ecuador vs Alemania - Kansas City
    30: toUTC('25/06', '22:00', 4),  // Curazao vs Costa de Marfil - Philadelphia
  
    // ===== GRUPO F =====
    31: toUTC('14/06', '22:00', 5),  // Países Bajos vs Japón - Arlington
    32: toUTC('15/06', '04:00', 6),  // Suecia vs Túnez - Monterrey
    33: toUTC('20/06', '19:00', 5),  // Países Bajos vs Suecia - Houston
    34: toUTC('21/06', '06:00', 6),  // Túnez vs Japón - Monterrey
    35: toUTC('26/06', '01:00', 6),  // Túnez vs Países Bajos - Houston
    36: toUTC('26/06', '01:00', 6),  // Japón vs Suecia - Monterrey
  
    // ===== GRUPO G =====
    37: toUTC('15/06', '21:00', 7),  // Bélgica vs Egipto - Los Ángeles
    38: toUTC('16/06', '03:00', 7),  // Irán vs Nueva Zelanda - Los Ángeles
    39: toUTC('21/06', '21:00', 7),  // Bélgica vs Irán - Los Ángeles
    40: toUTC('22/06', '03:00', 7),  // Nueva Zelanda vs Egipto - Vancouver
    41: toUTC('27/06', '05:00', 7),  // Nueva Zelanda vs Bélgica - Vancouver
    42: toUTC('27/06', '05:00', 7),  // Egipto vs Irán - Seattle
  
    // ===== GRUPO H =====
    43: toUTC('15/06', '18:00', 4),  // España vs Cabo Verde - Atlanta
    44: toUTC('16/06', '00:00', 4),  // Arabia Saudita vs Uruguay - Miami
    45: toUTC('21/06', '18:00', 4),  // España vs Arabia Saudita - Atlanta
    46: toUTC('22/06', '00:00', 4),  // Uruguay vs Cabo Verde - Miami
    47: toUTC('27/06', '02:00', 5),  // Uruguay vs España - Guadalajara
    48: toUTC('27/06', '02:00', 5),  // Cabo Verde vs Arabia Saudita - Houston
  
    // ===== GRUPO I =====
    49: toUTC('16/06', '21:00', 4),  // Francia vs Senegal - New Jersey
    50: toUTC('17/06', '00:00', 4),  // Irak vs Noruega - Boston
    51: toUTC('22/06', '17:00', 4),  // Francia vs Irak - Philadelphia
    52: toUTC('22/06', '20:00', 4),  // Noruega vs Senegal - New Jersey
    53: toUTC('26/06', '21:00', 4),  // Noruega vs Francia - Boston
    54: toUTC('26/06', '21:00', 4),  // Senegal vs Irak - Toronto
  
    // ===== GRUPO J =====
    55: toUTC('17/06', '03:00', 5),  // Argentina vs Argelia - Kansas City
    56: toUTC('17/06', '06:00', 7),  // Austria vs Jordania - Santa Clara
    57: toUTC('22/06', '13:00', 5),  // Argentina vs Austria - Arlington
    58: toUTC('22/06', '23:00', 7),  // Jordania vs Argelia - Santa Clara
    59: toUTC('28/06', '04:00', 7),  // Jordania vs Argentina - Santa Clara
    60: toUTC('28/06', '04:00', 5),  // Argelia vs Austria - Kansas City
  
    // ===== GRUPO K =====
    61: toUTC('17/06', '19:00', 5),  // Portugal vs R.D. Congo - Houston
    62: toUTC('18/06', '04:00', 6),  // Uzbekistán vs Colombia - Guadalajara
    63: toUTC('23/06', '13:00', 5),  // Portugal vs Uzbekistán - Houston
    64: toUTC('23/06', '22:00', 6),  // Colombia vs R.D. Congo - Guadalajara
    65: toUTC('28/06', '01:30', 4),  // Colombia vs Portugal - Atlanta
    66: toUTC('28/06', '01:30', 4),  // R.D. Congo vs Uzbekistán - Atlanta
  
    // ===== GRUPO L =====
    67: toUTC('17/06', '22:00', 5),  // Inglaterra vs Croacia - Arlington
    68: toUTC('18/06', '01:00', 4),  // Ghana vs Panamá - Toronto
    69: toUTC('23/06', '16:00', 4),  // Inglaterra vs Ghana - Boston
    70: toUTC('23/06', '19:00', 4),  // Panamá vs Croacia - Toronto
    71: toUTC('27/06', '23:00', 4),  // Panamá vs Inglaterra - New Jersey
    72: toUTC('27/06', '23:00', 4),  // Croacia vs Ghana - Philadelphia
  
    // ===== 16AVOS =====
    73: toUTC('28/06', '15:00', 7),  // SoFi Stadium, LA
    74: toUTC('29/06', '16:30', 4),  // Gillette Stadium, Boston
    75: toUTC('29/06', '21:00', 6),  // Estadio BBVA, Monterrey
    76: toUTC('29/06', '13:00', 5),  // NRG Stadium, Houston
    77: toUTC('30/06', '17:00', 4),  // MetLife Stadium, NJ
    78: toUTC('30/06', '13:00', 5),  // AT&T Stadium, Dallas
    79: toUTC('30/06', '21:00', 6),  // Estadio Azteca, CDMX
    80: toUTC('01/07', '12:00', 4),  // Mercedes-Benz, Atlanta
    81: toUTC('01/07', '20:00', 7),  // Levi's Stadium, Santa Clara
    82: toUTC('01/07', '16:00', 4),  // Lumen Field, Seattle
    83: toUTC('02/07', '15:00', 7),  // BC Place, Vancouver
    84: toUTC('02/07', '19:00', 5),  // Arrowhead, Kansas City
    85: toUTC('03/07', '15:00', 4),  // BMO Field, Toronto
    86: toUTC('03/07', '19:00', 7),  // Levi's Stadium, Santa Clara
    87: toUTC('03/07', '15:00', 4),  // Lincoln Financial, Philadelphia
    88: toUTC('03/07', '19:00', 6),  // Estadio Azteca, CDMX
  
    // ===== OCTAVOS =====
    89: toUTC('04/07', '15:00', 5),  // AT&T Stadium, Dallas
    90: toUTC('04/07', '19:00', 7),  // SoFi Stadium, LA
    91: toUTC('05/07', '15:00', 4),  // Hard Rock, Miami
    92: toUTC('05/07', '19:00', 4),  // Mercedes-Benz, Atlanta
    93: toUTC('06/07', '15:00', 5),  // Arrowhead, Kansas City
    94: toUTC('06/07', '19:00', 7),  // Lumen Field, Seattle
    95: toUTC('07/07', '15:00', 4),  // Gillette Stadium, Boston
    96: toUTC('07/07', '12:00', 7),  // BC Place, Vancouver
  
    // ===== CUARTOS =====
    97: toUTC('09/07', '15:00', 4),  // Gillette Stadium, Boston
    98: toUTC('10/07', '15:00', 7),  // SoFi Stadium, LA
    99: toUTC('11/07', '15:00', 4),  // Hard Rock, Miami
    100: toUTC('11/07', '15:00', 5), // Arrowhead, Kansas City
  
    // ===== SEMIS =====
    101: toUTC('14/07', '15:00', 5), // AT&T Stadium, Dallas
    102: toUTC('15/07', '15:00', 4), // Mercedes-Benz, Atlanta
  
    // ===== TERCER PUESTO Y FINAL =====
    103: toUTC('18/07', '15:00', 4), // Hard Rock, Miami
    104: toUTC('19/07', '15:00', 4), // MetLife Stadium, NJ
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