"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/features/auth/authSlice";
import ProtectedRoute from "@/organisms/ProtectedRoute/ProtectedRoute";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/signin");
  };

  return (
    <ProtectedRoute>
      <Box
        sx={{
          minHeight: "100vh",
          background: "#0f172a",
          color: "white",
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 6,
              pb: 3,
              borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                background: "linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Dashboard
            </Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                borderColor: "rgba(239, 68, 68, 0.5)",
                color: "#f87171",
                "&:hover": {
                  borderColor: "#ef4444",
                  backgroundColor: "rgba(239, 68, 68, 0.08)",
                },
              }}
            >
              Sign Out
            </Button>
          </Box>

          {/* Content */}
          <Grid container spacing={4}>
            {/* User Info Card */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={10}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  background: "rgba(30, 41, 59, 0.5)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mb: 2,
                    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                    fontSize: "2rem",
                    fontWeight: 700,
                  }}
                >
                  {user?.name ? user.name[0].toUpperCase() : "U"}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {user?.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.5)", mb: 2 }}>
                  {user?.email}
                </Typography>
                <Box
                  sx={{
                    px: 2,
                    py: 0.5,
                    borderRadius: 10,
                    backgroundColor: "rgba(16, 185, 129, 0.15)",
                    color: "#34d399",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                  }}
                >
                  Active Session
                </Box>
              </Paper>
            </Grid>

            {/* Welcome and stats */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Paper
                elevation={10}
                sx={{
                  p: 4,
                  height: "100%",
                  borderRadius: 4,
                  background: "rgba(30, 41, 59, 0.5)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "white",
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  Welcome back, {user?.name}!
                </Typography>
                <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.7)", mb: 4 }}>
                  This is a secure area. You have successfully authenticated using the mock Redux slice and your session persists inside localStorage.
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { label: "User ID", value: user?.id },
                    { label: "Session Status", value: "Verified" },
                    { label: "Role", value: "Administrator" },
                  ].map((stat, i) => (
                    <Grid size={{ xs: 12, sm: 4 }} key={i}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 3,
                          backgroundColor: "rgba(15, 23, 42, 0.4)",
                          border: "1px solid rgba(255, 255, 255, 0.05)",
                        }}
                      >
                        <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.4)", display: "block" }}>
                          {stat.label}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: "#60a5fa" }}>
                          {stat.value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ProtectedRoute>
  );
}
