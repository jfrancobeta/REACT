/**
 * ============================================
 * EJEMPLO 2: EFFECTS Y DATA FETCHING
 * ============================================
 * 
 * Demuestra:
 * - useEffect (efectos secundarios)
 * - Dependencias de useEffect
 * - Limpieza de efectos (cleanup)
 * - Simulación de fetch de datos
 * - Manejo de estados: cargando, error, datos
 */

import { useState, useEffect } from 'react';

// Interfaz para tipar los datos
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  ciudad: string;
}

export function EjemploEffectsDataFetching() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filtroId, setFiltroId] = useState(1);

  // ==========================================
  // EFFECT 1: Fetch simulado (sin dependencias)
  // Se ejecuta SOLO una vez al montar el componente
  // ==========================================
  useEffect(() => {
    console.log('Effect 1: Componente montado');

    // Simulamos una petición HTTP
    setLoading(true);
    
    setTimeout(() => {
      const datosSimulados: Usuario[] = [
        { id: 1, nombre: 'Carlos', email: 'carlos@example.com', ciudad: 'Madrid' },
        { id: 2, nombre: 'Ana', email: 'ana@example.com', ciudad: 'Barcelona' },
        { id: 3, nombre: 'Luis', email: 'luis@example.com', ciudad: 'Valencia' },
      ];

      setUsuarios(datosSimulados);
      setLoading(false);
    }, 1000);

    // Cleanup function - se ejecuta cuando el componente se desmonta
    return () => {
      console.log('Effect 1: Componente desmontado - Limpieza');
    };
  }, []); // Array vacío = ejecutar solo al montar

  // ==========================================
  // EFFECT 2: Buscar usuario específico (CON dependencias)
  // Se ejecuta cuando filtroId cambia
  // ==========================================
  useEffect(() => {
    console.log(`Effect 2: Buscando usuario con ID ${filtroId}`);

    if (usuarios.length === 0) return;

    setLoading(true);
    
    // Simular retraso de red
    const timer = setTimeout(() => {
      const usuarioEncontrado = usuarios.find(u => u.id === filtroId);
      if (!usuarioEncontrado) {
        setError(`Usuario con ID ${filtroId} no encontrado`);
      } else {
        setError(null);
      }
      setLoading(false);
    }, 500);

    // Cleanup: limpiar el timeout si el efecto se ejecuta nuevamente
    return () => {
      clearTimeout(timer);
      console.log('Effect 2: Limpieza - timeout cancelado');
    };
  }, [filtroId, usuarios]); // Dependencias: ejecutar cuando estos valores cambien

  // ==========================================
  // EFFECT 3: Titulo del documento
  // Se ejecuta cada render (sin array de dependencias)
  // ==========================================
  useEffect(() => {
    document.title = `React - ${usuarios.length} usuarios cargados`;
    // Sin return aquí, pero podría haberlo
  }); // Sin dependencias = ejecutar en cada render

  // ==========================================
  // EFFECT 4: Escuchar eventos (con cleanup)
  // ==========================================
  useEffect(() => {
    const handleResize = () => {
      console.log(`Ventana redimensionada: ${window.innerWidth}x${window.innerHeight}`);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup: remover el event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ==========================================
  // Render
  // ==========================================
  return (
    <div style={{ border: '2px solid #28a745', padding: '20px', margin: '20px 0', borderRadius: '8px', backgroundColor: '#f0fff4' }}>
      <h2>⚡ Ejemplo: Effects y Data Fetching</h2>

      {/* Info sobre los Effects */}
      <div style={{ backgroundColor: '#fff3cd', padding: '10px', borderRadius: '5px', marginBottom: '20px', fontSize: '0.9em' }}>
        <p>📌 <strong>Effect 1:</strong> Se ejecutó al montar ([] vacío)</p>
        <p>📌 <strong>Effect 2:</strong> Se ejecuta cuando filtroId cambia [filtroId, usuarios]</p>
        <p>📌 <strong>Effect 3:</strong> Se ejecuta cada render (sin array)</p>
        <p>📌 <strong>Effect 4:</strong> Escucha eventos y limpia al desmontar</p>
        <p>💡 Abre la consola (F12) para ver los logs</p>
      </div>

      {/* Filtro */}
      <div style={{ marginBottom: '20px', backgroundColor: '#fff', padding: '15px', borderRadius: '5px' }}>
        <label>
          <strong>Seleccionar usuario por ID:</strong>
          <select
            value={filtroId}
            onChange={(e) => setFiltroId(Number(e.target.value))}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value={1}>Usuario 1</option>
            <option value={2}>Usuario 2</option>
            <option value={3}>Usuario 3</option>
          </select>
        </label>
      </div>

      {/* Estados de carga, error y datos */}
      <div>
        {loading && (
          <div style={{ color: '#007bff', fontWeight: 'bold' }}>
            ⏳ Cargando datos...
          </div>
        )}

        {error && (
          <div style={{ color: '#dc3545', fontWeight: 'bold' }}>
            ❌ Error: {error}
          </div>
        )}

        {!loading && !error && usuarios.length > 0 && (
          <div>
            <h3>✅ Usuarios cargados ({usuarios.length})</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
              <thead>
                <tr style={{ backgroundColor: '#28a745', color: '#fff' }}>
                  <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #28a745' }}>ID</th>
                  <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #28a745' }}>Nombre</th>
                  <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #28a745' }}>Email</th>
                  <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #28a745' }}>Ciudad</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr
                    key={usuario.id}
                    style={{
                      backgroundColor: usuario.id === filtroId ? '#e8f5e9' : '#fff',
                      borderBottom: '1px solid #ddd'
                    }}
                  >
                    <td style={{ padding: '10px' }}>{usuario.id}</td>
                    <td style={{ padding: '10px' }}>{usuario.nombre}</td>
                    <td style={{ padding: '10px' }}>{usuario.email}</td>
                    <td style={{ padding: '10px' }}>{usuario.ciudad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Explicación de Array de dependencias */}
      <div style={{ marginTop: '20px', backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', fontSize: '0.9em' }}>
        <h4>📚 Guía de Array de Dependencias:</h4>
        <ul>
          <li><strong>Sin array:</strong> Se ejecuta tras cada render</li>
          <li><strong>[] (vacío):</strong> Se ejecuta solo al montar</li>
          <li><strong>[variable]:</strong> Se ejecuta cuando variable cambia</li>
          <li><strong>[variable1, variable2]:</strong> Se ejecuta cuando alguna cambia</li>
        </ul>
      </div>
    </div>
  );
}
