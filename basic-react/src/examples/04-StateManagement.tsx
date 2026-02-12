/**
 * ============================================
 * EJEMPLO 4: STATE MANAGEMENT AVANZADO
 * ============================================
 * 
 * Demuestra:
 * - useReducer (alternativa compleja a useState)
 * - Context + useContext (compartir state globalmente)
 * - Patrones de state management
 * - Composición de estados
 */

import { useReducer, createContext, useContext, useState, ReactNode } from 'react';

// ==========================================
// CONTEXT Y PROVIDER PARA STATE GLOBAL
// ==========================================

interface AppState {
  tema: 'claro' | 'oscuro';
  usuario: string | null;
  notificaciones: string[];
}

interface AppContextType {
  state: AppState;
  cambiarTema: () => void;
  establecerUsuario: (usuario: string) => void;
  agregarNotificacion: (msg: string) => void;
  eliminarNotificacion: (index: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// ==========================================
// REDUCER - Lógica de state centralizada
// ==========================================
type AppAction =
  | { type: 'CAMBIAR_TEMA' }
  | { type: 'ESTABLECER_USUARIO'; payload: string }
  | { type: 'AGREGAR_NOTIFICACION'; payload: string }
  | { type: 'ELIMINAR_NOTIFICACION'; payload: number }
  | { type: 'LIMPIAR_NOTIFICACIONES' };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'CAMBIAR_TEMA':
      return {
        ...state,
        tema: state.tema === 'claro' ? 'oscuro' : 'claro'
      };

    case 'ESTABLECER_USUARIO':
      return {
        ...state,
        usuario: action.payload,
        notificaciones: [...state.notificaciones, `✅ Bienvenido ${action.payload}`]
      };

    case 'AGREGAR_NOTIFICACION':
      return {
        ...state,
        notificaciones: [...state.notificaciones, action.payload]
      };

    case 'ELIMINAR_NOTIFICACION':
      return {
        ...state,
        notificaciones: state.notificaciones.filter((_, i) => i !== action.payload)
      };

    case 'LIMPIAR_NOTIFICACIONES':
      return {
        ...state,
        notificaciones: []
      };

    default:
      return state;
  }
}

// ==========================================
// PROVIDER COMPONENT
// ==========================================
export function AppProvider({ children }: { children: ReactNode }) {
  const initialState: AppState = {
    tema: 'claro',
    usuario: null,
    notificaciones: []
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  const cambiarTema = () => dispatch({ type: 'CAMBIAR_TEMA' });
  const establecerUsuario = (usuario: string) =>
    dispatch({ type: 'ESTABLECER_USUARIO', payload: usuario });
  const agregarNotificacion = (msg: string) =>
    dispatch({ type: 'AGREGAR_NOTIFICACION', payload: msg });
  const eliminarNotificacion = (index: number) =>
    dispatch({ type: 'ELIMINAR_NOTIFICACION', payload: index });

  const value: AppContextType = {
    state,
    cambiarTema,
    establecerUsuario,
    agregarNotificacion,
    eliminarNotificacion
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// ==========================================
// HOOK PARA USAR EL CONTEXT
// ==========================================
export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider');
  }
  return context;
}

// ==========================================
// COMPONENTE CARRITO (Ejemplo de reducer local)
// ==========================================
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  cantidad: number;
}

type CarritoAction =
  | { type: 'AGREGAR'; payload: { id: number; nombre: string; precio: number } }
  | { type: 'ELIMINAR'; payload: number }
  | { type: 'INCREMENTAR'; payload: number }
  | { type: 'DECREMENTAR'; payload: number }
  | { type: 'LIMPIAR' };

function carritoReducer(state: Producto[], action: CarritoAction): Producto[] {
  switch (action.type) {
    case 'AGREGAR': {
      const existe = state.find(p => p.id === action.payload.id);
      if (existe) {
        return state.map(p =>
          p.id === action.payload.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }
      return [...state, { ...action.payload, cantidad: 1 }];
    }

    case 'ELIMINAR':
      return state.filter(p => p.id !== action.payload);

    case 'INCREMENTAR':
      return state.map(p =>
        p.id === action.payload ? { ...p, cantidad: p.cantidad + 1 } : p
      );

    case 'DECREMENTAR':
      return state
        .map(p =>
          p.id === action.payload && p.cantidad > 1
            ? { ...p, cantidad: p.cantidad - 1 }
            : p
        )
        .filter(p => p.cantidad > 0);

    case 'LIMPIAR':
      return [];

    default:
      return state;
  }
}

function ComponenteCarrito() {
  const [carrito, dispatch] = useReducer(carritoReducer, []);
  const { agregarNotificacion } = useAppContext();

  const productos = [
    { id: 1, nombre: 'Laptop', precio: 1200 },
    { id: 2, nombre: 'Mouse', precio: 30 },
    { id: 3, nombre: 'Teclado', precio: 80 }
  ];

  const handleAgregar = (id: number, nombre: string, precio: number) => {
    dispatch({ type: 'AGREGAR', payload: { id, nombre, precio } });
    agregarNotificacion(`📦 ${nombre} agregado al carrito`);
  };

  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);

  return (
    <div style={{ marginBottom: '20px' }}>
      <h4>🛒 Carrito (useReducer local)</h4>

      <div style={{ marginBottom: '10px' }}>
        {productos.map(p => (
          <button
            key={p.id}
            onClick={() => handleAgregar(p.id, p.nombre, p.precio)}
            style={{
              padding: '8px 12px',
              margin: '4px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            + {p.nombre} (${p.precio})
          </button>
        ))}
      </div>

      {carrito.length === 0 ? (
        <p style={{ color: '#666' }}>El carrito está vacío</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {carrito.map(p => (
              <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#f9f9f9', marginBottom: '4px', borderRadius: '4px' }}>
                <span>
                  {p.nombre} x{p.cantidad} = ${p.precio * p.cantidad}
                </span>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button onClick={() => dispatch({ type: 'DECREMENTAR', payload: p.id })} style={{ padding: '4px 8px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>-</button>
                  <button onClick={() => dispatch({ type: 'INCREMENTAR', payload: p.id })} style={{ padding: '4px 8px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>+</button>
                  <button onClick={() => dispatch({ type: 'ELIMINAR', payload: p.id })} style={{ padding: '4px 8px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>×</button>
                </div>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '1.1em' }}>
            Total: ${total.toFixed(2)}
          </div>
          <button
            onClick={() => dispatch({ type: 'LIMPIAR' })}
            style={{ marginTop: '10px', padding: '8px 12px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Limpiar carrito
          </button>
        </>
      )}
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================
export function EjemploStateManagement() {
  const { state, cambiarTema, establecerUsuario, eliminarNotificacion } = useAppContext();
  const [usuarioInput, setUsuarioInput] = useState('');

  const bgColor = state.tema === 'claro' ? '#ffffff' : '#333333';
  const textColor = state.tema === 'claro' ? '#000000' : '#ffffff';
  const borderColor = state.tema === 'claro' ? '#ddd' : '#555';

  return (
    <div style={{
      border: `2px solid #9c27b0`,
      padding: '20px',
      margin: '20px 0',
      borderRadius: '8px',
      backgroundColor: bgColor,
      color: textColor
    }}>
      <h2>📊 Ejemplo: State Management Avanzado</h2>

      {/* TEMA */}
      <div style={{ marginBottom: '20px', backgroundColor: state.tema === 'claro' ? '#f0f0f0' : '#444', padding: '15px', borderRadius: '5px' }}>
        <button
          onClick={cambiarTema}
          style={{
            padding: '8px 15px',
            backgroundColor: '#9c27b0',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '10px'
          }}
        >
          {state.tema === 'claro' ? '🌙 Modo Oscuro' : '☀️ Modo Claro'}
        </button>
        <p><strong>Tema actual:</strong> {state.tema}</p>
      </div>

      {/* USUARIO (useReducer) */}
      <div style={{ marginBottom: '20px', backgroundColor: state.tema === 'claro' ? '#f0f0f0' : '#444', padding: '15px', borderRadius: '5px', border: `1px solid ${borderColor}` }}>
        <h3>👤 Gestión de Usuario (useReducer)</h3>
        {!state.usuario ? (
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={usuarioInput}
              onChange={(e) => setUsuarioInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && state.usuario === null && (establecerUsuario(usuarioInput), setUsuarioInput(''))}
              placeholder="Ingresa tu nombre"
              style={{ flex: 1, padding: '8px' }}
            />
            <button
              onClick={() => {
                if (usuarioInput.trim()) {
                  establecerUsuario(usuarioInput);
                  setUsuarioInput('');
                }
              }}
              style={{
                padding: '8px 15px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Iniciar sesión
            </button>
          </div>
        ) : (
          <p><strong>Usuario conectado:</strong> {state.usuario}</p>
        )}
      </div>

      {/* CARRITO */}
      {state.usuario && <ComponenteCarrito />}

      {/* NOTIFICACIONES */}
      {state.notificaciones.length > 0 && (
        <div style={{
          backgroundColor: state.tema === 'claro' ? '#e8f5e9' : '#1b5e20',
          border: `2px solid #28a745`,
          padding: '15px',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          <h3>🔔 Notificaciones ({state.notificaciones.length})</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {state.notificaciones.map((notif, index) => (
              <li
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px',
                  backgroundColor: state.tema === 'claro' ? '#c8e6c9' : '#2e7d32',
                  marginBottom: '5px',
                  borderRadius: '4px'
                }}
              >
                <span>{notif}</span>
                <button
                  onClick={() => eliminarNotificacion(index)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    padding: '4px 8px',
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* EXPLICACIÓN */}
      <div style={{ backgroundColor: state.tema === 'claro' ? '#f5f5f5' : '#444', padding: '15px', borderRadius: '5px', fontSize: '0.9em', border: `1px solid ${borderColor}` }}>
        <h4>📚 Conceptos:</h4>
        <ul>
          <li><strong>useReducer:</strong> Para lógica compleja de estado (alternativa a múltiples useState)</li>
          <li><strong>Context:</strong> Compartir estado entre componentes sin "prop drilling"</li>
          <li><strong>Provider:</strong> Componente que provee el contexto a sus hijos</li>
          <li><strong>Dispatch:</strong> Función para enviar acciones al reducer</li>
        </ul>
      </div>
    </div>
  );
}
