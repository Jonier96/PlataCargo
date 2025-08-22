import EcommerceMetrics from "../../components/funcionarios/EmployeesMetrics";
import RecentOrders from "../../components/funcionarios/EmployeesList";
import DemographicCard from "../../components/funcionarios/AgenciCard";
import PageMeta from "../../components/common/PageMeta";
import Acciones from "../../components/funcionarios/Acciones";
import ModalManager from "../../components/funcionarios/ModalManager";
import { ModalProvider } from "../../context/ModalContext"; // Importar el ModalProvider

export default function FuncionariosPage() {
  return (
    <ModalProvider> {/* Envuelve solo el contenido de esta página */}
      <>
        <PageMeta
          title="Planta de Cargos | Funcionarios"
          description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
        />
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 space-y-6 xl:col-span-7">
            <EcommerceMetrics />
            <Acciones />
            <ModalManager />
          </div>

          <div className="col-span-12 xl:col-span-5">
            <DemographicCard />
          </div>

          <div className="col-span-12">
            <RecentOrders />
          </div>
        </div>
      </>
    </ModalProvider>
  );
}