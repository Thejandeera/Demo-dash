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
          backgroundColor: "#f8fafc",
          borderRight: "1px solid #e2e8f0",
          color: "#0f172a",
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
