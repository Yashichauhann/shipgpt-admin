"use client";
import { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboardLayout";
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Modal,
    TextField,
    Stack,
    Chip
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
const MOCK_ADMINS = [
    { id: 1, name: "Yash Sharma", email: "yash@shippgpt.com", role: "Super Admin", status: "Active" },
    { id: 2, name: "Rahul Verma", email: "rahul@shippgpt.com", role: "Admin", status: "Active" },
    { id: 3, name: "Priya Singh", email: "priya@shippgpt.com", role: "Editor", status: "Inactive" },
];

export default function AdminManagementLayout() {
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
    const handleOpenView = (admin: any) => {
        setSelectedAdmin(admin);
        setOpenViewModal(true);
    };
    const handleCloseView = () => {
        setSelectedAdmin(null);
        setOpenViewModal(false);
    };

    const modalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'var(--card-bg)',
        color: 'var(--foreground)',
        boxShadow: 24,
        border: '1px solid var(--border)',
        p: 4,
        outline: 'none'
    };

    return (
        <DashboardLayout>
            <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4" fontWeight={700}>
                    Admin Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenAddModal(true)}
                    sx={{
                        bgcolor: "var(--card-bg)",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                        borderRadius: 0,
                        textTransform: "none",
                        px: 3,
                        py: 1.5,
                        "&:hover": {
                            bgcolor: "rgba(255,255,255,0.05)",
                            border: "1px solid var(--foreground)",
                        },
                    }}
                >
                    Add Admin
                </Button>
            </Box>

            {/* Admin Table */}
            <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid var(--border)", borderRadius: 0, bgcolor: "var(--card-bg)" }}>
                <Table sx={{ minWidth: 650 }} aria-label="admin table">
                    <TableHead sx={{ bgcolor: "var(--card-bg)" }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, color: "var(--foreground)" }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: "var(--foreground)" }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: "var(--foreground)" }}>Role</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: "var(--foreground)" }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: "var(--foreground)", textAlign: 'right' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {MOCK_ADMINS.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ fontWeight: 500, color: "var(--foreground)" }}>
                                    {row.name}
                                </TableCell>
                                <TableCell sx={{ color: "var(--foreground)" }}>{row.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={row.role}
                                        size="small"
                                        sx={{
                                            borderRadius: 0,
                                            bgcolor: 'rgba(255,255,255,0.05)',
                                            color: "var(--foreground)",
                                            fontWeight: 500
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ color: "var(--foreground)" }}>
                                    <Box sx={{
                                        display: 'inline-block',
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        bgcolor: row.status === 'Active' ? '#10b981' : '#ef4444',
                                        mr: 1
                                    }} />
                                    {row.status}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleOpenView(row)} sx={{ color: "var(--foreground)" }}>
                                        <RemoveRedEyeIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add Admin Modal */}
            <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" mb={3} fontWeight={600}>
                        Add New Admin
                    </Typography>
                    <Stack spacing={2}>
                        <TextField label="Full Name" fullWidth variant="outlined"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0, color: 'var(--foreground)', '& fieldset': { borderColor: 'var(--border)' } }, '& .MuiInputLabel-root': { color: 'var(--text-secondary)' }, '& .MuiInputLabel-root.Mui-focused': { color: 'var(--foreground)' } }}
                        />
                        <TextField label="Email Address" type="email" fullWidth variant="outlined"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0, color: 'var(--foreground)', '& fieldset': { borderColor: 'var(--border)' } }, '& .MuiInputLabel-root': { color: 'var(--text-secondary)' }, '& .MuiInputLabel-root.Mui-focused': { color: 'var(--foreground)' } }}
                        />
                        <TextField label="Role" fullWidth variant="outlined"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0, color: 'var(--foreground)', '& fieldset': { borderColor: 'var(--border)' } }, '& .MuiInputLabel-root': { color: 'var(--text-secondary)' }, '& .MuiInputLabel-root.Mui-focused': { color: 'var(--foreground)' } }}
                        />
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                                mt: 2,
                                bgcolor: "var(--card-bg)",
                                color: "var(--foreground)",
                                border: "1px solid var(--border)",
                                borderRadius: 0,
                                "&:hover": { bgcolor: "rgba(255,255,255,0.05)", border: "1px solid var(--foreground)" },
                            }}
                            onClick={() => setOpenAddModal(false)}
                        >
                            Create Admin
                        </Button>
                    </Stack>
                </Box>
            </Modal>

            {/* View Details Modal */}
            <Modal open={openViewModal} onClose={handleCloseView}>
                <Box sx={modalStyle}>
                    {selectedAdmin && (
                        <>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" fontWeight={600}>
                                    Admin Details
                                </Typography>
                                <Chip label={selectedAdmin.status} size="small" sx={{ borderRadius: 0 }} />
                            </Box>

                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="caption" color="text.secondary">Name</Typography>
                                    <Typography variant="body1" fontWeight={500}>{selectedAdmin.name}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" color="text.secondary">Email</Typography>
                                    <Typography variant="body1">{selectedAdmin.email}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" color="text.secondary">Role</Typography>
                                    <Typography variant="body1">{selectedAdmin.role}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" color="text.secondary">Permissions</Typography>
                                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                        <Chip label="User Mgmt" size="small" variant="outlined" sx={{ borderRadius: 0 }} />
                                        <Chip label="PDF Mgmt" size="small" variant="outlined" sx={{ borderRadius: 0 }} />
                                        <Chip label="Settings" size="small" variant="outlined" sx={{ borderRadius: 0 }} />
                                    </Box>
                                </Box>
                            </Stack>

                            <Button
                                variant="outlined"
                                fullWidth
                                sx={{
                                    mt: 4,
                                    borderColor: "var(--border)",
                                    color: "var(--foreground)",
                                    borderRadius: 0,
                                    "&:hover": { borderColor: "var(--foreground)", bgcolor: 'transparent' },
                                }}
                                onClick={handleCloseView}
                            >
                                Close
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
        </DashboardLayout>
    );
}
