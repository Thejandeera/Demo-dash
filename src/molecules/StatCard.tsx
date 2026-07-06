import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  gradientBg: string;
  iconBgColor: string;
  valueColor?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  gradientBg,
  iconBgColor,
  valueColor = "white",
}: StatCardProps) {
  return (
    <Paper
      elevation={10}
      sx={{
        p: 4,
        borderRadius: 4,
        background: gradientBg,
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
          backgroundColor: iconBgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="subtitle2" sx={{ color: "rgba(255, 255, 255, 0.5)", fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, mt: 0.5, color: valueColor }}>
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}
