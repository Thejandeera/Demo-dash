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
            style: { color: "#475569" },
            ...(slotProps?.inputLabel && typeof slotProps.inputLabel === "object" ? slotProps.inputLabel : {}),
          },
          input: {
            style: { color: "#0f172a" },
            ...(slotProps?.input && typeof slotProps.input === "object" ? slotProps.input : {}),
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#cbd5e1",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0f172a",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#0f172a",
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
