import { useState } from 'react';
import  useFuncionarios  from '../../hooks/useFuncionarios';
import Label from '../form/Label';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { useModalContext } from "../../hooks/useModalContext";
import {
  primaryButtonStyles,
  secondaryButtonStyles,
} from "../../utils/useStyles";

export default function FormDesactivarFuncionario() {
  const { desactivarFuncionario, operationLoading, operationError } = useFuncionarios();
  const { closeModal } = useModalContext();
  const [cedula, setCedula] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await desactivarFuncionario(cedula);
      closeModal();
    } catch (error) {
      console.error('Error al desactivar funcionario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {operationError && (
        <div className="p-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-200">
          {operationError}
        </div>
      )}
      <div>
        <Label htmlFor="cedula">Cédula del Funcionario</Label>
        <Input
          type="text"
          id="cedula"
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          placeholder="Ingrese la cédula del funcionario a desactivar"
          required
        />
      </div>
      <div className="flex justify-end gap-2 pt-4">
         <Button
          sx={secondaryButtonStyles}
          onClick={closeModal}
          disabled={operationLoading}
        >
          Cancelar
        </Button>
        <Button  sx={primaryButtonStyles} disabled={operationLoading}>
          {operationLoading ? 'Desactivando...' : 'Desactivar Funcionario'}
        </Button>
      </div>
    </form>
  );
}