import { useState } from "react";
import useFuncionarios from "../../hooks/useFuncionarios";
import Label from "../form/Label";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useModalContext } from "../../hooks/useModalContext";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import {
  commonInputStyles,
  primaryButtonStyles,
  secondaryButtonStyles,
} from "../../utils/useStyles";

export default function FormAgregarFuncionario() {
  const { agregarFuncionario, operationLoading, operationError } =
    useFuncionarios();
  const { closeModal } = useModalContext();
  const [formData, setFormData] = useState({
    cedula: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    tipo_documento: "",
    sexo: "",
    tipo_sangre: "",
    fecha_nacimiento: "",
    ciudad_nacimiento: "",
    direccion_residencia: "",
    celular: "",
    correo_electronico: "",
    estado: "activo",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: string, date: string) => {
    setFormData((prev) => ({ ...prev, [name]: date }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await agregarFuncionario(formData);
      closeModal();
    } catch (error) {
      console.error("Error al agregar funcionario:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {operationError && (
        <div className="p-4 text-red-700 bg-red-100 rounded-lg dark:bg-red-900/30 dark:text-red-200">
          {operationError}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cedula">Cédula</Label>
          <TextField
            type="text"
            id="cedula"
            name="cedula"
            value={formData.cedula}
            onChange={handleInputChange}
            required
            sx={commonInputStyles}
          />
        </div>

        {/* Tipo de Documento */}
        <div>
          <Label htmlFor="tipo_documento">Tipo de Documento</Label>
          <FormControl variant="outlined" sx={commonInputStyles}>
            <Select
              value={formData.tipo_documento?.trim() || ""}
              displayEmpty
              onChange={(e) =>
                handleSelectChange("tipo_documento", e.target.value)
              }
            >
              <MenuItem value="">
                <em>Seleccione</em>
              </MenuItem>
              <MenuItem value="CC">Cédula</MenuItem>
              <MenuItem value="pasaporte">Pasaporte</MenuItem>
              <MenuItem value="otro">Otro</MenuItem>
            </Select>
            <FormHelperText>Selecciona un tipo válido</FormHelperText>
          </FormControl>
        </div>

        <div>
          <Label htmlFor="primer_nombre">Primer Nombre</Label>
          <TextField
            type="text"
            id="primer_nombre"
            name="primer_nombre"
            value={formData.primer_nombre}
            onChange={handleInputChange}
            required
            sx={commonInputStyles}
          />
        </div>
        <div>
          <Label htmlFor="segundo_nombre">Segundo Nombre</Label>
          <TextField
            type="text"
            id="segundo_nombre"
            name="segundo_nombre"
            value={formData.segundo_nombre}
            onChange={handleInputChange}
            sx={commonInputStyles}
          />
        </div>
        <div>
          <Label htmlFor="primer_apellido">Primer Apellido</Label>
          <TextField
            type="text"
            id="primer_apellido"
            name="primer_apellido"
            value={formData.primer_apellido}
            onChange={handleInputChange}
            required
            sx={commonInputStyles}
          />
        </div>
        <div>
          <Label htmlFor="segundo_apellido">Segundo Apellido</Label>
          <TextField
            type="text"
            id="segundo_apellido"
            name="segundo_apellido"
            value={formData.segundo_apellido}
            onChange={handleInputChange}
            sx={commonInputStyles}
          />
        </div>

        {/* Sexo */}
        <div>
          <Label htmlFor="sexo">Sexo</Label>
          <FormControl variant="outlined" sx={commonInputStyles}>
            <Select
              value={formData.sexo || ""}
              displayEmpty
              onChange={(e) => handleSelectChange("sexo", e.target.value)}
            >
              <MenuItem value="">
                <em>Seleccione</em>
              </MenuItem>
              <MenuItem value="masculino">Masculino</MenuItem>
              <MenuItem value="femenino">Femenino</MenuItem>
              <MenuItem value="otro">Otro</MenuItem>
            </Select>
            <FormHelperText>Selecciona un sexo válido</FormHelperText>
          </FormControl>
        </div>

        {/* Tipo de Sangre */}
        <div>
          <Label htmlFor="tipo_sangre">Tipo de Sangre</Label>
          <FormControl variant="outlined" sx={commonInputStyles}>
            <Select
              value={formData.tipo_sangre || ""}
              displayEmpty
              onChange={(e) =>
                handleSelectChange("tipo_sangre", e.target.value)
              }
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
            <FormHelperText>Selecciona un tipo válido</FormHelperText>
          </FormControl>
        </div>

        <div>
          <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
          <TextField
            type="date"
            id="fecha_nacimiento"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={(e) =>
              handleDateChange("fecha_nacimiento", e.target.value)
            }
            sx={commonInputStyles}
          />
        </div>
        <div>
          <Label htmlFor="ciudad_nacimiento">Ciudad de Nacimiento</Label>
          <TextField
            type="text"
            id="ciudad_nacimiento"
            name="ciudad_nacimiento"
            value={formData.ciudad_nacimiento}
            onChange={handleInputChange}
            sx={commonInputStyles}
          />
        </div>
        <div>
          <Label htmlFor="direccion_residencia">Dirección de Residencia</Label>
          <TextField
            type="text"
            id="direccion_residencia"
            name="direccion_residencia"
            value={formData.direccion_residencia}
            onChange={handleInputChange}
            sx={commonInputStyles}
            required
          />
        </div>
        <div>
          <Label htmlFor="celular">Celular</Label>
          <TextField
            type="tel"
            id="celular"
            name="celular"
            value={formData.celular}
            onChange={handleInputChange}
            sx={commonInputStyles}
            required
          />
        </div>
        <div>
          <Label htmlFor="correo_electronico">Correo Electrónico</Label>
          <TextField
            type="email"
            id="correo_electronico"
            name="correo_electronico"
            value={formData.correo_electronico}
            onChange={handleInputChange}
            sx={commonInputStyles}
            required
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button
          sx={secondaryButtonStyles}
          onClick={closeModal}
          disabled={operationLoading}
        >
          Cancelar
        </Button>

        <Button
          sx={primaryButtonStyles}
          onClick={handleSubmit}
          disabled={operationLoading}
        >
          {operationLoading ? "Agregando..." : "Agregar Funcionario"}
        </Button>
      </div>
    </form>
  );
}
