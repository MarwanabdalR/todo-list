import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import NavbarSearch from "./NavbarSearch";
// icon nav
function DashboardIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 0h8v8h-8z" />
    </SvgIcon>
  );
}

export default function Navbar() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e0e0e0",
        color: "#333",
      }}
    >
      <Toolbar sx={{ minHeight: "52px !important", px: 2 }}>
        {/* logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 34,
              height: 34,
              backgroundColor: "#6c63ff",
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DashboardIcon sx={{ color: "#fff", fontSize: 18 }} />
          </Box>
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "0.8rem",
                lineHeight: 1.2,
                color: "#1a1a2e",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Kanban Board
            </Typography>
            <Typography sx={{ color: "#999", fontSize: "0.7rem" }}>
              10 tasks
            </Typography>
          </Box>
        </Box>
        {/* search */}
        <NavbarSearch />
      </Toolbar>
    </AppBar>
  );
}
