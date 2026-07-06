import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

export type AuthInputProps = TextFieldProps;

const AuthInput = React.forwardRef<HTMLDivElement, AuthInputProps>(
  ({ slotProps, ...props }, ref) => {
    return (
      <TextField
        ref={ref}
        slotProps={{
          ...slotProps,
          inputLabel: {
            style: { color: "rgba(255, 255, 255, 0.7)" },
            ...(slotProps?.inputLabel && typeof slotProps.inputLabel === "object" ? slotProps.inputLabel : {}),
          },
          input: {
            style: { color: "white" },
            ...(slotProps?.input && typeof slotProps.input === "object" ? slotProps.input : {}),
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255, 255, 255, 0.2)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#60a5fa",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#60a5fa",
              },
              ...((slotProps?.input && typeof slotProps.input === "object" && (slotProps.input as any).sx) || {}),
            },
          },
        }}
        {...props}
      />
    );
  }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;
