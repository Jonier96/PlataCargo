import { useState, useEffect } from 'react';

export interface Funcionario {
  cedula: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  sexo: string;
  tipo_sangre: string;
  direccion_residencia: string;
  ciudad_nacimiento: string;
  estado: string;
}

export default function useFuncionarios() {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [totalEmpleados, setTotalEmpleados] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Llamadas en paralelo
        const [listRes, metricasRes] = await Promise.all([
          fetch('http://localhost:3000/api/funcionarios'),
          fetch('http://localhost:3000/api/funcionarios/metricas')
        ]);

        if (!listRes.ok || !metricasRes.ok) {
          throw new Error('Error al obtener datos de funcionarios');
        }

        const [listData, metricasData] = await Promise.all([
          listRes.json(),
          metricasRes.json()
        ]);

        setFuncionarios(listData);
        setTotalEmpleados(metricasData.totalEmpleados || 0);

      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { 
    funcionarios, 
    totalEmpleados, 
    loading, 
    error 
  };
}
