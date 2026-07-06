"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/features/auth/authSlice";
import ProtectedRoute from "@/organisms/ProtectedRoute/ProtectedRoute";
import { users } from "@/data/users";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";

import Header from "@/organisms/Header";
import Sidebar from "@/organisms/Sidebar";
import StatCard from "@/molecules/StatCard";
import DashboardTemplate from "@/templates/DashboardTemplate";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/signin");
  };

  const menuItems = [
    { text: "Overview", icon: <DashboardIcon sx={{ color: "#60a5fa" }} /> },
    { text: "Profile", icon: <PersonIcon sx={{ color: "#a78bfa" }} /> },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <ProtectedRoute>
      <DashboardTemplate
        header={<Header user={user} onLogout={handleLogout} />}
        sidebar={<Sidebar drawerWidth={240} menuItems={menuItems} />}
      >
        <Container maxWidth="lg" sx={{ mt: 2 }}>
          {/* Header section */}
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              Overview Dashboard
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255, 255, 255, 0.6)" }}>
              Welcome back to your workspace. Here is an overview of the system state.
            </Typography>
          </Box>

          {/* Stats Cards Grid */}
          <Grid container spacing={4} sx={{ mb: 5 }}>
            {/* Stat Card 1: Total Users */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <StatCard
                title="Total Registered Users"
                value={users.length}
                icon={<PeopleIcon sx={{ fontSize: "2.5rem", color: "#60a5fa" }} />}
                gradientBg="linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)"
                iconBgColor="rgba(59, 130, 246, 0.15)"
              />
            </Grid>

            {/* Stat Card 2: Active Session */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <StatCard
                title="Active Session Status"
                value="Verified"
                icon={<SecurityIcon sx={{ fontSize: "2.5rem", color: "#34d399" }} />}
                gradientBg="linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)"
                iconBgColor="rgba(16, 185, 129, 0.15)"
                valueColor="#34d399"
              />
            </Grid>
          </Grid>

          {/* Profile Detail Summary Box */}
          <Paper
            elevation={10}
            sx={{
              p: 4,
              borderRadius: 4,
              background: "rgba(30, 41, 59, 0.4)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "white",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
              Profile Quick-View
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.4)", display: "block" }}>
                  Account ID
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, color: "#a78bfa" }}>
                  USR-{user?.id ?? "UNKNOWN"}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.4)", display: "block" }}>
                  Authentication Email
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, color: "#60a5fa" }}>
                  {user?.email ?? "N/A"}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </DashboardTemplate>
    </ProtectedRoute>
  );
}
