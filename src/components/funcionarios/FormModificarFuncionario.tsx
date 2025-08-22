import { useState, useEffect } from "react";
import useFuncionarios from "../../hooks/useFuncionarios";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useModalContext, FuncionarioData } from "../../hooks/useModalContext";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function FormModificarFuncionario() {
  const {
    modificarFuncionario,
    obtenerFuncionario,
    operationLoading,
    operationError,
  } = useFuncionarios();
  const { closeModal, modalData } = useModalContext();
  const [cedula, setCedula] = useState("");
  const [funcionario, setFuncionario] = useState<FuncionarioData | null>(null);
  const [formData, setFormData] = useState<Partial<FuncionarioData>>({
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    tipo_documento: "",
    sexo: "",
    tipo_sangre: "",
    fecha_nacimiento: new Date().toISOString().split("T")[0],
    ciudad_nacimiento: "",
    direccion_residencia: "",
    celular: "",
    correo_electronico: "",
    estado: "activo",
  });

  console.log("Modal Data:", formData);
  useEffect(() => {
    if (modalData) {
      setCedula(modalData.cedula);
      setFuncionario(modalData);
      setFormData(modalData);
    }
  }, [modalData]);

  const buscarFuncionario = async (cedula: string) => {
    try {
      const data = await obtenerFuncionario(cedula);
      setFuncionario(data);
      setFormData(data);
    } catch (error) {
      console.error("Error al buscar funcionario:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await modificarFuncionario(cedula, formData);
      closeModal();
    } catch (error) {
      console.error("Error al modificar funcionario:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {operationError && (
        <div className="p-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-200">
          {operationError}
        </div>
      )}

      {!funcionario && (
        <div>
          <Label htmlFor="cedula">Cédula del Funcionario</Label>
          <div className="flex gap-2">
            <Input
              type="text"
              id="cedula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              placeholder="Ingrese la cédula del funcionario a modificar"
            />
            <Button
              onClick={() => buscarFuncionario(cedula)}
              disabled={operationLoading}
            >
              Buscar
            </Button>
          </div>
        </div>
      )}

      {funcionario && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primer_nombre">Primer Nombre</Label>
              <Input
                type="text"
                id="primer_nombre"
                name="primer_nombre"
                value={formData.primer_nombre || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="segundo_nombre">Segundo Nombre</Label>
              <Input
                type="text"
                id="segundo_nombre"
                name="segundo_nombre"
                value={formData.segundo_nombre || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="primer_apellido">Primer Apellido</Label>
              <Input
                type="text"
                id="primer_apellido"
                name="primer_apellido"
                value={formData.primer_apellido || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="segundo_apellido">Segundo Apellido</Label>
              <Input
                type="text"
                id="segundo_apellido"
                name="segundo_apellido"
                value={formData.segundo_apellido || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="tipo_documento">Tipo de Documento</Label>
              <Select
                value={formData.tipo_documento?.trim() || ""}
                onChange={(e) =>
                  handleSelectChange("tipo_documento", e.target.value)
                }
                displayEmpty
                sx={{ marginRight: 2, minWidth: 120 }}
              >
                <MenuItem value="">
                  <em>Seleccione</em>
                </MenuItem>
                <MenuItem value="CC">Cédula</MenuItem>
                <MenuItem value="pasaporte">Pasaporte</MenuItem>
                <MenuItem value="otro">Otro</MenuItem>
              </Select>
            </div>
            <div>
              <Label htmlFor="sexo">Sexo</Label>
              <Select
                value={formData.sexo || ""}
                onChange={(e) => handleSelectChange("sexo", e.target.value)}
                displayEmpty
                sx={{ marginRight: 2, minWidth: 120 }}
              >
                <MenuItem value="">
                  <em>Seleccione</em>
                </MenuItem>
                <MenuItem value="M">Masculino</MenuItem>
                <MenuItem value="F">Femenino</MenuItem>
                <MenuItem value="O">Otro</MenuItem>
              </Select>
            </div>
            <div>
              <Label htmlFor="tipo_sangre">Tipo de Sangre</Label>
              <Select
                value={formData.tipo_sangre || ""}
                onChange={(e) =>
                  handleSelectChange("tipo_sangre", e.target.value)
                }
                displayEmpty
                sx={{ marginRight: 2, minWidth: 120 }}
              >
                <MenuItem value="">
                  <em>Seleccione</em>
                </MenuItem>
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB-</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
              </Select>
            </div>
            <div>
              <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
              <Input
                type="date"
                id="fecha_nacimiento"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="ciudad_nacimiento">Ciudad de Nacimiento</Label>
              <Input
                type="text"
                id="ciudad_nacimiento"
                name="ciudad_nacimiento"
                value={formData.ciudad_nacimiento || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="direccion_residencia">
                Dirección de Residencia
              </Label>
              <Input
                type="text"
                id="direccion_residencia"
                name="direccion_residencia"
                value={formData.direccion_residencia || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="celular">Celular</Label>
              <Input
                type="tel"
                id="celular"
                name="celular"
                value={formData.celular || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="correo_electronico">Correo Electrónico</Label>
              <Input
                type="email"
                id="correo_electronico"
                name="correo_electronico"
                value={formData.correo_electronico || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="estado">Estado</Label>
              <Select
                value={formData.estado || ""}
                onChange={(e) =>
                  handleSelectChange("estado", e.target.value)
                }
                displayEmpty
                sx={{ marginRight: 2, minWidth: 120 }}
              >
                <MenuItem value="">
                  <em>Seleccione</em>
                </MenuItem>
                <MenuItem value="1">Activo</MenuItem>
                <MenuItem value="0">Inactivo</MenuItem>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={closeModal}
              disabled={operationLoading}
            >
              Cancelar
            </Button>
            <Button disabled={operationLoading}>
              {operationLoading ? "Actualizando..." : "Actualizar Funcionario"}
            </Button>
          </div>
        </>
      )}
    </form>
  );
}
