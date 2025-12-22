import { Box } from "@mui/material";
import Sidebar from "@/components/widgets/Sidebar";
import Navbar from "@/components/widgets/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar – 20% */}
      <Box sx={{ width: "20%" }}>
        <Sidebar />
      </Box>

      {/* Main – 80% */}
      <Box sx={{ width: "80%" }}>
        <Navbar />
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
