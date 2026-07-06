"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import { useAppDispatch, useAppSelector } from "@/store";
import { registerUser, clearError } from "@/features/auth/authSlice";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required.")
    .min(2, "Name must be at least 2 characters."),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email address is required."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters.")
    .required("Password is required."),
});

type FormData = yup.InferType<typeof schema>;

export default function SignUpPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Clear authentication errors when navigating to the page
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // If already authenticated, redirect to the dashboard
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: FormData) => {
    const result = await dispatch(
      registerUser({ name: data.name, email: data.email, password: data.password })
    );
    if (registerUser.fulfilled.match(result)) {
      router.push("/dashboard");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #2e1065 100%)",
        padding: 3,
      }}
    >
      <Paper
        elevation={24}
        sx={{
          p: 5,
          width: "100%",
          maxWidth: 420,
          borderRadius: 5,
          background: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          color: "white",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)",
        }}
      >
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 800,
              background: "linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Create Account
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
            Sign up to get started with your account
          </Typography>
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
              backgroundColor: "rgba(239, 68, 68, 0.12)",
              color: "#f87171",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              "& .MuiAlert-icon": {
                color: "#f87171",
              },
            }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            autoComplete="name"
            autoFocus
            disabled={loading}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            slotProps={{
              inputLabel: {
                style: { color: "rgba(255, 255, 255, 0.7)" },
              },
              input: {
                style: { color: "white" },
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
                },
              },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            disabled={loading}
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            slotProps={{
              inputLabel: {
                style: { color: "rgba(255, 255, 255, 0.7)" },
              },
              input: {
                style: { color: "white" },
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
                },
              },
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            disabled={loading}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              inputLabel: {
                style: { color: "rgba(255, 255, 255, 0.7)" },
              },
              input: {
                style: { color: "white" },
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
                },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 4,
              mb: 3,
              py: 1.5,
              borderRadius: 2.5,
              fontWeight: 700,
              textTransform: "none",
              fontSize: "1rem",
              background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
              boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.4)",
              "&:hover": {
                background: "linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)",
                transform: "translateY(-1px)",
                boxShadow: "0 6px 20px 0 rgba(59, 130, 246, 0.5)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
          </Button>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
              Already have an account?{" "}
              <Link
                href="/signin"
                style={{
                  color: "#60a5fa",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Sign In
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
