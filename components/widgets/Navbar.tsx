import { Box, Typography, Avatar } from "@mui/material";

export default function Navbar() {
    return (
        <Box
            sx={{
                height: 64,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 3,
                borderBottom: "1px solid var(--border)",
                bgcolor: "var(--background)",
                color: "var(--foreground)",
            }}
        >
            <Typography fontWeight={600}>Dashboard</Typography>

            <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2">ADMIN</Typography>
                <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
            </Box>
        </Box>
    );
}
