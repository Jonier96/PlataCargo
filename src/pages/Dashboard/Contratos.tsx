import EcommerceMetrics from "../../components/contratos/EmployeesContMetrics";
import Acciones from "../../components/contratos/AccionesCont";
import RecentOrders from "../../components/contratos/ContList";
import DemographicCard from "../../components/contratos/AgenciContCard";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Planta de Cargos | Contratos"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />
          <Acciones />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 ">
          <RecentOrders />
        </div> 
      </div>
    </>
  );
}
