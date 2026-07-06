"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/features/auth/authSlice";
import ProtectedRoute from "@/organisms/ProtectedRoute/ProtectedRoute";
import { users } from "@/data/users";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";

const drawerWidth = 240;

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
      <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#0f172a", color: "white" }}>
        {/* Top AppBar */}
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: "linear-gradient(90deg, #1e293b 0%, #0f172a 100%)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "none",
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 800,
                background: "linear-gradient(90deg, #60a5fa 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Dashboard
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", display: { xs: "none", sm: "block" } }}>
                Hello, <strong>{user?.name}</strong>
              </Typography>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                  fontSize: "0.875rem",
                  fontWeight: 700,
                }}
              >
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </Avatar>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  borderColor: "rgba(239, 68, 68, 0.4)",
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
          </Toolbar>
        </AppBar>

        {/* Side Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#1e293b",
              borderRight: "1px solid rgba(255, 255, 255, 0.08)",
              color: "white",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto", mt: 2 }}>
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    sx={{
                      mx: 1.5,
                      my: 0.5,
                      borderRadius: 2,
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography sx={{ fontSize: "0.95rem", fontWeight: 500 }}>
                          {item.text}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Main Content Area */}
        <Box component="main" sx={{ flexGrow: 1, p: 4, mt: 8 }}>
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
                <Paper
                  elevation={10}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      backgroundColor: "rgba(59, 130, 246, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PeopleIcon sx={{ fontSize: "2.5rem", color: "#60a5fa" }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 600 }}>
                      Total Registered Users
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800, mt: 0.5 }}>
                      {users.length}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              {/* Stat Card 2: Active Session */}
              <Grid size={{ xs: 12, sm: 6 }}>
                <Paper
                  elevation={10}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      backgroundColor: "rgba(16, 185, 129, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <SecurityIcon sx={{ fontSize: "2.5rem", color: "#34d399" }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 600 }}>
                      Active Session Status
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 800, mt: 0.5, color: "#34d399" }}>
                      Verified
                    </Typography>
                  </Box>
                </Paper>
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
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
