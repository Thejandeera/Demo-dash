import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import { User } from "@/types";

export interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  return (
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
          Demo Portal
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.7)", display: { xs: "none", sm: "block" } }}
          >
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
            onClick={onLogout}
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
  );
}
