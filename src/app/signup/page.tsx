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
import Alert from "@mui/material/Alert";

import { useAppDispatch, useAppSelector } from "@/store";
import { registerUser, clearError } from "@/features/auth/authSlice";
import AuthInput from "@/atoms/AuthInput";
import PrimaryButton from "@/atoms/PrimaryButton";

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
        backgroundColor: "#f8fafc",
        padding: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 5,
          width: "100%",
          maxWidth: 420,
          borderRadius: 5,
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          color: "#0f172a",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 800,
              color: "#0f172a",
              mb: 1,
            }}
          >
            Create Account
          </Typography>
          <Typography variant="body2" sx={{ color: "#475569" }}>
            Sign up to get started with your account
          </Typography>
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: 2,
              backgroundColor: "#fef2f2",
              color: "#ef4444",
              border: "1px solid #fee2e2",
              "& .MuiAlert-icon": {
                color: "#ef4444",
              },
            }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <AuthInput
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
          />

          <AuthInput
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
          />

          <AuthInput
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
          />

          <PrimaryButton
            type="submit"
            fullWidth
            disabled={loading}
            loading={loading}
            sx={{
              mt: 4,
              mb: 3,
              py: 1.5,
              borderRadius: 2.5,
              fontSize: "1rem",
            }}
          >
            Sign Up
          </PrimaryButton>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#475569" }}>
              Already have an account?{" "}
              <Link
                href="/signin"
                style={{
                  color: "#2563eb",
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
