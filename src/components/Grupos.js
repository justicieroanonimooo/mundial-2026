import React, { useState, useContext } from 'react';
import { TemaContext, IdiomaContext } from '../App';
import { getBandera, getAbrev } from '../equipos';

const grupos = {
  A: { equipos: ['México', 'Sudáfrica', 'Corea del Sur', 'República Checa'] },
  B: { equipos: ['Canadá', 'Bosnia y Herzegovina', 'Catar', 'Suiza'] },
  C: { equipos: ['Brasil', 'Marruecos', 'Haití', 'Escocia'] },
  D: { equipos: ['EE. UU.', 'Paraguay', 'Australia', 'Turquía'] },
  E: { equipos: ['Alemania', 'Curazao', 'Costa de Marfil', 'Ecuador'] },
  F: { equipos: ['Países Bajos', 'Japón', 'Suecia', 'Túnez'] },
  G: { equipos: ['Bélgica', 'Egipto', 'Irán', 'Nueva Zelanda'] },
  H: { equipos: ['España', 'Cabo Verde', 'Arabia Saudí', 'Uruguay'] },
  I: { equipos: ['Francia', 'Senegal', 'Irak', 'Noruega'] },
  J: { equipos: ['Argentina', 'Argelia', 'Austria', 'Jordania'] },
  K: { equipos: ['Portugal', 'R.D. del Congo', 'Uzbekistán', 'Colombia'] },
  L: { equipos: ['Inglaterra', 'Croacia', 'Ghana', 'Panamá'] },
};

const todosLosPartidos = {
  A: [
    { id: 1, local: 'México', visita: 'Sudáfrica' },
    { id: 2, local: 'Corea del Sur', visita: 'República Checa' },
    { id: 3, local: 'México', visita: 'Corea del Sur' },
    { id: 4, local: 'Sudáfrica', visita: 'República Checa' },
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
    { id: 19, local: 'EE. UU.', visita: 'Paraguay' },
    { id: 20, local: 'Australia', visita: 'Turquía' },
    { id: 21, local: 'EE. UU.', visita: 'Australia' },
    { id: 22, local: 'Turquía', visita: 'Paraguay' },
    { id: 23, local: 'Turquía', visita: 'EE. UU.' },
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

function calcularTabla(grupo, resultados) {
  const tabla = {};
  grupos[grupo].equipos.forEach(e => {
    tabla[e] = { pj: 0, g: 0, emp: 0, p: 0, gf: 0, gc: 0, pts: 0 };
  });

  todosLosPartidos[grupo].forEach(partido => {
    const res = resultados[partido.id];
    if (!res || res.golesLocal === '' || res.golesVisita === '' || res.golesLocal === undefined) return;

    const gl = parseInt(res.golesLocal);
    const gv = parseInt(res.golesVisita);

    tabla[partido.local].pj++;
    tabla[partido.visita].pj++;
    tabla[partido.local].gf += gl;
    tabla[partido.local].gc += gv;
    tabla[partido.visita].gf += gv;
    tabla[partido.visita].gc += gl;

    if (gl > gv) {
      tabla[partido.local].g++;
      tabla[partido.local].pts += 3;
      tabla[partido.visita].p++;
    } else if (gl < gv) {
      tabla[partido.visita].g++;
      tabla[partido.visita].pts += 3;
      tabla[partido.local].p++;
    } else {
      tabla[partido.local].emp++;
      tabla[partido.local].pts++;
      tabla[partido.visita].emp++;
      tabla[partido.visita].pts++;
    }
  });

  return Object.entries(tabla)
    .map(([nombre, stats]) => ({ nombre, ...stats, dif: stats.gf - stats.gc }))
    .sort((a, b) => b.pts - a.pts || b.dif - a.dif || b.gf - a.gf);
}

function Grupos({ resultados, grupoActivo, setGrupoActivo }) {
  const tema = useContext(TemaContext);
  const { t } = useContext(IdiomaContext);
  const tabla = calcularTabla(grupoActivo, resultados);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: tema.primario, textAlign: 'center', transition: 'all 0.3s' }}>{t.grupos.titulo}</h2>

      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '8px',
        justifyContent: 'center', marginBottom: '20px'
      }}>
        {Object.keys(grupos).map(g => (
          <button key={g} onClick={() => setGrupoActivo(g)} style={{
            padding: '8px 16px',
            background: grupoActivo === g ? tema.primario : tema.botonInactivo,
            color: grupoActivo === g ? 'white' : tema.textoInactivo,
            border: 'none', borderRadius: '20px',
            cursor: 'pointer', fontWeight: 'bold',
            transition: 'all 0.3s'
          }}>
            {t.grupos.equipo === 'Team' ? 'Group' : 'Grupo'} {g}
          </button>
        ))}
      </div>

      <div style={{
        background: tema.tarjeta, borderRadius: '12px',
        boxShadow: tema.sombra, overflow: 'hidden',
        transition: 'all 0.3s'
      }}>
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <thead>
            <tr style={{ background: tema.primario, color: 'white' }}>
              <th style={{ padding: '12px', textAlign: 'left', width: '32%' }}>{t.grupos.equipo}</th>
              <th style={{ padding: '12px', textAlign: 'center', width: '9%' }}>{t.grupos.pj}</th>
              <th style={{ padding: '12px', textAlign: 'center', width: '9%' }}>{t.grupos.g}</th>
              <th style={{ padding: '12px', textAlign: 'center', width: '9%' }}>{t.grupos.e}</th>
              <th style={{ padding: '12px', textAlign: 'center', width: '9%' }}>{t.grupos.p}</th>
              <th style={{ padding: '12px', textAlign: 'center', width: '9%' }}>{t.grupos.gf}</th>
              <th style={{ padding: '12px', textAlign: 'center', width: '9%' }}>{t.grupos.gc}</th>
              <th style={{ padding: '12px', textAlign: 'center', width: '9%' }}>{t.grupos.dif}</th>
              <th style={{ padding: '12px', textAlign: 'center', width: '9%' }}>{t.grupos.pts}</th>
            </tr>
          </thead>
          <tbody>
            {tabla.map((equipo, i) => (
              <tr key={equipo.nombre} style={{
                background: i % 2 === 0 ? tema.tarjeta : tema.botonInactivo,
                borderBottom: `1px solid ${tema.borde}`,
                borderLeft: i < 2 ? `4px solid ${tema.puntaje}` : `4px solid transparent`,
                transition: 'all 0.3s'
              }}>
                <td style={{ padding: '12px', fontWeight: 'bold', color: tema.texto, whiteSpace: 'nowrap' }}>
  {getBandera(equipo.nombre)} {getAbrev(equipo.nombre)}
</td>
                <td style={{ padding: '12px', textAlign: 'center', color: tema.texto }}>{equipo.pj}</td>
                <td style={{ padding: '12px', textAlign: 'center', color: tema.texto }}>{equipo.g}</td>
                <td style={{ padding: '12px', textAlign: 'center', color: tema.texto }}>{equipo.emp}</td>
                <td style={{ padding: '12px', textAlign: 'center', color: tema.texto }}>{equipo.p}</td>
                <td style={{ padding: '12px', textAlign: 'center', color: tema.texto }}>{equipo.gf}</td>
                <td style={{ padding: '12px', textAlign: 'center', color: tema.texto }}>{equipo.gc}</td>
                <td style={{ padding: '12px', textAlign: 'center', color: tema.texto }}>{equipo.dif}</td>
                <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: tema.puntaje }}>{equipo.pts}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>  
      </div>
      <p style={{ textAlign: 'center', fontSize: '0.8rem', color: tema.subtexto, marginTop: '10px' }}>
        {t.grupos.clasificados}
      </p>
    </div>
  );
}

export default Grupos;