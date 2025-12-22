"use client";
import DashboardLayout from "@/components/layouts/dashboardLayout";
import { Box } from "@mui/material";
import StatsCard from "@/components/widgets/StatsCard";
export default function DashboardPage() {
  return (
    <DashboardLayout>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Box sx={{ flex: { xs: "1 1 100%", md: "0 1 calc(33.333% - 16px)" } }}>
          <StatsCard title="Total Admins" value={0} />
        </Box>
        <Box sx={{ flex: { xs: "1 1 100%", md: "0 1 calc(33.333% - 16px)" } }}>
          <StatsCard title="Total Users" value={0} />
        </Box>
        <Box sx={{ flex: { xs: "1 1 100%", md: "0 1 calc(33.333% - 16px)" } }}>
          <StatsCard title="Total Category" value={0} />
        </Box>
      </Box>
    </DashboardLayout>
  );
}
