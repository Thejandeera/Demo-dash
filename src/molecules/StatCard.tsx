import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  gradientBg?: string;
  iconBgColor?: string;
  valueColor?: string;
}

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 4,
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        color: "#0f172a",
        display: "flex",
        alignItems: "center",
        gap: 3,
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          backgroundColor: "#f1f5f9",
          color: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ color: "#475569", fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, mt: 0.5, color: "#0f172a" }}>
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}
