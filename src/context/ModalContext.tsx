import { createContext, useState, ReactNode } from 'react';

// Interface basada en tu estructura de base de datos
export interface FuncionarioData {
  cedula: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  tipo_documento: string;
  sexo: string;
  tipo_sangre: string;
  fecha_nacimiento: string;
  ciudad_nacimiento: string;
  direccion_residencia: string;
  celular: string;
  correo_electronico: string;
  estado: string;
}

export interface ModalContextType {
  isOpen: boolean;
  modalType: string | null;
  modalData: FuncionarioData | null;
  openModal: (type: string, data?: FuncionarioData) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Props para el ModalProvider
interface ModalProviderProps {
  children: ReactNode;
}

// Componente Provider
export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [modalData, setModalData] = useState<FuncionarioData | null>(null);

  const openModal = (type: string, data?: FuncionarioData) => {
    setModalType(type);
    setModalData(data || null);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalType(null);
    setModalData(null);
  };

  const value: ModalContextType = {
    isOpen,
    modalType,
    modalData,
    openModal,
    closeModal
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;