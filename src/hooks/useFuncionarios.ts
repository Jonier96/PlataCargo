import { useState, useEffect } from 'react';
import { FuncionarioData } from './useModalContext';

export default function useFuncionarios() {
  const [funcionarios, setFuncionarios] = useState<FuncionarioData[]>([]);
  const [totalEmpleados, setTotalEmpleados] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [operationLoading, setOperationLoading] = useState(false);
  const [operationError, setOperationError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

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

      const [listData, metricesData] = await Promise.all([
        listRes.json(),
        metricasRes.json()
      ]);

      setFuncionarios(listData);
      setTotalEmpleados(metricesData.totalEmpleados || 0);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  // Agregar un nuevo funcionario
  const agregarFuncionario = async (funcionarioData: FuncionarioData) => {
  try {
    setOperationLoading(true);
    setOperationError(null);

    const response = await fetch("http://localhost:3000/api/funcionarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(funcionarioData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al agregar funcionario");
    }

    const nuevoFuncionario = await response.json();

    setFuncionarios((prev) => [...prev, nuevoFuncionario]);
    setTotalEmpleados((prev) => prev + 1);

    return nuevoFuncionario;
  } catch (err) {
    if (err instanceof Error) {
      setOperationError(err.message);
    }
    throw err;
  } finally {
    setOperationLoading(false);
  }
};

  // Desactivar un funcionario
  const desactivarFuncionario = async (cedula: string) => {
    try {
      setOperationLoading(true);
      setOperationError(null);

      const response = await fetch(`http://localhost:3000/api/funcionarios/${cedula}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: 'inactivo' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al desactivar funcionario');
      }

      // Actualizar estado local
      setFuncionarios(prev =>
        prev.map(func =>
          func.cedula === cedula ? { ...func, estado: 'inactivo' } : func
        )
      );

    } catch (err) {
      if (err instanceof Error) {
        setOperationError(err.message);
      }
      throw err;
    } finally {
      setOperationLoading(false);
    }
  };

  // Modificar un funcionario
  const modificarFuncionario = async (cedula: string, funcionarioData: Partial<FuncionarioData>) => {
    try {
      setOperationLoading(true);
      setOperationError(null);

      const response = await fetch(`http://localhost:3000/api/funcionarios/${cedula}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(funcionarioData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al modificar funcionario');
      }

      const funcionarioActualizado = await response.json();

      // Actualizar estado local
      setFuncionarios(prev =>
        prev.map(func =>
          func.cedula === cedula ? { ...func, ...funcionarioActualizado } : func
        )
      );

      return funcionarioActualizado;
    } catch (err) {
      if (err instanceof Error) {
        setOperationError(err.message);
      }
      throw err;
    } finally {
      setOperationLoading(false);
    }
  };

  // Obtener un funcionario específico por cédula
  const obtenerFuncionario = async (cedula: string) => {
    try {
      setOperationLoading(true);
      setOperationError(null);

      const response = await fetch(`http://localhost:3000/api/funcionarios/${cedula}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al obtener funcionario');
      }

      const funcionario = await response.json();
      return funcionario;
    } catch (err) {
      if (err instanceof Error) {
        setOperationError(err.message);
      }
      throw err;
    } finally {
      setOperationLoading(false);
    }
  };

  return {
    funcionarios,
    totalEmpleados,
    loading,
    error,
    operationLoading,
    operationError,
    agregarFuncionario,
    desactivarFuncionario,
    modificarFuncionario,
    obtenerFuncionario,
    refetch: fetchData
  };
}