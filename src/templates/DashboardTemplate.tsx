import React from "react";
import Box from "@mui/material/Box";

export interface DashboardTemplateProps {
  header: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function DashboardTemplate({ header, sidebar, children }: DashboardTemplateProps) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#ffffff", color: "#0f172a" }}>
      {header}
      {sidebar}
      <Box component="main" sx={{ flexGrow: 1, p: 4, mt: 8, backgroundColor: "#ffffff" }}>
        {children}
      </Box>
    </Box>
  );
}
