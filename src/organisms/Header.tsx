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
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        boxShadow: "none",
        color: "#0f172a",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            fontWeight: 800,
            color: "#0f172a",
          }}
        >
          Demo Portal
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            variant="body2"
            sx={{ color: "#475569", display: { xs: "none", sm: "block" } }}
          >
            Hello, <strong>{user?.name}</strong>
          </Typography>
          <Avatar
            sx={{
              width: 32,
              height: 32,
              backgroundColor: "#f1f5f9",
              color: "#0f172a",
              fontSize: "0.875rem",
              fontWeight: 700,
              border: "1px solid #e2e8f0",
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
              borderColor: "#ef4444",
              color: "#ef4444",
              "&:hover": {
                borderColor: "#dc2626",
                backgroundColor: "#fef2f2",
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
