import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import SidebarNavigation, { NavigationItem } from "@/molecules/SidebarNavigation";

export interface SidebarProps {
  drawerWidth: number;
  menuItems: NavigationItem[];
  onItemClick?: (text: string) => void;
}

export default function Sidebar({ drawerWidth, menuItems, onItemClick }: SidebarProps) {
  return (
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
        <SidebarNavigation items={menuItems} onItemClick={onItemClick} />
      </Box>
    </Drawer>
  );
}
