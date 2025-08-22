import { GroupIcon } from "../../icons";
import { PersonRemove, PersonAdd, Edit } from '@mui/icons-material';
import Button from "../ui/button/Button";
import { useModalContext } from "../../hooks/useModalContext";

export default function Acciones() {
  const { openModal } = useModalContext();

  // Configuración de acciones dinámicas
  const acciones = [
    {
      id: 'agregar',
      titulo: 'Agregar Funcionario',
      icono: PersonAdd,
      accion: () => openModal('agregar')
    },
    {
      id: 'desactivar',
      titulo: 'Desactivar Funcionario',
      icono: PersonRemove,
      accion: () => openModal('desactivar')
    },
    {
      id: 'modificar',
      titulo: 'Modificar/Actualizar',
      icono: Edit,
      accion: () => openModal('modificar')
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 cols-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800">
            <GroupIcon className="text-gray-800 size-5 dark:text-white/90" />
          </div>
          <span className="text-lg font-medium text-gray-800 dark:text-white">
            Acciones
          </span>
        </div>

        <div className="space-y-2">
          {acciones.map((accion) => {
            const IconoComponente = accion.icono;
            return (
              <Button 
                key={accion.id}
                onClick={accion.accion}
                className="w-full flex items-center justify-start gap-3 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-700/50 transition-colors"
                aria-label={accion.titulo}
              >
                <div className={`flex items-center justify-center w-6 h-6 rounded-md ${
                  accion.id === 'agregar' ? 'bg-green-500' : 
                  accion.id === 'desactivar' ? 'bg-red-500' : 
                  'bg-blue-500'
                }`}>
                  <IconoComponente className="text-white size-3.5" />
                </div>
                {accion.titulo}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}