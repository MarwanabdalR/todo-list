"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import NavbarSearch from "./NavbarSearch";

function DashboardIcon() {
  return (
    // Dashboard icon
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="white"
    >
      <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #e0e0e0",
        color: "#333",
      }}
    >
      <Toolbar
        sx={{
          minHeight: "52px !important",
          px: 2.5,
          flexWrap: { xs: "wrap", sm: "nowrap" },
          py: { xs: 1.5, sm: 0 },
          gap: { xs: 0.5, sm: 0 },
        }}
      >
        {/* Logo and title */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              width: 34,
              height: 34,
              backgroundColor: "#6c63ff",
              borderRadius: 1.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DashboardIcon />
          </Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "0.8rem",
              color: "#1a1a2e",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Kanban Board
          </Typography>
        </Box>

        {/* Search bar */}
        <NavbarSearch />
      </Toolbar>
    </AppBar>
  );
}
