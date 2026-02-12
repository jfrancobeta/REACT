# ⚛️ REACT - GUÍA COMPLETA DE ESTUDIO

## 📋 Contenido del Proyecto

Este es un **proyecto estructurado para aprender React** con ejemplos prácticos y comentados de todos los conceptos fundamentales.

---

## 🎯 TEMAS CUBIERTOS

### 1️⃣ **Estados, Props, Events y Formularios**
📁 **Archivo:** `src/examples/01-StatesPropsEvents.tsx`

#### Conceptos:
- **useState**: Añadir estado a componentes
- **Props**: Pasar datos entre componentes
- **Events**: Manejar eventos del usuario (click, change, etc.)
- **Forms**: Crear y gestionar formularios
- **Event Handlers**: Funciones que responden a eventos

#### Ejemplo simple:
```tsx
// Estado
const [count, setCount] = useState(0);

// Props
<ProductoComponent nombre="Laptop" precio={999} />

// Eventos
<button onClick={() => setCount(count + 1)}>Sumar</button>

// Cambios de input
<input onChange={(e) => setValue(e.target.value)} />
```

---

### 2️⃣ **Effects y Data Fetching**
📁 **Archivo:** `src/examples/02-EffectsDataFetching.tsx`

#### Conceptos:
- **useEffect**: Ejecutar código después del render
- **Dependencias**: Cuándo ejecutar un efecto
- **Cleanup**: Limpiar efectos (remover listeners, cancelar requests)
- **Fetch de datos**: Simular peticiones HTTP
- **Estados**: loading, error, datos

#### Ejemplo:
```tsx
// Ejecutar al montar (solo una vez)
useEffect(() => {
  console.log('Componente montado');
  return () => console.log('Componente desmontado');
}, []);

// Ejecutar cuando una variable cambia
useEffect(() => {
  fetchData(id);
}, [id]);

// sin array = ejecutar cada render
useEffect(() => {
  document.title = 'Nuevo título';
});
```

#### Array de dependencias:
```tsx
[]              // Ejecutar solo al montar
[variable]      // Ejecutar cuando variable cambia
[var1, var2]    // Ejecutar cuando alguna cambia
(sin array)     // Ejecutar cada render ⚠️
```

---

### 3️⃣ **Custom Hooks, Refs y State Avanzado**
📁 **Archivo:** `src/examples/03-CustomHooksRefsState.tsx`
📁 **Archivo:** `src/hooks/customHooks.ts` (8 custom hooks reutilizables)

#### Conceptos:

**useRef - Acceder al DOM:**
```tsx
const inputRef = useRef(null);
<input ref={inputRef} />
<button onClick={() => inputRef.current?.focus()}>Enfocar</button>
```

**useRef - Almacenamiento mutable (sin re-renders):**
```tsx
const renderCount = useRef(0);
renderCount.current++; // No causa re-render
```

**useCallback - Memorizar funciones:**
```tsx
const handleClick = useCallback(() => {
  // Lógica
}, [dependencia]);
```

**useMemo - Memorizar cálculos:**
```tsx
const resultado = useMemo(() => {
  return calcularAlgo(variable);
}, [variable]);
```

**Custom Hooks disponibles:**
- `useCounter`: Contador con increment/decrement/reset
- `useForm`: Manejo de formularios
- `useAsync`: Peticiones asincrónicas
- `usePrevious`: Obtener valor anterior
- `useLocalStorage`: Persistencia en localStorage
- `useFetch`: Fetch mejorado
- `useDebounce`: Debouncing de valores
- `useToggle`: Alternar booleanos

---

### 4️⃣ **State Management Avanzado**
📁 **Archivo:** `src/examples/04-StateManagement.tsx`

#### Conceptos:

**useReducer - State complejo:**
```tsx
const [state, dispatch] = useReducer(reducer, initialState);

dispatch({ type: 'ACCION', payload: datos });
```

**Context + Provider - State global:**
```tsx
// Crear contexto
const AppContext = createContext();

// Crear provider
<AppProvider>
  {/* Componentes hijos pueden acceder al contexto */}
</AppProvider>

// Usar en componentes
const { state, dispatch } = useContext(AppContext);
```

**Patrón:**
1. Crear Context
2. Crear Reducer (lógica)
3. Crear Provider (componente que provee)
4. Usar hook personalizado para acceder

---

## 🚀 CÓMO USAR EL PROYECTO

### Instalación
```bash
# Ir al directorio
cd d:\REACT\basic-react

# El servidor ya está corriendo en http://localhost:5173/
```

### Estructura de archivos
```
src/
├── App.tsx           # Componente principal con navegación
├── App.css           # Estilos
├── examples/         # Ejemplos numerados
│   ├── 01-StatesPropsEvents.tsx
│   ├── 02-EffectsDataFetching.tsx
│   ├── 03-CustomHooksRefsState.tsx
│   └── 04-StateManagement.tsx
├── hooks/            # Custom hooks reutilizables
│   └── customHooks.ts
└── assets/
```

---

## 📚 HOOKS DE REACT - REFERENCIA RÁPIDA

| Hook | Propósito | Ejemplo |
|------|-----------|---------|
| `useState` | Añadir estado | `const [count, setCount] = useState(0)` |
| `useEffect` | Efectos secundarios | `useEffect(() => {}, [])` |
| `useRef` | Referencias mutables | `const ref = useRef()` |
| `useContext` | Acceder a contexto | `const ctx = useContext(MyContext)` |
| `useReducer` | State complejo | `useReducer(reducer, initial)` |
| `useCallback` | Memorizar función | `useCallback(() => {}, deps)` |
| `useMemo` | Memorizar cálculo | `useMemo(() => {}, deps)` |

---

## 💡 TIPOGRAFÍA DE CONCEPTOS

### Props (Propiedades)
- Son argumentos que se pasan a componentes
- Fluyen de padre a hijo
- Son **de solo lectura** (inmutables)
- Se reciben como un objeto

```tsx
function Componente({ nombre, edad }) {
  return <p>{nombre} tiene {edad} años</p>;
}

<Componente nombre="Juan" edad={25} />
```

### State (Estado)
- Datos que pueden cambiar
- Causan re-renders cuando cambian
- Se crean con `useState`
- Específico de cada componente

```tsx
const [valor, setValor] = useState(inicial);
```

### Events (Eventos)
- Respuestas a acciones del usuario
- Nombres en camelCase: `onClick`, `onChange`, etc.
- Reciben un objeto de evento `e`

```tsx
<button onClick={() => console.log('Click!')}>Botón</button>
<input onChange={(e) => setValue(e.target.value)} />
```

---

## 🎓 EJERCICIOS SUGERIDOS

1. **Modificar `01-StatesPropsEvents.tsx`:**
   - Agregar más campos al formulario
   - Añadir validaciones
   - Crear un componente nuevo

2. **Expandir `02-EffectsDataFetching.tsx`:**
   - Cambiar el fetch simulado por una API real
   - Añadir búsqueda en tiempo real
   - Implementar paginación

3. **En `03-CustomHooksRefsState.tsx`:**
   - Crear uno o más custom hooks nuevos
   - Usar useRef para acceder a otros elementos
   - Combinar hooks de forma creativa

4. **Experimentar en `04-StateManagement.tsx`:**
   - Añadir más acciones al reducer
   - Crear nuevos contextos
   - Implementar persistencia con localStorage

---

## 🐛 CONSEJOS DE DEBUG

Abre la consola del navegador (**F12**) para ver:
- Logs de cada ejemplo
- Cuándo se montan/desmontan componentes
- Cuándo se ejecutan effects
- Estados globales

---

## 📖 COMENTARIOS EN EL CÓDIGO

Todos los archivos tienen comentarios extensos explicando:
- **QUÉ**: Qué hace el código
- **POR QUÉ**: Por qué se usa así
- **CUÁNDO**: Cuándo lo usarías en un proyecto real
- **CÓMO**: Cómo funciona internamente

**Recomendación:** Abre cada archivo en el editor y lee los comentarios cuidadosamente.

---

## 🔗 RECURSOS EXTERNOS

- [React Docs Oficial](https://react.dev/)
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/)
- [Vite](https://vite.dev/)

---

## ✅ RESUMEN FINAL

Con este proyecto tienes:
✅ Ejemplos prácticos de todos los hooks
✅ Code comentado y explicado
✅ Custom hooks reutilizables
✅ Patrones de state management
✅ Manejo de formularios
✅ Effects y data fetching
✅ Componentes bien estructurados
✅ Estilo CSS moderno

**¡Úsalo como referencia mientras aprendes y desarrollas con React!**

---

*Creado para estudio y referencia rápida - Feb 2026*
