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
    backgroundColor: "#0f172a",
    boxShadow: "none",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#1e293b",
      boxShadow: "none",
    },
  };

  const outlinedStyles = {
    borderColor: "#e2e8f0",
    color: "#0f172a",
    backgroundColor: "transparent",
    "&:hover": {
      borderColor: "#0f172a",
      backgroundColor: "#f8fafc",
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
