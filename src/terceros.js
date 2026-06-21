// Qué grupos son válidos para el "3º" de cada partido de 16avos
export const gruposValidosTercero = {
  74: ['A', 'B', 'C', 'D', 'F'],
  77: ['C', 'D', 'F', 'G', 'H'],
  79: ['C', 'E', 'F', 'H', 'I'],
  80: ['E', 'H', 'I', 'J', 'K'],
  81: ['B', 'E', 'F', 'I', 'J'],
  82: ['A', 'E', 'H', 'I', 'J'],
  85: ['E', 'F', 'G', 'I', 'J'],
  87: ['D', 'E', 'I', 'J', 'L'],
};

const equiposGrupo = {
  A: ['México', 'Sudáfrica', 'Corea del Sur', 'República Checa'],
  B: ['Canadá', 'Bosnia y Herzegovina', 'Catar', 'Suiza'],
  C: ['Brasil', 'Marruecos', 'Haití', 'Escocia'],
  D: ['Estados Unidos', 'Paraguay', 'Australia', 'Turquía'],
  E: ['Alemania', 'Curazao', 'Costa de Marfil', 'Ecuador'],
  F: ['Países Bajos', 'Japón', 'Suecia', 'Túnez'],
  G: ['Bélgica', 'Egipto', 'Irán', 'Nueva Zelanda'],
  H: ['España', 'Cabo Verde', 'Arabia Saudí', 'Uruguay'],
  I: ['Francia', 'Senegal', 'Irak', 'Noruega'],
  J: ['Argentina', 'Argelia', 'Austria', 'Jordania'],
  K: ['Portugal', 'R.D. del Congo', 'Uzbekistán', 'Colombia'],
  L: ['Inglaterra', 'Croacia', 'Ghana', 'Panamá'],
};

const partidosGrupoCompleto = {
  A: [
    { id: 1, local: 'México', visita: 'Sudáfrica' },
    { id: 2, local: 'Corea del Sur', visita: 'República Checa' },
    { id: 3, local: 'México', visita: 'Corea del Sur' },
    { id: 4, local: 'República Checa', visita: 'Sudáfrica' },
    { id: 5, local: 'República Checa', visita: 'México' },
    { id: 6, local: 'Sudáfrica', visita: 'Corea del Sur' },
  ],
  B: [
    { id: 7, local: 'Canadá', visita: 'Bosnia y Herzegovina' },
    { id: 8, local: 'Catar', visita: 'Suiza' },
    { id: 9, local: 'Canadá', visita: 'Catar' },
    { id: 10, local: 'Suiza', visita: 'Bosnia y Herzegovina' },
    { id: 11, local: 'Suiza', visita: 'Canadá' },
    { id: 12, local: 'Bosnia y Herzegovina', visita: 'Catar' },
  ],
  C: [
    { id: 13, local: 'Brasil', visita: 'Marruecos' },
    { id: 14, local: 'Haití', visita: 'Escocia' },
    { id: 15, local: 'Brasil', visita: 'Haití' },
    { id: 16, local: 'Escocia', visita: 'Marruecos' },
    { id: 17, local: 'Brasil', visita: 'Escocia' },
    { id: 18, local: 'Marruecos', visita: 'Haití' },
  ],
  D: [
    { id: 19, local: 'Estados Unidos', visita: 'Paraguay' },
    { id: 20, local: 'Australia', visita: 'Turquía' },
    { id: 21, local: 'Estados Unidos', visita: 'Australia' },
    { id: 22, local: 'Turquía', visita: 'Paraguay' },
    { id: 23, local: 'Turquía', visita: 'Estados Unidos' },
    { id: 24, local: 'Paraguay', visita: 'Australia' },
  ],
  E: [
    { id: 25, local: 'Alemania', visita: 'Curazao' },
    { id: 26, local: 'Costa de Marfil', visita: 'Ecuador' },
    { id: 27, local: 'Alemania', visita: 'Costa de Marfil' },
    { id: 28, local: 'Ecuador', visita: 'Curazao' },
    { id: 29, local: 'Ecuador', visita: 'Alemania' },
    { id: 30, local: 'Curazao', visita: 'Costa de Marfil' },
  ],
  F: [
    { id: 31, local: 'Países Bajos', visita: 'Japón' },
    { id: 32, local: 'Suecia', visita: 'Túnez' },
    { id: 33, local: 'Países Bajos', visita: 'Suecia' },
    { id: 34, local: 'Túnez', visita: 'Japón' },
    { id: 35, local: 'Japón', visita: 'Suecia' },
    { id: 36, local: 'Túnez', visita: 'Países Bajos' },
  ],
  G: [
    { id: 37, local: 'Bélgica', visita: 'Egipto' },
    { id: 38, local: 'Irán', visita: 'Nueva Zelanda' },
    { id: 39, local: 'Bélgica', visita: 'Irán' },
    { id: 40, local: 'Nueva Zelanda', visita: 'Egipto' },
    { id: 41, local: 'Egipto', visita: 'Irán' },
    { id: 42, local: 'Nueva Zelanda', visita: 'Bélgica' },
  ],
  H: [
    { id: 43, local: 'España', visita: 'Cabo Verde' },
    { id: 44, local: 'Arabia Saudí', visita: 'Uruguay' },
    { id: 45, local: 'España', visita: 'Arabia Saudí' },
    { id: 46, local: 'Uruguay', visita: 'Cabo Verde' },
    { id: 47, local: 'Uruguay', visita: 'España' },
    { id: 48, local: 'Cabo Verde', visita: 'Arabia Saudí' },
  ],
  I: [
    { id: 49, local: 'Francia', visita: 'Senegal' },
    { id: 50, local: 'Irak', visita: 'Noruega' },
    { id: 51, local: 'Francia', visita: 'Irak' },
    { id: 52, local: 'Noruega', visita: 'Senegal' },
    { id: 53, local: 'Noruega', visita: 'Francia' },
    { id: 54, local: 'Senegal', visita: 'Irak' },
  ],
  J: [
    { id: 55, local: 'Argentina', visita: 'Argelia' },
    { id: 56, local: 'Austria', visita: 'Jordania' },
    { id: 57, local: 'Argentina', visita: 'Austria' },
    { id: 58, local: 'Jordania', visita: 'Argelia' },
    { id: 59, local: 'Jordania', visita: 'Argentina' },
    { id: 60, local: 'Argelia', visita: 'Austria' },
  ],
  K: [
    { id: 61, local: 'Portugal', visita: 'R.D. del Congo' },
    { id: 62, local: 'Uzbekistán', visita: 'Colombia' },
    { id: 63, local: 'Portugal', visita: 'Uzbekistán' },
    { id: 64, local: 'Colombia', visita: 'R.D. del Congo' },
    { id: 65, local: 'Colombia', visita: 'Portugal' },
    { id: 66, local: 'R.D. del Congo', visita: 'Uzbekistán' },
  ],
  L: [
    { id: 67, local: 'Inglaterra', visita: 'Croacia' },
    { id: 68, local: 'Ghana', visita: 'Panamá' },
    { id: 69, local: 'Inglaterra', visita: 'Ghana' },
    { id: 70, local: 'Panamá', visita: 'Croacia' },
    { id: 71, local: 'Panamá', visita: 'Inglaterra' },
    { id: 72, local: 'Croacia', visita: 'Ghana' },
  ],
};

function grupoCompleto(grupo, resultados) {
  return partidosGrupoCompleto[grupo].every(p => {
    const res = resultados[p.id];
    return res && res.golesLocal !== '' && res.golesLocal !== undefined && res.golesVisita !== '' && res.golesVisita !== undefined;
  });
}

function calcularTercero(grupo, resultados) {
  const tabla = {};
  equiposGrupo[grupo].forEach(e => { tabla[e] = { pj: 0, g: 0, emp: 0, p: 0, gf: 0, gc: 0, pts: 0 }; });

  partidosGrupoCompleto[grupo].forEach(partido => {
    const res = resultados[partido.id];
    if (!res || res.golesLocal === '' || res.golesLocal === undefined) return;
    const gl = parseInt(res.golesLocal);
    const gv = parseInt(res.golesVisita);
    tabla[partido.local].pj++; tabla[partido.visita].pj++;
    tabla[partido.local].gf += gl; tabla[partido.local].gc += gv;
    tabla[partido.visita].gf += gv; tabla[partido.visita].gc += gl;
    if (gl > gv) { tabla[partido.local].g++; tabla[partido.local].pts += 3; tabla[partido.visita].p++; }
    else if (gl < gv) { tabla[partido.visita].g++; tabla[partido.visita].pts += 3; tabla[partido.local].p++; }
    else { tabla[partido.local].emp++; tabla[partido.local].pts++; tabla[partido.visita].emp++; tabla[partido.visita].pts++; }
  });

  const ordenado = Object.entries(tabla)
    .map(([nombre, stats]) => ({ nombre, ...stats, dif: stats.gf - stats.gc, grupo }))
    .sort((a, b) => b.pts - a.pts || b.dif - a.dif || b.gf - a.gf);

  return ordenado[2]; // el tercero
}

// Devuelve la lista de los 12 terceros (solo de grupos completos)
export function getTercerosDisponibles(resultados) {
  const terceros = [];
  Object.keys(equiposGrupo).forEach(grupo => {
    if (grupoCompleto(grupo, resultados)) {
      terceros.push(calcularTercero(grupo, resultados));
    }
  });
  return terceros;
}