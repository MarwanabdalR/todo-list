"use client";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import { useSearch } from "@/context/SearchContext";
import { useEffect, useState } from "react";

function SearchIcon() {
  return (
    // Search icon
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  );
}

export default function NavbarSearch() {
  const { setSearch } = useSearch();
  const [value, setValue] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setSearch(value), 300);
    return () => clearTimeout(t);
  }, [value, setSearch]);

  return (
    <Box
      sx={{
        ml: { xs: 0, sm: "auto" },
        mt: { xs: 1, sm: 0 },
        display: "flex",
        alignItems: "center",
        position: "relative",
        flexGrow: { xs: 1, sm: 0 },
        width: { xs: "100%", sm: "auto" },
      }}
    >
      {/* Search icon */}
      <Box
        sx={{
          position: "absolute",
          left: 10,
          color: "#bbb",
          display: "flex",
          alignItems: "center",
          pointerEvents: "none",
        }}
      >
        <SearchIcon />
      </Box>

      {/* Search input */}
      <InputBase
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search tasks…"
        inputProps={{ "aria-label": "search tasks" }}
        sx={{
          pl: "34px",
          pr: 1.5,
          py: 0.7,
          border: "1.5px solid #e8e8e8",
          borderRadius: 2,
          backgroundColor: "#f7f7f7",
          fontSize: "0.85rem",
          width: "100%",
          maxWidth: { sm: 220 },
          "&.Mui-focused": { borderColor: "#6c63ff", backgroundColor: "#fff" },
          "& input::placeholder": { color: "#bbb", opacity: 1 },
        }}
      />
    </Box>
  );
}
