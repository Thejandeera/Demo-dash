import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export interface PrimaryButtonProps extends Omit<ButtonProps, "component"> {
  loading?: boolean;
  component?: React.ElementType;
  href?: string;
}

export default function PrimaryButton({
  children,
  loading = false,
  disabled = false,
  variant = "contained",
  sx = {},
  ...props
}: PrimaryButtonProps) {
  const containedStyles = {
    background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
    boxShadow: "0 4px 20px rgba(59, 130, 246, 0.4)",
    color: "white",
    "&:hover": {
      background: "linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)",
      transform: "translateY(-2px)",
      boxShadow: "0 6px 25px rgba(59, 130, 246, 0.5)",
    },
  };

  const outlinedStyles = {
    borderColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    "&:hover": {
      borderColor: "white",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      transform: "translateY(-2px)",
    },
  };

  const extraStyles = variant === "contained" ? containedStyles : variant === "outlined" ? outlinedStyles : {};

  return (
    <Button
      variant={variant}
      disabled={disabled || loading}
      sx={{
        textTransform: "none",
        fontWeight: 700,
        transition: "all 0.2s ease-in-out",
        ...extraStyles,
        ...sx,
      }}
      {...props}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );
}
