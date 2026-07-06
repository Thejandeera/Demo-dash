import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export interface NavigationItem {
  text: string;
  icon: React.ReactNode;
}

export interface SidebarNavigationProps {
  items: NavigationItem[];
  onItemClick?: (text: string) => void;
}

export default function SidebarNavigation({ items, onItemClick }: SidebarNavigationProps) {
  return (
    <List>
      {items.map((item) => (
        <ListItem key={item.text} disablePadding>
          <ListItemButton
            onClick={() => onItemClick?.(item.text)}
            sx={{
              mx: 1.5,
              my: 0.5,
              borderRadius: 2,
              color: "#334155",
              "&:hover": {
                backgroundColor: "#f1f5f9",
                color: "#0f172a",
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
  );
}
