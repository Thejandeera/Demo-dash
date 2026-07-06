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
import { loginUser, clearError } from "@/features/auth/authSlice";
import AuthInput from "@/atoms/AuthInput";
import PrimaryButton from "@/atoms/PrimaryButton";

const schema = yup.object().shape({
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

export default function SignInPage() {
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
    const result = await dispatch(loginUser({ email: data.email, password: data.password }));
    if (loginUser.fulfilled.match(result)) {
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
            Welcome Back
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
            Please sign in to access your account
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
          <AuthInput
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
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
            Sign In
          </PrimaryButton>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)" }}>
              Don't have an account?{" "}
              <Link
                href="/signup"
                style={{
                  color: "#60a5fa",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
