/**
 * ============================================
 * CUSTOM HOOKS - Hooks personalizados
 * ============================================
 * 
 * Los custom hooks son funciones que reutilizan lógica de hooks de React.
 * Permiten compartir lógica entre componentes de forma elegante.
 */

import { useState, useEffect, useRef, useCallback } from 'react';

// ==========================================
// 1. useCounter - Manejo básico de estado
// ==========================================
export function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// ==========================================
// 2. useForm - Manejo de formularios
// ==========================================
export function useForm(initialValues: any) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  const resetForm = () => setValues(initialValues);

  return { values, handleChange, handleSubmit, resetForm, setErrors, errors };
}

// ==========================================
// 3. useAsync - Para peticiones HTTP
// ==========================================
export function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle'); // idle | pending | success | error
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // useCallback memoriza la función para evitar dependencias infinitas
  const execute = useCallback(async () => {
    setStatus('pending');
    setData(null);
    setError(null);

    try {
      const res = await asyncFunction();
      setData(res);
      setStatus('success');
      return res;
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  }, [asyncFunction]);

  // useEffect: ejecuta efectos después del render
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, data, error };
}

// ==========================================
// 4. usePrevious - Acceder al valor anterior
// ==========================================
export function usePrevious(value) {
  // useRef: crea una referencia mutable que persiste entre renders
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// ==========================================
// 5. useLocalStorage - Persistencia en localStorage
// ==========================================
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

// ==========================================
// 6. useFetch - Fetch de datos mejorado
// ==========================================
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // para evitar memory leaks

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error en la petición');
        
        const json = await response.json();
        if (isMounted) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setData(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    // Cleanup function - se ejecuta cuando el componente se desmonta
    return () => {
      isMounted = false;
    };
  }, [url]); // Dependencias: se ejecuta cuando url cambia

  return { data, loading, error };
}

// ==========================================
// 7. useDebounce - Debouncing de valores
// ==========================================
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Configurar un timeout
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: limpiar el timeout anterior
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// ==========================================
// 8. useToggle - Alternar booleanos
// ==========================================
export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);

  return [value, toggle];
}
