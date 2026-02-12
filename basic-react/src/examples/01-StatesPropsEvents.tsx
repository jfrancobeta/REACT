/**
 * ============================================
 * EJEMPLO 1: STATES, PROPS, EVENTS Y FORMS
 * ============================================
 * 
 * Demuestra:
 * - Componentes funcionales
 * - Props (pasar datos)
 * - State (useState)
 * - Events (manejadores de eventos)
 * - Forms (formularios)
 * - Manejo de cambios
 */

import { useState } from 'react';

// ==========================================
// Componente hijo que recibe PROPS
// ==========================================
interface ProductoProps {
  nombre: string;
  precio: number;
  enStock: boolean;
  onComprar: (nombre: string) => void; // Función como prop
}

function Producto({ nombre, precio, enStock, onComprar }: ProductoProps) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '5px' }}>
      <h4>{nombre}</h4>
      <p>Precio: ${precio}</p>
      <p>Stock: {enStock ? '✅ Disponible' : '❌ Agotado'}</p>
      <button
        onClick={() => onComprar(nombre)}
        disabled={!enStock}
        style={{ cursor: enStock ? 'pointer' : 'not-allowed', opacity: enStock ? 1 : 0.5 }}
      >
        Comprar
      </button>
    </div>
  );
}

// ==========================================
// Componente principal con STATE y FORMS
// ==========================================
export function EjemploStatesPropsEvents() {
  // STATE - Variables que pueden cambiar y causan re-renders
  const [usuarios, setUsuarios] = useState<string[]>(['Juan', 'María']);
  const [compras, setCompras] = useState<string[]>([]);
  const [nuevoUsuario, setNuevoUsuario] = useState('');
  const [filtro, setFiltro] = useState('');

  // Lista de productos (simulada)
  const productos: ProductoProps[] = [
    { nombre: 'Laptop', precio: 999, enStock: true, onComprar: () => {} },
    { nombre: 'Mouse', precio: 25, enStock: true, onComprar: () => {} },
    { nombre: 'Teclado', precio: 75, enStock: false, onComprar: () => {} },
  ];

  // EVENTOS - Manejadores de eventos
  const handleAgregar = () => {
    if (nuevoUsuario.trim()) {
      setUsuarios([...usuarios, nuevoUsuario]);
      setNuevoUsuario(''); // Limpiar input
    }
  };

  const handleEliminar = (index: number) => {
    setUsuarios(usuarios.filter((_, i) => i !== index));
  };

  const handleCompra = (producto: string) => {
    setCompras([...compras, `${producto} - ${new Date().toLocaleTimeString()}`]);
    alert(`¡Compra realizada de ${producto}!`);
  };

  // Filtrar usuarios
  const usuariosFiltrados = usuarios.filter(u =>
    u.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div style={{ border: '2px solid #007bff', padding: '20px', margin: '20px 0', borderRadius: '8px', backgroundColor: '#f0f8ff' }}>
      <h2>📦 Ejemplo: States, Props, Events y Forms</h2>

      {/* FORMULARIO */}
      <div style={{ marginBottom: '20px', backgroundColor: '#fff', padding: '15px', borderRadius: '5px' }}>
        <h3>Agregar Usuario (Form)</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            value={nuevoUsuario}
            onChange={(e) => setNuevoUsuario(e.target.value)} // EVENTO onChange
            onKeyPress={(e) => e.key === 'Enter' && handleAgregar()} // EVENTO onKeyPress
            placeholder="Nombre del usuario"
            style={{ flex: 1, padding: '8px' }}
          />
          <button onClick={handleAgregar} style={{ padding: '8px 15px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Agregar
          </button>
        </div>

        {/* Filtro */}
        <input
          type="text"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Filtrar usuarios..."
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
      </div>

      {/* LISTA DE USUARIOS */}
      <div style={{ marginBottom: '20px' }}>
        <h3>👥 Usuarios ({usuariosFiltrados.length})</h3>
        {usuariosFiltrados.length === 0 ? (
          <p>No hay usuarios</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {usuariosFiltrados.map((usuario, index) => (
              <li
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px',
                  backgroundColor: '#f9f9f9',
                  marginBottom: '5px',
                  borderRadius: '4px',
                  border: '1px solid #ddd'
                }}
              >
                <span>{usuario}</span>
                <button
                  onClick={() => handleEliminar(index)}
                  style={{
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* PRODUCTOS CON PROPS */}
      <div style={{ marginBottom: '20px' }}>
        <h3>🛒 Productos</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
          {productos.map((prod, index) => (
            <Producto
              key={index}
              {...prod}
              onComprar={handleCompra}
            />
          ))}
        </div>
      </div>

      {/* HISTORIAL DE COMPRAS */}
      {compras.length > 0 && (
        <div style={{ backgroundColor: '#e8f5e9', padding: '15px', borderRadius: '5px' }}>
          <h3>💰 Historial de Compras</h3>
          <ul>
            {compras.map((compra, index) => (
              <li key={index}>{compra}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
