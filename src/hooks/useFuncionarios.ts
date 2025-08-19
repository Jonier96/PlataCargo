import { useState, useEffect } from 'react';

export default function useFuncionarios() {
  const [totalEmpleados, setTotalEmpleados] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetricas = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/funcionarios/metricas');
        
        if (!response.ok) {
          throw new Error('Error al obtener métricas');
        }
        
        const data = await response.json();
        setTotalEmpleados(data.totalEmpleados || 0);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMetricas();
  }, []);

  return { 
    totalEmpleados, 
    loading, 
    error 
  };
}