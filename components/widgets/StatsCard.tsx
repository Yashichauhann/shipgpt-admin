import { Box, Typography } from "@mui/material";

export default function StatsCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <Box
      sx={{
        p: 3,
        border: "1px solid var(--border)",
        borderRadius: 0,
        bgcolor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <Typography variant="body2">{title}</Typography>
      <Typography variant="h4" fontWeight={600}>
        {value}
      </Typography>
      <Typography variant="caption">December, 2025</Typography>
    </Box>
  );
}
