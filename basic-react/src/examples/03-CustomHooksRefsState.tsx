/**
 * ============================================
 * EJEMPLO 3: CUSTOM HOOKS, REFS y STATE AVANZADO
 * ============================================
 * 
 * Demuestra:
 * - Custom hooks (reutilizar lógica)
 * - useRef (acceder directamente al DOM)
 * - useRef (almacenar valores sin causar re-renders)
 * - useCallback (memorizar funciones)
 * - useMemo (memorizar valores)
 * - State management con estados complejos
 */

import { useState, useRef, useCallback, useMemo, useEffect } from 'react';

// ==========================================
// CUSTOM HOOK: useCounter
// ==========================================
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  return { count, increment, decrement, reset };
}

// ==========================================
// CUSTOM HOOK: useForm con validación
// ==========================================
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setTouched({});
  }, [initialValues]);

  return { values, touched, handleChange, handleBlur, resetForm };
}

// ==========================================
// CUSTOM HOOK: usePrevious (obtener valor anterior)
// ==========================================
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// ==========================================
// CUSTOM HOOK: useTimer (temporizador)
// ==========================================
function useTimer(initialSeconds = 0) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isRunning) return;

    // Usar ref para almacenar el intervalo sin causar re-renders
    intervalRef.current = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const toggle = () => setIsRunning(!isRunning);
  const reset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return { seconds, isRunning, toggle, reset };
}

// ==========================================
// Componente principal
// ==========================================
export function EjemploCustomHooksRefsState() {
  // Usando custom hooks
  const counter = useCounter(0);
  const form = useForm({ nombre: '', edad: '', suscrito: false });
  const timer = useTimer(0);

  // REFS - Referencias mutables que no causan re-renders
  const inputRef = useRef(null); // Acceder al DOM
  const renderCountRef = useRef(0); // Contar renders sin causar re-renders
  const dataRef = useRef({ ultimaBusqueda: '', resultados: [] }); // Almacenar datos

  // Cuando el componente se renderiza, incrementar el contador
  renderCountRef.current++;

  // USEPREVIOUS - Obtener valor anterior
  const nombrePrevio = usePrevious(form.values.nombre);

  // USEMEMO - Memorizar cálculos complejos
  const textStats = useMemo(() => {
    return {
      caracteres: form.values.nombre.length,
      palabras: form.values.nombre.trim().split(/\s+/).filter(p => p).length,
      esValido: form.values.nombre.length >= 3
    };
  }, [form.values.nombre]);

  // USECALLBACK - Memorizar función (igual que arriba en useCounter)
  const handleFoco = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const handleGuardar = useCallback(() => {
    if (textStats.esValido) {
      dataRef.current.ultimaBusqueda = form.values.nombre;
      dataRef.current.resultados.push({
        nombre: form.values.nombre,
        edad: form.values.edad,
        timestamp: new Date().toLocaleTimeString()
      });
      alert('✅ Datos guardados');
    }
  }, [textStats.esValido, form.values]);

  return (
    <div style={{ border: '2px solid #ff6b6b', padding: '20px', margin: '20px 0', borderRadius: '8px', backgroundColor: '#ffe0e0' }}>
      <h2>🎣 Ejemplo: Custom Hooks, Refs y State Avanzado</h2>

      {/* SECCIÓN: useRef y DOM */}
      <div style={{ backgroundColor: '#fff', padding: '15px', marginBottom: '20px', borderRadius: '5px', borderLeft: '4px solid #ff6b6b' }}>
        <h3>📌 useRef - Acceder al DOM y almacenar valores</h3>
        <div style={{ marginBottom: '10px' }}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Escribe algo (puedo ser enfocado con el botón)"
            style={{ padding: '8px', marginRight: '10px' }}
          />
          <button onClick={handleFoco} style={{ padding: '8px 15px', backgroundColor: '#ff6b6b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Enfocar Input
          </button>
        </div>
        <p>
          <strong>Renders del componente:</strong> {renderCountRef.current}
          <br />
          💡 Este contador aumenta pero NO causa re-renders infinitos
        </p>
      </div>

      {/* SECCIÓN: Custom Hooks */}
      <div style={{ backgroundColor: '#fff', padding: '15px', marginBottom: '20px', borderRadius: '5px', borderLeft: '4px solid #ffd43b' }}>
        <h3>🎣 Custom Hook: useCounter</h3>
        <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
          Contador: <span style={{ color: '#ff6b6b' }}>{counter.count}</span>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={counter.increment} style={{ padding: '8px 15px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            +
          </button>
          <button onClick={counter.decrement} style={{ padding: '8px 15px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            -
          </button>
          <button onClick={counter.reset} style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Reset
          </button>
        </div>
      </div>

      {/* SECCIÓN: Custom Hook useTimer */}
      <div style={{ backgroundColor: '#fff', padding: '15px', marginBottom: '20px', borderRadius: '5px', borderLeft: '4px solid #00d4ff' }}>
        <h3>⏱️ Custom Hook: useTimer</h3>
        <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px', color: '#00d4ff' }}>
          {timer.seconds}s
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={timer.toggle} style={{ padding: '8px 15px', backgroundColor: '#00d4ff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {timer.isRunning ? '⏸ Pausar' : '▶ Iniciar'}
          </button>
          <button onClick={timer.reset} style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Reset
          </button>
        </div>
      </div>

      {/* SECCIÓN: Custom Hook useForm + useMemo */}
      <div style={{ backgroundColor: '#fff', padding: '15px', marginBottom: '20px', borderRadius: '5px', borderLeft: '4px solid #9c27b0' }}>
        <h3>📝 Custom Hook: useForm + useMemo</h3>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            <strong>Nombre:</strong>
            <input
              type="text"
              name="nombre"
              value={form.values.nombre}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              placeholder="Mínimo 3 caracteres"
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>

          {/* useMemo - Estadísticas memorizadas */}
          <div style={{ backgroundColor: '#f0f0f0', padding: '10px', marginTop: '10px', borderRadius: '4px', fontSize: '0.9em' }}>
            <p><strong>Análisis (useMemo):</strong></p>
            <p>Caracteres: {textStats.caracteres}</p>
            <p>Palabras: {textStats.palabras}</p>
            <p>Válido: {textStats.esValido ? '✅' : '❌'}</p>
            {nombrePrevio && <p>Nombre anterior (usePrevious): "{nombrePrevio}"</p>}
          </div>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <input
            type="checkbox"
            name="suscrito"
            checked={form.values.suscrito}
            onChange={form.handleChange}
            style={{ marginRight: '10px' }}
          />
          <span>Suscribirse a newsletter</span>
        </label>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleGuardar} style={{ padding: '8px 15px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Guardar (ref: dataRef)
          </button>
          <button onClick={form.resetForm} style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Limpiar
          </button>
        </div>

        {/* Mostrar datos guardados en ref */}
        {dataRef.current.resultados.length > 0 && (
          <div style={{ marginTop: '15px', backgroundColor: '#e8f5e9', padding: '10px', borderRadius: '4px' }}>
            <p><strong>Datos guardados en useRef (dataRef):</strong></p>
            <ul>
              {dataRef.current.resultados.map((item, i) => (
                <li key={i}>
                  {item.nombre} ({item.edad} años) - {item.timestamp}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* EXPLICACIÓN */}
      <div style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', fontSize: '0.9em' }}>
        <h4>📚 Conceptos Clave:</h4>
        <ul>
          <li><strong>useRef:</strong> Acceder al DOM o almacenar valores mutables sin re-renders</li>
          <li><strong>useCallback:</strong> Memorizar funciones para optimizar (pasar a componentes hijos)</li>
          <li><strong>useMemo:</strong> Memorizar cálculos complejos para evitar recalcularlos</li>
          <li><strong>Custom Hooks:</strong> Funciones que reutilizan lógica de hooks de React</li>
          <li><strong>usePrevious:</strong> Obtener el valor anterior de una variable</li>
        </ul>
      </div>
    </div>
  );
}
