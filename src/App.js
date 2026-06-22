import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Grupos from './components/Grupos';
import Fixture from './components/Fixture';
import Hoy from './components/Hoy';
import Eliminatoria from './components/Eliminatoria';
import Bracket from './components/Bracket';
import { idiomas } from './idiomas';
import { clasificacionGrupos, grupoCompleto, progresionEliminatoria } from './clasificacion';

import './App.css';

export const TemaContext = React.createContext();
export const IdiomaContext = React.createContext();

function calcularTablaGrupo(grupo, resultados) {
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

  const partidos = {
    A: [{id:1,local:'México',visita:'Sudáfrica'},{id:2,local:'Corea del Sur',visita:'República Checa'},{id:3,local:'México',visita:'Corea del Sur'},{id:4,local:'República Checa',visita:'Sudáfrica'},{id:5,local:'República Checa',visita:'México'},{id:6,local:'Sudáfrica',visita:'Corea del Sur'}],
    B: [{id:7,local:'Canadá',visita:'Bosnia y Herzegovina'},{id:8,local:'Catar',visita:'Suiza'},{id:9,local:'Canadá',visita:'Catar'},{id:10,local:'Suiza',visita:'Bosnia y Herzegovina'},{id:11,local:'Suiza',visita:'Canadá'},{id:12,local:'Bosnia y Herzegovina',visita:'Catar'}],
    C: [{id:13,local:'Brasil',visita:'Marruecos'},{id:14,local:'Haití',visita:'Escocia'},{id:15,local:'Brasil',visita:'Haití'},{id:16,local:'Escocia',visita:'Marruecos'},{id:17,local:'Brasil',visita:'Escocia'},{id:18,local:'Marruecos',visita:'Haití'}],
    D: [{id:19,local:'Estados Unidos',visita:'Paraguay'},{id:20,local:'Australia',visita:'Turquía'},{id:21,local:'Estados Unidos',visita:'Australia'},{id:22,local:'Turquía',visita:'Paraguay'},{id:23,local:'Turquía',visita:'Estados Unidos'},{id:24,local:'Paraguay',visita:'Australia'}],
    E: [{id:25,local:'Alemania',visita:'Curazao'},{id:26,local:'Costa de Marfil',visita:'Ecuador'},{id:27,local:'Alemania',visita:'Costa de Marfil'},{id:28,local:'Ecuador',visita:'Curazao'},{id:29,local:'Ecuador',visita:'Alemania'},{id:30,local:'Curazao',visita:'Costa de Marfil'}],
    F: [{id:31,local:'Países Bajos',visita:'Japón'},{id:32,local:'Suecia',visita:'Túnez'},{id:33,local:'Países Bajos',visita:'Suecia'},{id:34,local:'Túnez',visita:'Japón'},{id:35,local:'Japón',visita:'Suecia'},{id:36,local:'Túnez',visita:'Países Bajos'}],
    G: [{id:37,local:'Bélgica',visita:'Egipto'},{id:38,local:'Irán',visita:'Nueva Zelanda'},{id:39,local:'Bélgica',visita:'Irán'},{id:40,local:'Nueva Zelanda',visita:'Egipto'},{id:41,local:'Egipto',visita:'Irán'},{id:42,local:'Nueva Zelanda',visita:'Bélgica'}],
    H: [{id:43,local:'España',visita:'Cabo Verde'},{id:44,local:'Arabia Saudí',visita:'Uruguay'},{id:45,local:'España',visita:'Arabia Saudí'},{id:46,local:'Uruguay',visita:'Cabo Verde'},{id:47,local:'Uruguay',visita:'España'},{id:48,local:'Cabo Verde',visita:'Arabia Saudí'}],
    I: [{id:49,local:'Francia',visita:'Senegal'},{id:50,local:'Irak',visita:'Noruega'},{id:51,local:'Francia',visita:'Irak'},{id:52,local:'Noruega',visita:'Senegal'},{id:53,local:'Noruega',visita:'Francia'},{id:54,local:'Senegal',visita:'Irak'}],
    J: [{id:55,local:'Argentina',visita:'Argelia'},{id:56,local:'Austria',visita:'Jordania'},{id:57,local:'Argentina',visita:'Austria'},{id:58,local:'Jordania',visita:'Argelia'},{id:59,local:'Jordania',visita:'Argentina'},{id:60,local:'Argelia',visita:'Austria'}],
    K: [{id:61,local:'Portugal',visita:'R.D. del Congo'},{id:62,local:'Uzbekistán',visita:'Colombia'},{id:63,local:'Portugal',visita:'Uzbekistán'},{id:64,local:'Colombia',visita:'R.D. del Congo'},{id:65,local:'Colombia',visita:'Portugal'},{id:66,local:'R.D. del Congo',visita:'Uzbekistán'}],
    L: [{id:67,local:'Inglaterra',visita:'Croacia'},{id:68,local:'Ghana',visita:'Panamá'},{id:69,local:'Inglaterra',visita:'Ghana'},{id:70,local:'Panamá',visita:'Croacia'},{id:71,local:'Panamá',visita:'Inglaterra'},{id:72,local:'Croacia',visita:'Ghana'}],
  };

  const tabla = {};
  equiposGrupo[grupo].forEach(e => {
    tabla[e] = { pj: 0, g: 0, emp: 0, p: 0, gf: 0, gc: 0, pts: 0 };
  });

  partidos[grupo].forEach(partido => {
    const res = resultados[partido.id];
    if (!res || res.golesLocal === '' || res.golesLocal === undefined) return;
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
    .sort((a, b) => b.pts - a.pts || b.dif - a.dif || b.gf - a.gf)
    .map(e => e.nombre);
}

function App() {
  const [seccion, setSeccion] = useState('grupos');
  const [grupoActivo, setGrupoActivo] = useState('A');
  const [oscuro, setOscuro] = useState(true);
  const [idiomaActual, setIdiomaActual] = useState(() => {
    return localStorage.getItem('idioma_mundial') || 'es';
  });
  const [terceroSeleccionados] = useState(() => {
    const guardados = localStorage.getItem('terceros_mundial');
    return guardados ? JSON.parse(guardados) : {};
  });

  const [resultados, setResultados] = useState(() => {
    const guardados = localStorage.getItem('resultados_mundial');
    return guardados ? JSON.parse(guardados) : {};
  });

  useEffect(() => {
    localStorage.setItem('terceros_mundial', JSON.stringify(terceroSeleccionados));
  }, [terceroSeleccionados]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    localStorage.setItem('resultados_mundial', JSON.stringify(resultados));

    // Calcular tabla de cada grupo y pasar 1ros y 2dos automáticamente
    const nuevosResultados = { ...resultados };
    let huboCambios = false;

    Object.keys(clasificacionGrupos).forEach(grupo => {
      if (!grupoCompleto(grupo, resultados)) return;

      // Calcular tabla del grupo
      const tabla = calcularTablaGrupo(grupo, resultados);
      const primero = tabla[0];
      const segundo = tabla[1];

      const claseP = clasificacionGrupos[grupo].primero;
      const claseS = clasificacionGrupos[grupo].segundo;

      // Asignar primero
      const resP = nuevosResultados[claseP.partido] || {};
      if (resP[claseP.rol] !== primero) {
        nuevosResultados[claseP.partido] = { ...resP, [claseP.rol]: primero };
        huboCambios = true;
      }

      // Asignar segundo
      const resS = nuevosResultados[claseS.partido] || {};
      if (resS[claseS.rol] !== segundo) {
        nuevosResultados[claseS.partido] = { ...resS, [claseS.rol]: segundo };
        huboCambios = true;
      }
    });

    // Progresion eliminatoria - ganadores pasan automaticamente
    Object.keys(progresionEliminatoria).forEach(partidoId => {
      const id = parseInt(partidoId);
      const res = nuevosResultados[id];
      if (!res || res.golesLocal === '' || res.golesLocal === undefined || res.golesVisita === '' || res.golesVisita === undefined) return;
      if (!res.local || !res.visita) return;

      const gl = parseInt(res.golesLocal);
      const gv = parseInt(res.golesVisita);
      const ganador = gl > gv ? res.local : gl < gv ? res.visita : null;
      const perdedor = gl > gv ? res.visita : gl < gv ? res.local : null;

      const prog = progresionEliminatoria[id];

      if (ganador && prog.partido) {
        const destino = nuevosResultados[prog.partido] || {};
        if (destino[prog.rol] !== ganador) {
          nuevosResultados[prog.partido] = { ...destino, [prog.rol]: ganador };
          huboCambios = true;
        }
      }

      if (prog.ganador && ganador) {
        const destinoGan = nuevosResultados[prog.ganador.partido] || {};
        if (destinoGan[prog.ganador.rol] !== ganador) {
          nuevosResultados[prog.ganador.partido] = { ...destinoGan, [prog.ganador.rol]: ganador };
          huboCambios = true;
        }
      }

      if (prog.perdedor && perdedor) {
        const destinoPer = nuevosResultados[prog.perdedor.partido] || {};
        if (destinoPer[prog.perdedor.rol] !== perdedor) {
          nuevosResultados[prog.perdedor.partido] = { ...destinoPer, [prog.perdedor.rol]: perdedor };
          huboCambios = true;
        }
      }
    });

    // Asignar terceros seleccionados manualmente
    Object.entries(terceroSeleccionados).forEach(([partidoId, nombreEquipo]) => {
      if (!nombreEquipo) return;
      const id = parseInt(partidoId);
      const destino = nuevosResultados[id] || {};
      // El tercero siempre va como "visita" en estos partidos (ver estructura: 1º Grupo X vs 3º)
      if (destino.visita !== nombreEquipo) {
        nuevosResultados[id] = { ...destino, visita: nombreEquipo };
        huboCambios = true;
      }
    });

    if (huboCambios) setResultados(nuevosResultados);
  }, [resultados]);

  useEffect(() => {
    localStorage.setItem('idioma_mundial', idiomaActual);
  }, [idiomaActual]);

  const t = idiomas[idiomaActual];

  const tema = {
    fondo: oscuro ? '#121212' : '#f0f4f0',
    tarjeta: oscuro ? '#1e1e1e' : 'white',
    texto: oscuro ? '#e0e0e0' : '#333',
    subtexto: oscuro ? '#888' : '#888',
    nav: oscuro ? '#1a1a1a' : 'white',
    primario: oscuro ? '#112540' : '#1a472a',
    puntaje: oscuro ? '#2d5f8a' : '#1a472a',
    botonInactivo: oscuro ? '#2c2c2c' : '#e0e0e0',
    textoInactivo: oscuro ? '#aaa' : '#333',
    borde: oscuro ? '#333' : '#eee',
    sombra: oscuro ? '0 2px 8px rgba(0,0,0,0.6)' : '0 2px 8px rgba(0,0,0,0.08)',
  };

  const botones = [
    { id: 'grupos', label: t.nav.grupos },
    { id: 'fixture', label: t.nav.fixture },
    { id: 'hoy', label: t.nav.hoy },
    { id: 'eliminatoria', label: t.nav.eliminatoria },
    { id: 'bracket', label: t.nav.bracket },
    
  ];

  return (
    <TemaContext.Provider value={tema}>
      <IdiomaContext.Provider value={{ t, idiomaActual, setIdiomaActual }}>
        <div style={{ minHeight: '100vh', background: tema.fondo, transition: 'all 0.3s' }}>
          <Header oscuro={oscuro} setOscuro={setOscuro} tema={tema} />

          <nav style={{
            display: 'flex', justifyContent: 'center', gap: '10px',
            padding: '16px', background: tema.nav,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            flexWrap: 'wrap',
            transition: 'all 0.3s'
          }}>
            {botones.map(b => (
              <button key={b.id} onClick={() => setSeccion(b.id)} style={{
                padding: '10px 24px',
                background: seccion === b.id ? tema.primario : tema.botonInactivo,
                color: seccion === b.id ? 'white' : tema.textoInactivo,
                border: 'none', borderRadius: '20px',
                cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem',
                transition: 'all 0.3s'
              }}>
                {b.label}
              </button>
            ))}
          </nav>

          {seccion === 'grupos' && <Grupos resultados={resultados} grupoActivo={grupoActivo} setGrupoActivo={setGrupoActivo} />}
          {seccion === 'fixture' && <Fixture resultados={resultados} setResultados={setResultados} grupoActivo={grupoActivo} setGrupoActivo={setGrupoActivo} />}
          {seccion === 'hoy' && <Hoy resultados={resultados} setResultados={setResultados} />}
          {seccion === 'eliminatoria' && <Eliminatoria resultados={resultados} setResultados={setResultados} oscuro={oscuro} />}
          {seccion === 'bracket' && <Bracket resultados={resultados} setResultados={setResultados} oscuro={oscuro} />}

        </div>
      </IdiomaContext.Provider>
    </TemaContext.Provider>
  );
}

export default App;