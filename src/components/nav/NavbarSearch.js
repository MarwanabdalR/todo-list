"use client";

import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import { styled, alpha } from "@mui/material/styles";

function SearchIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </SvgIcon>
  );
}

const SearchWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.08),
  },
  marginLeft: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: alpha(theme.palette.common.black, 0.35),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#555",
  fontSize: "0.85rem",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0.8, 1.5, 0.8, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    width: "22ch",
    "&::placeholder": { color: "#aaa", opacity: 1 },
  },
}));

export default function NavbarSearch() {
  return (
    <SearchWrapper>
      <SearchIconWrapper>
        <SearchIcon sx={{ fontSize: 18 }} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search tasks…"
        inputProps={{ "aria-label": "search tasks" }}
      />
    </SearchWrapper>
  );
}
