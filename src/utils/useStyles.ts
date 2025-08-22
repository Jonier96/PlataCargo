// src/utils/useStyles.ts
import { SxProps, Theme } from "@mui/material/styles";

export const commonInputStyles: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px", // esquinas redondeadas
    backgroundColor: "#fff", // fondo blanco
    "& fieldset": {
      borderColor: "#d1d5db", // gris claro por defecto (similar a Tailwind border-gray-300)
    },
    "&:hover fieldset": {
      borderColor: "#6ee7b7", // verde suave en hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#34d399", // verde fuerte en foco
      boxShadow: "0 0 0 2px rgba(52, 211, 153, 0.2)", // efecto glow verde
    },
  },
  "& input": {
    padding: "10px 14px", // espacio interno como en tu screenshot
  },
};

export const primaryButtonStyles: SxProps<Theme> = {
  backgroundColor: "#10b981", // verde base (tailwind emerald-500)
  color: "#fff",
  fontWeight: "bold",
  textTransform: "none", // evita que se ponga todo en MAYÚSCULAS
  borderRadius: "12px",
  padding: "8px 20px",
  "&:hover": {
    backgroundColor: "#059669", // verde más oscuro
  },
  "&:disabled": {
    backgroundColor: "#a7f3d0", // verde claro cuando está deshabilitado
    color: "#fff",
  },
};

export const secondaryButtonStyles: SxProps<Theme> = {
  backgroundColor: "#ef4444", // rojo base (tailwind red-500)
  color: "#fff",
  fontWeight: "bold",
  textTransform: "none",
  borderRadius: "12px",
  padding: "8px 20px",
  "&:hover": {
    backgroundColor: "#dc2626", // rojo más oscuro
  },
  "&:disabled": {
    backgroundColor: "#fecaca", // rojo claro deshabilitado
    color: "#fff",
  },
};