import { useContext } from 'react';
import ModalContext, { FuncionarioData } from '../context/ModalContext';

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

// Exportamos el tipo para usarlo en otros componentes
export type { FuncionarioData };