"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { useAppSelector } from "@/store";
import PrimaryButton from "@/atoms/PrimaryButton";

export default function LandingPage() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        color: "#0f172a",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 8 },
            borderRadius: 6,
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            textAlign: "center",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.5rem", md: "4rem" },
              color: "#0f172a",
              mb: 3,
              letterSpacing: "-0.02em",
            }}
          >
            Demo 1
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "#475569",
              fontWeight: 400,
              mb: 5,
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            demostration 1
          </Typography>

          {isAuthenticated ? (
            <Box>
              <Typography variant="body1" sx={{ color: "#0f172a", mb: 3, fontWeight: 600 }}>
                Logged in as {user?.name}
              </Typography>
              <PrimaryButton
                component={Link}
                href="/dashboard"
                size="large"
                sx={{
                  px: 4,
                  py: 1.8,
                  borderRadius: 3,
                  fontSize: "1.1rem",
                }}
              >
                Go to Dashboard
              </PrimaryButton>
            </Box>
          ) : (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PrimaryButton
                component={Link}
                href="/signin"
                size="large"
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  px: 5,
                  py: 1.8,
                  borderRadius: 3,
                  fontSize: "1.1rem",
                }}
              >
                Sign In
              </PrimaryButton>

              <PrimaryButton
                component={Link}
                href="/signup"
                variant="outlined"
                size="large"
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  px: 5,
                  py: 1.8,
                  borderRadius: 3,
                  fontSize: "1.1rem",
                }}
              >
                Sign Up
              </PrimaryButton>
            </Stack>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
