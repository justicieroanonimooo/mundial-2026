export const equipos = {
  'México': { abrev: 'MEX', bandera: '🇲🇽', en: 'Mexico' },
  'Sudáfrica': { abrev: 'RSA', bandera: '🇿🇦', en: 'South Africa' },
  'Corea del Sur': { abrev: 'KOR', bandera: '🇰🇷', en: 'Korea Republic' },
  'República Checa': { abrev: 'CZE', bandera: '🇨🇿', en: 'Czechia' },
  'Canadá': { abrev: 'CAN', bandera: '🇨🇦', en: 'Canada' },
  'Bosnia y Herzegovina': { abrev: 'BIH', bandera: '🇧🇦', en: 'Bosnia and Herzegovina' },
  'Catar': { abrev: 'QAT', bandera: '🇶🇦', en: 'Qatar' },
  'Suiza': { abrev: 'SUI', bandera: '🇨🇭', en: 'Switzerland' },
  'Brasil': { abrev: 'BRA', bandera: '🇧🇷', en: 'Brazil' },
  'Marruecos': { abrev: 'MAR', bandera: '🇲🇦', en: 'Morocco' },
  'Haití': { abrev: 'HAI', bandera: '🇭🇹', en: 'Haiti' },
  'Escocia': { abrev: 'SCO', bandera: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', en: 'Scotland' },
  'EE. UU.': { abrev: 'USA', bandera: '🇺🇸', en: 'USA' },
  'Paraguay': { abrev: 'PAR', bandera: '🇵🇾', en: 'Paraguay' },
  'Australia': { abrev: 'AUS', bandera: '🇦🇺', en: 'Australia' },
  'Turquía': { abrev: 'TUR', bandera: '🇹🇷', en: 'Turkey' },
  'Alemania': { abrev: 'GER', bandera: '🇩🇪', en: 'Germany' },
  'Curazao': { abrev: 'CUW', bandera: '🇨🇼', en: 'Curaçao' },
  'Costa de Marfil': { abrev: 'CIV', bandera: '🇨🇮', en: 'Côte d\'Ivoire' },
  'Ecuador': { abrev: 'ECU', bandera: '🇪🇨', en: 'Ecuador' },
  'Países Bajos': { abrev: 'NED', bandera: '🇳🇱', en: 'Netherlands' },
  'Japón': { abrev: 'JPN', bandera: '🇯🇵', en: 'Japan' },
  'Suecia': { abrev: 'SWE', bandera: '🇸🇪', en: 'Sweden' },
  'Túnez': { abrev: 'TUN', bandera: '🇹🇳', en: 'Tunisia' },
  'Bélgica': { abrev: 'BEL', bandera: '🇧🇪', en: 'Belgium' },
  'Egipto': { abrev: 'EGY', bandera: '🇪🇬', en: 'Egypt' },
  'Irán': { abrev: 'IRN', bandera: '🇮🇷', en: 'Iran' },
  'Nueva Zelanda': { abrev: 'NZL', bandera: '🇳🇿', en: 'New Zealand' },
  'España': { abrev: 'ESP', bandera: '🇪🇸', en: 'Spain' },
  'Cabo Verde': { abrev: 'CPV', bandera: '🇨🇻', en: 'Cabo Verde' },
  'Arabia Saudí': { abrev: 'KSA', bandera: '🇸🇦', en: 'Saudi Arabia' },
  'Uruguay': { abrev: 'URU', bandera: '🇺🇾', en: 'Uruguay' },
  'Francia': { abrev: 'FRA', bandera: '🇫🇷', en: 'France' },
  'Senegal': { abrev: 'SEN', bandera: '🇸🇳', en: 'Senegal' },
  'Irak': { abrev: 'IRQ', bandera: '🇮🇶', en: 'Iraq' },
  'Noruega': { abrev: 'NOR', bandera: '🇳🇴', en: 'Norway' },
  'Argentina': { abrev: 'ARG', bandera: '🇦🇷', en: 'Argentina' },
  'Argelia': { abrev: 'ALG', bandera: '🇩🇿', en: 'Algeria' },
  'Austria': { abrev: 'AUT', bandera: '🇦🇹', en: 'Austria' },
  'Jordania': { abrev: 'JOR', bandera: '🇯🇴', en: 'Jordan' },
  'Portugal': { abrev: 'POR', bandera: '🇵🇹', en: 'Portugal' },
  'R.D. del Congo': { abrev: 'COD', bandera: '🇨🇩', en: 'Congo DR' },
  'Uzbekistán': { abrev: 'UZB', bandera: '🇺🇿', en: 'Uzbekistan' },
  'Colombia': { abrev: 'COL', bandera: '🇨🇴', en: 'Colombia' },
  'Inglaterra': { abrev: 'ENG', bandera: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', en: 'England' },
  'Croacia': { abrev: 'CRO', bandera: '🇭🇷', en: 'Croatia' },
  'Ghana': { abrev: 'GHA', bandera: '🇬🇭', en: 'Ghana' },
  'Panamá': { abrev: 'PAN', bandera: '🇵🇦', en: 'Panama' },
  'Estados Unidos': { abrev: 'USA', bandera: '🇺🇸', en: 'USA' },
};

export function getNombre(nombre, idioma) {
  const equipo = equipos[nombre];
  if (!equipo) return nombre;
  return idioma === 'en' ? equipo.en : nombre;
}

export function getBandera(nombre) {
  return equipos[nombre]?.bandera || '🏳️';
}

export function getAbrev(nombre) {
  return equipos[nombre]?.abrev || nombre.substring(0, 3).toUpperCase();
}