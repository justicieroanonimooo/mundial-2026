import React, { useContext } from 'react';
import { TemaContext } from '../App';
import { gruposValidosTercero, getTercerosDisponibles } from '../terceros';
import { getAbrev, getBandera } from '../equipos';

function SelectorTerceros({ resultados, terceroSeleccionados, setTerceroSeleccionados }) {
  const tema = useContext(TemaContext);

  const todosLosTerceros = getTercerosDisponibles(resultados);

  // Terceros ya usados en algún partido
  const usados = Object.values(terceroSeleccionados).filter(Boolean);

  const seleccionar = (partidoId, nombreEquipo) => {
    setTerceroSeleccionados(prev => ({ ...prev, [partidoId]: nombreEquipo || null }));
  };

  return (
    <div style={{
      background: tema.tarjeta, borderRadius: '16px',
      boxShadow: tema.sombra, padding: '20px', marginBottom: '24px'
    }}>
      <h3 style={{ color: tema.primario, textAlign: 'center', marginBottom: '16px' }}>
        🎯 Seleccionar Mejores Terceros
      </h3>
      <p style={{ textAlign: 'center', color: tema.subtexto, fontSize: '0.85rem', marginBottom: '20px' }}>
        Elegí qué tercero ocupa cada lugar disponible ({usados.length}/8 asignados)
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {Object.entries(gruposValidosTercero).map(([partidoId, gruposValidos]) => {
          const seleccionActual = terceroSeleccionados[partidoId];

          // Terceros válidos para este partido: deben pertenecer a un grupo válido
          // y no estar usados en otro partido (a menos que sean la selección actual de este)
          const opcionesDisponibles = todosLosTerceros.filter(t =>
            gruposValidos.includes(t.grupo) &&
            (!usados.includes(t.nombre) || t.nombre === seleccionActual)
          );

          return (
            <div key={partidoId} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px', background: tema.botonInactivo, borderRadius: '10px'
            }}>
              <span style={{ fontWeight: 'bold', color: tema.texto, minWidth: '60px', fontSize: '0.85rem' }}>
                P{partidoId}
              </span>
              <span style={{ color: tema.subtexto, fontSize: '0.75rem', minWidth: '90px' }}>
                3º {gruposValidos.join('/')}
              </span>
              <select
                value={seleccionActual || ''}
                onChange={e => seleccionar(partidoId, e.target.value)}
                style={{
                  flex: 1, padding: '8px', borderRadius: '8px',
                  border: `1px solid ${tema.borde}`, background: tema.tarjeta,
                  color: tema.texto, fontSize: '0.85rem'
                }}
              >
                <option value="">-- Seleccionar equipo --</option>
                {opcionesDisponibles.map(t => (
                  <option key={t.nombre} value={t.nombre}>
                    {getBandera(t.nombre)} {getAbrev(t.nombre)} - {t.nombre} (Grupo {t.grupo}, {t.pts}pts)
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      {todosLosTerceros.length === 0 && (
        <p style={{ textAlign: 'center', color: tema.subtexto, marginTop: '12px', fontSize: '0.85rem' }}>
          Todavía no hay grupos completos. Los terceros aparecerán aquí a medida que se jueguen los partidos.
        </p>
      )}
    </div>
  );
}

export default SelectorTerceros;