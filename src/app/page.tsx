"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { useAppSelector } from "@/store";

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
        background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #2e1065 100%)",
        color: "white",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={24}
          sx={{
            p: { xs: 4, md: 8 },
            borderRadius: 6,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            textAlign: "center",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2.5rem", md: "4rem" },
              background: "linear-gradient(90deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
              letterSpacing: "-0.02em",
            }}
          >
            Antigravity Auth
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontWeight: 400,
              mb: 5,
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            A high-performance atomic authentication flow engineered with Next.js, Redux Toolkit, and Material UI.
          </Typography>

          {isAuthenticated ? (
            <Box>
              <Typography variant="body1" sx={{ color: "#a78bfa", mb: 3, fontWeight: 600 }}>
                Logged in as {user?.name}
              </Typography>
              <Button
                component={Link}
                href="/dashboard"
                variant="contained"
                size="large"
                sx={{
                  px: 4,
                  py: 1.8,
                  borderRadius: 3,
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
                  boxShadow: "0 4px 20px rgba(59, 130, 246, 0.4)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 25px rgba(59, 130, 246, 0.5)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                Go to Dashboard
              </Button>
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
              <Button
                component={Link}
                href="/signin"
                variant="contained"
                size="large"
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  px: 5,
                  py: 1.8,
                  borderRadius: 3,
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
                  boxShadow: "0 4px 20px rgba(59, 130, 246, 0.4)",
                  "&:hover": {
                    background: "linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 25px rgba(59, 130, 246, 0.5)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                Sign In
              </Button>

              <Button
                component={Link}
                href="/signup"
                variant="outlined"
                size="large"
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  px: 5,
                  py: 1.8,
                  borderRadius: 3,
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  borderColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.2s ease-in-out",
                }}
              >
                Sign Up
              </Button>
            </Stack>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
