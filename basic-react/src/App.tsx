/**
 * ============================================
 * PROYECTO COMPLETO DE REACT - ESTUDIO Y REFERENCIA
 * ============================================
 * 
 * Este proyecto integra todos los conceptos fundamental de React:
 * ✅ States (useState)
 * ✅ Hooks (useEffect, useCallback, useMemo, useRef)
 * ✅ Components (componentes funcionales)
 * ✅ Props (pasar datos)
 * ✅ Forms (formularios)
 * ✅ Events (manejo de eventos)
 * ✅ State management (useState, useReducer, Context)
 * ✅ Effects and data fetching (useEffect)
 * ✅ Custom hooks (hooks personalizados)
 * ✅ Refs (useRef)
 * ✅ Advanced state (estados complejos)
 * 
 * Abre la consola del navegador (F12) para ver los logs de los ejemplos
 */

import { useState } from 'react';
import { EjemploStatesPropsEvents } from './examples/01-StatesPropsEvents';
import { EjemploEffectsDataFetching } from './examples/02-EffectsDataFetching';
import { EjemploCustomHooksRefsState } from './examples/03-CustomHooksRefsState';
import { EjemploStateManagement, AppProvider } from './examples/04-StateManagement';
import './App.css';

function App() {
  const [ejemploActual, setEjemploActual] = useState(1);

  const ejemplos = [
    {
      id: 1,
      nombre: '📦 States, Props, Events & Forms',
      descripcion: 'Aprende el funcionamiento básico: estado, propiedades, eventos y formularios',
      componente: <EjemploStatesPropsEvents />
    },
    {
      id: 2,
      nombre: '⚡ Effects y Data Fetching',
      descripcion: 'useEffect, fetch de datos simulado, manejo de carga y errores',
      componente: <EjemploEffectsDataFetching />
    },
    {
      id: 3,
      nombre: '🎣 Custom Hooks, Refs y State Avanzado',
      descripcion: 'Custom hooks, useRef, useCallback, useMemo y hooks personalizados',
      componente: <EjemploCustomHooksRefsState />
    },
    {
      id: 4,
      nombre: '📊 State Management Avanzado',
      descripcion: 'useReducer, Context API, provider y state global',
      componente: (
        <AppProvider>
          <EjemploStateManagement />
        </AppProvider>
      )
    }
  ];

  const ejemploActualObj = ejemplos.find(e => e.id === ejemploActual);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* HEADER */}
      <div style={{
        backgroundColor: '#282c34',
        padding: '30px',
        color: '#fff',
        textAlign: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: '0 0 10px 0' }}>⚛️ React - Guía Completa de Estudio</h1>
        <p style={{ margin: '0', fontSize: '1.1em', opacity: 0.9 }}>
          Conceptos fundamentales con ejemplos prácticos y comentados
        </p>
      </div>

      {/* NAVEGACIÓN */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        padding: '20px',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderBottom: '2px solid #ddd'
      }}>
        {ejemplos.map(ejemplo => (
          <button
            key={ejemplo.id}
            onClick={() => setEjemploActual(ejemplo.id)}
            style={{
              padding: '12px 20px',
              backgroundColor: ejemploActual === ejemplo.id ? '#007bff' : '#e9ecef',
              color: ejemploActual === ejemplo.id ? '#fff' : '#000',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '0.95em',
              fontWeight: ejemploActual === ejemplo.id ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
              boxShadow: ejemploActual === ejemplo.id ? '0 2px 8px rgba(0,123,255,0.3)' : 'none'
            }}
          >
            {ejemplo.nombre.split(' ')[0]} {ejemplo.nombre.split(' ')[1]}
          </button>
        ))}
      </div>

      {/* CONTENIDO */}
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Descripción del ejemplo actual */}
        {ejemploActualObj && (
          <div style={{
            backgroundColor: '#fff3cd',
            border: '2px solid #ffc107',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '20px'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>💡 {ejemploActualObj.nombre}</h3>
            <p style={{ margin: 0 }}>{ejemploActualObj.descripcion}</p>
          </div>
        )}

        {/* Ejemplos */}
        {ejemploActualObj && (
          <div>
            {ejemploActualObj.componente}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{
        backgroundColor: '#282c34',
        color: '#fff',
        textAlign: 'center',
        padding: '30px',
        marginTop: '40px'
      }}>
        <p style={{ margin: '0 0 10px 0' }}>
          💾 Proyecto de referencia para estudiar React
        </p>
        <p style={{ margin: '0', fontSize: '0.9em', opacity: 0.8 }}>
          Abre la consola (F12) • Revisa el código comentado • Experimenta modificando los ejemplos
        </p>
      </div>
    </div>
  );
}

export default App;
