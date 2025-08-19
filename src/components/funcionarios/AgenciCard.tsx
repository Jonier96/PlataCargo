import { useState } from "react";
import { ChevronDown, ChevronRight, MoreHorizontal } from "lucide-react";

export default function DemographicCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedAgencies, setExpandedAgencies] =  useState<{ [key: number]: boolean }>({});

  // Datos de ejemplo para agencias y empleados
  const agenciasData = [
    {
      id: 1,
      nombre: "Agencia Norte",
      totalEmpleados: 45,
      empleados: [
        { id: 1, nombre: "Juan Pérez", cargo: "Gerente", departamento: "Ventas" },
        { id: 2, nombre: "María García", cargo: "Analista", departamento: "Marketing" },
        { id: 3, nombre: "Carlos López", cargo: "Desarrollador", departamento: "IT" },
        { id: 4, nombre: "Ana Martín", cargo: "Contadora", departamento: "Finanzas" }
      ]
    },
    {
      id: 2,
      nombre: "Agencia Sur",
      totalEmpleados: 32,
      empleados: [
        { id: 5, nombre: "Pedro Rodríguez", cargo: "Supervisor", departamento: "Operaciones" },
        { id: 6, nombre: "Laura Sánchez", cargo: "Asistente", departamento: "RRHH" },
        { id: 7, nombre: "Miguel Torres", cargo: "Técnico", departamento: "Soporte" }
      ]
    },
    {
      id: 3,
      nombre: "Agencia Central",
      totalEmpleados: 28,
      empleados: [
        { id: 8, nombre: "Sofia Herrera", cargo: "Coordinadora", departamento: "Proyectos" },
        { id: 9, nombre: "Diego Morales", cargo: "Especialista", departamento: "Calidad" },
        { id: 10, nombre: "Elena Vargas", cargo: "Ejecutiva", departamento: "Ventas" }
      ]
    }
  ];

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  function toggleAgency(agencyId: number) {
    setExpandedAgencies(prev => ({
      ...prev,
      [agencyId]: !prev[agencyId]
    }));
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Empleados por Agencia
          </h3>
          <p className="mt-1 text-gray-500 text-sm dark:text-gray-400">
            Lista detallada de empleados organizados por agencia
          </p>
        </div>
        <div className="relative inline-block">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <MoreHorizontal className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-lg bg-white p-2 shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 z-10">
              <button
                onClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300 px-3 py-2"
              >
                View More
              </button>
              <button
                onClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300 px-3 py-2"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        {/* Encabezados de la tabla */}
        <div className="grid grid-cols-12 gap-4 pb-3 border-b border-gray-200 dark:border-gray-700">
          <div className="col-span-5">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Agencia / Empleado
            </span>
          </div>
          <div className="col-span-2">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Cargo
            </span>
          </div>
          <div className="col-span-3">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Departamento
            </span>
          </div>
          <div className="col-span-2">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Total
            </span>
          </div>
        </div>

        {/* Lista de agencias y empleados */}
        <div className="space-y-1 mt-3">
          {agenciasData.map((agencia) => (
            <div key={agencia.id}>
              {/* Fila de la agencia */}
              <div 
                className="grid grid-cols-12 gap-4 py-3 hover:bg-gray-50 dark:hover:bg-white/[0.02] rounded-lg cursor-pointer transition-colors"
                onClick={() => toggleAgency(agencia.id)}
              >
                <div className="col-span-5 flex items-center">
                  {expandedAgencies[agencia.id] ? (
                    <ChevronDown className="w-4 h-4 mr-2 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 mr-2 text-gray-500" />
                  )}
                  <div className="w-3 h-3 rounded bg-blue-500 mr-3"></div>
                  <span className="font-semibold text-gray-800 dark:text-white/90">
                    {agencia.nombre}
                  </span>
                </div>
                <div className="col-span-3 flex items-center">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    Agencia
                  </span>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    -
                  </span>
                </div>
                <div className="col-span-2 flex items-center">
                  <span className="font-medium text-gray-800 dark:text-white/90 text-sm">
                    {agencia.totalEmpleados} empleados
                  </span>
                </div>
              </div>

              {/* Lista de empleados (mostrar solo si está expandida) */}
              {expandedAgencies[agencia.id] && (
                <div className="ml-6 space-y-1">
                  {agencia.empleados.map((empleado) => (
                    <div 
                      key={empleado.id}
                      className="grid grid-cols-12 gap-4 py-2 hover:bg-gray-50 dark:hover:bg-white/[0.02] rounded-lg transition-colors"
                    >
                      <div className="col-span-5 flex items-center">
                        <div className="w-2 h-2 rounded-full bg-green-400 mr-3 ml-2"></div>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {empleado.nombre}
                        </span>
                      </div>
                      <div className="col-span-3 flex items-center">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          {empleado.cargo}
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <span className="text-gray-600 dark:text-gray-400 text-sm">
                          {empleado.departamento}
                        </span>
                      </div>
                      <div className="col-span-2 flex items-center">
                        <span className="text-gray-500 dark:text-gray-500 text-sm">
                          -
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Resumen total */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-5">
              <span className="font-semibold text-gray-800 dark:text-white/90">
                Total General
              </span>
            </div>
            <div className="col-span-5"></div>
            <div className="col-span-2">
              <span className="font-semibold text-gray-800 dark:text-white/90">
                {agenciasData.reduce((total, agencia) => total + agencia.totalEmpleados, 0)} empleados
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}