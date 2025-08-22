import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import useFuncionarios from "../../hooks/useFuncionarios";

// Definir interfaces para los tipos
interface Funcionario {
  cedula: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  sexo: string;
  tipo_sangre: string;
  direccion_residencia: string;
  ciudad_nacimiento: string;
  estado: number | string;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface Filters {
  cedula: string;
  nombre: string;
}

const normalizeString = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

// Componente de paginación minimalista
const MinimalPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pages: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center mt-6 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 bg-white text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        <ChevronLeftRoundedIcon className="w-4 h-4" />
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            1
          </button>
          {startPage > 2 && <span className="text-gray-400">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex items-center justify-center w-8 h-8 rounded-md border ${
            currentPage === page
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="text-gray-400">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 bg-white text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        <ChevronRightRoundedIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function FuncionariosTable() {
  const { funcionarios, loading, error } = useFuncionarios();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    cedula: "",
    nombre: "",
  });
  const [filteredFuncionarios, setFilteredFuncionarios] = useState<
    Funcionario[]
  >([]);

  // Actualizar funcionarios filtrados cuando cambian los filtros o los datos
  useEffect(() => {
    if (funcionarios && funcionarios.length > 0) {
      let result: Funcionario[] = funcionarios;

      // Aplicar filtro por cédula
      if (filters.cedula) {
        result = result.filter((f) =>
          f.cedula.toString().includes(filters.cedula)
        );
      }

      if (filters.nombre) {
        result = result.filter((f: Funcionario) => {
          const nombreCompleto = `${f.primer_nombre} ${f.segundo_nombre} ${f.primer_apellido} ${f.segundo_apellido}`;
          return normalizeString(nombreCompleto).includes(
            normalizeString(filters.nombre)
          );
        });
      }

      setFilteredFuncionarios(result);
      setCurrentPage(1);
    }
  }, [funcionarios, filters]);

  // Calcular datos para la paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFuncionarios.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredFuncionarios.length / itemsPerPage);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const clearFilters = () => {
    setFilters({
      cedula: "",
      nombre: "",
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getEstadoInfo = (estado: number) => {
    return {
      texto: estado === 1 ? "Activo" : "Desactivado",
      color: estado === 1 ? "success" : ("error" as "success" | "error"),
    };
  };

  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Funcionarios
            </h3>
          </div>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 mb-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-hidden rounded-2xl border border-red-200 bg-red-50 px-4 pb-3 pt-4 dark:border-red-800 dark:bg-red-900/20 sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
              Error
            </h3>
          </div>
        </div>
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Funcionarios
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Mostrando {currentItems.length} de {filteredFuncionarios.length}{" "}
            registros
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            <TuneRoundedIcon />
            Filtro
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <RemoveRedEyeRoundedIcon />
            Ver todos
          </button>
        </div>
      </div>

      {/* Panel de Filtros */}
      {showFilters && (
        <div className="mb-4 p-4 border border-gray-200 rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="grid grid-cols-2 md:grid-cols- gap-4">
            {/* Filtros por cedula */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Buscar por cédula
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchRoundedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="cedula"
                  value={filters.cedula}
                  onChange={handleFilterChange}
                  className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Ingrese número de cédula"
                />
              </div>
            </div>
            {/* Filtros por nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Buscar por nombre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchRoundedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="nombre"
                  value={filters.nombre}
                  onChange={handleFilterChange}
                  className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Ingrese nombre"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-sm font-medium text-black bg-green-500 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
            >
              Limpiar filtro
            </button>
          </div>
        </div>
      )}

      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader={true}
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Funcionario
              </TableCell>
              <TableCell
                isHeader={true}
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Cédula
              </TableCell>
              <TableCell
                isHeader={true}
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Sexo
              </TableCell>
              <TableCell
                isHeader={true}
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Tipo de Sangre
              </TableCell>
              <TableCell
                isHeader={true}
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Dirección de residencia
              </TableCell>
              <TableCell
                isHeader={true}
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Ciudad de residencia
              </TableCell>
              <TableCell
                isHeader={true}
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Estado
              </TableCell>
              <TableCell
                isHeader={true}
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Hoja de Vida
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {currentItems.length > 0 ? (
              currentItems.map((funcionario: Funcionario) => {
                const nombreCompleto = `${funcionario.primer_nombre} ${funcionario.segundo_nombre} ${funcionario.primer_apellido} ${funcionario.segundo_apellido}`;

                return (
                  <TableRow key={funcionario.cedula} className="">
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-[50px] w-[50px] overflow-hidden rounded-md bg-gray-100 flex items-center justify-center dark:bg-gray-800">
                          <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                            {funcionario.primer_nombre.charAt(0)}
                            {funcionario.primer_apellido.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {nombreCompleto}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {funcionario.cedula}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {funcionario.sexo === "M" ? "Masculino" : "Femenino"}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {funcionario.tipo_sangre}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {funcionario.direccion_residencia}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {funcionario.ciudad_nacimiento}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={getEstadoInfo(Number(funcionario.estado)).color}
                      >
                        {getEstadoInfo(Number(funcionario.estado)).texto}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <button className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                        Ver
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              // Solución para el problema de colSpan - usar una fila nativa
              <tr>
                <td
                  colSpan={8}
                  className="py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No se encontraron funcionarios con los filtros aplicados
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginación minimalista personalizada */}
      {totalPages > 1 && (
        <div className="mt-6">
          <MinimalPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <div className="text-center mt-2 text-sm text-gray-500 dark:text-gray-400">
            Página {currentPage} de {totalPages}
          </div>
        </div>
      )}
    </div>
  );
}
