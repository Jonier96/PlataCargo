import { useModalContext } from '../../hooks/useModalContext';
import Modal from '../ui/modal/Modal';
import FormAgregarFuncionario from './FormAgregarFuncionario';
import FormDesactivarFuncionario from './FormDesactivarFuncionario';
import FormModificarFuncionario from './FormModificarFuncionario';

export default function ModalManager() {
  const { isOpen, modalType, closeModal, modalData } = useModalContext();

  const renderModalContent = () => {
    switch (modalType) {
      case 'agregar':
        return <FormAgregarFuncionario />;
      case 'desactivar':
        return <FormDesactivarFuncionario />;
      case 'modificar':
        return <FormModificarFuncionario />;
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'agregar':
        return 'Agregar Nuevo Funcionario';
      case 'desactivar':
        return 'Desactivar Funcionario';
      case 'modificar':
        return modalData ? `Modificar Funcionario: ${modalData.cedula}` : 'Modificar Funcionario';
      default:
        return '';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={getModalTitle()}
      size={modalType === 'modificar' ? 'lg' : 'md'}
    >
      {renderModalContent()}
    </Modal>
  );
}