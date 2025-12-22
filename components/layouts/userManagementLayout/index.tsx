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
    Chip,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Switch
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

// Mock Data
const INITIAL_USERS = [
    { id: 1, name: "Amit Kumar", email: "amit@example.com", company: "Logistics One", status: "Active", joined: "2024-01-15" },
    { id: 2, name: "Sarah Jenkins", email: "sarah@shipping.co", company: "FastTrack", status: "Blocked", joined: "2024-02-20" },
    { id: 3, name: "Mike Ross", email: "mike@transporter.net", company: "Global Moves", status: "Active", joined: "2024-03-10" },
];

export default function UserManagementLayout() {
    const [users, setUsers] = useState(INITIAL_USERS);

    // Modal States
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);

    // Selection State
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);

    // Handlers
    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, user: any) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(user);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleView = () => {
        setOpenViewModal(true);
        handleMenuClose();
    };

    const handleEdit = () => {
        setOpenEditModal(true);
        handleMenuClose();
    };

    const handleToggleStatusClick = (user: any) => {
        setSelectedUser(user);
        setOpenConfirmModal(true);
    };

    const confirmStatusChange = () => {
        if (selectedUser) {
            const newStatus = selectedUser.status === "Active" ? "Blocked" : "Active";
            setUsers(users.map(u => u.id === selectedUser.id ? { ...u, status: newStatus } : u));
            setOpenConfirmModal(false);
            setSelectedUser(null);
        }
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

    const confirmModalStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'var(--card-bg)',
        color: 'var(--foreground)',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        outline: 'none',
        border: '1px solid var(--border)',
        textAlign: 'center'
    };

    return (
        <DashboardLayout>
            {/* ... keeping previous content until Menu ... */}
            <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4" fontWeight={700}>
                    User Management
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
                    Add User
                </Button>
            </Box>

            {/* User Table */}
            <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid var(--border)", borderRadius: 0, bgcolor: "var(--card-bg)" }}>
                <Table sx={{ minWidth: 650 }} aria-label="user table">
                    <TableHead sx={{ bgcolor: "var(--card-bg)" }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, color: "var(--foreground)" }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: "var(--foreground)" }}>Email</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: "var(--foreground)" }}>Ships</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: "var(--foreground)" }}>Joined Date</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: "var(--foreground)" }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: "var(--foreground)", textAlign: 'right' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ fontWeight: 500, color: "var(--foreground)" }}>
                                    {row.name}
                                </TableCell>
                                <TableCell sx={{ color: "var(--foreground)" }}>{row.email}</TableCell>
                                <TableCell sx={{ color: "var(--foreground)" }}>{row.company}</TableCell>
                                <TableCell sx={{ color: "var(--foreground)" }}>{row.joined}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={row.status === 'Active'}
                                        onChange={() => handleToggleStatusClick(row)}
                                        color="success"
                                        sx={{
                                            '& .MuiSwitch-track': { bgcolor: 'var(--text-secondary)' }
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        onClick={(e) => handleMenuOpen(e, row)}
                                        sx={{ color: "var(--foreground)" }}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        borderRadius: 0,
                        boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                        border: '1px solid var(--border)',
                        minWidth: 150,
                        bgcolor: 'var(--card-bg)',
                        color: 'var(--foreground)'
                    }
                }}
            >
                <MenuItem onClick={handleView} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
                    <ListItemIcon sx={{ color: 'var(--foreground)' }}><RemoveRedEyeIcon fontSize="small" /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ color: 'var(--foreground)' }}>View Details</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleEdit} sx={{ '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
                    <ListItemIcon sx={{ color: 'var(--foreground)' }}><EditIcon fontSize="small" /></ListItemIcon>
                    <ListItemText primaryTypographyProps={{ color: 'var(--foreground)' }}>Edit User</ListItemText>
                </MenuItem>
            </Menu>

            {/* Add User Modal */}
            <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" mb={3} fontWeight={600}>
                        Add New User
                    </Typography>
                    <Stack spacing={2}>
                        <TextField label="Full Name" fullWidth variant="outlined"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0, color: 'var(--foreground)', '& fieldset': { borderColor: 'var(--border)' } }, '& .MuiInputLabel-root': { color: 'var(--text-secondary)' }, '& .MuiInputLabel-root.Mui-focused': { color: 'var(--foreground)' } }}
                        />
                        <TextField label="Email Address" type="email" fullWidth variant="outlined"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0, color: 'var(--foreground)', '& fieldset': { borderColor: 'var(--border)' } }, '& .MuiInputLabel-root': { color: 'var(--text-secondary)' }, '& .MuiInputLabel-root.Mui-focused': { color: 'var(--foreground)' } }}
                        />
                        <TextField label="Company Name" fullWidth variant="outlined"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0, color: 'var(--foreground)', '& fieldset': { borderColor: 'var(--border)' } }, '& .MuiInputLabel-root': { color: 'var(--text-secondary)' }, '& .MuiInputLabel-root.Mui-focused': { color: 'var(--foreground)' } }}
                        />
                        <TextField label="Phone Number" fullWidth variant="outlined"
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
                            Create User
                        </Button>
                    </Stack>
                </Box>
            </Modal>

            {/* Edit User Modal */}
            <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" mb={3} fontWeight={600}>
                        Edit User
                    </Typography>
                    <Stack spacing={2}>
                        <TextField label="Full Name" defaultValue={selectedUser?.name} fullWidth variant="outlined"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0, color: 'var(--foreground)', '& fieldset': { borderColor: 'var(--border)' } }, '& .MuiInputLabel-root': { color: 'var(--text-secondary)' }, '& .MuiInputLabel-root.Mui-focused': { color: 'var(--foreground)' } }}
                        />
                        <TextField label="Email Address" defaultValue={selectedUser?.email} type="email" fullWidth variant="outlined"
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 0, color: 'var(--foreground)', '& fieldset': { borderColor: 'var(--border)' } }, '& .MuiInputLabel-root': { color: 'var(--text-secondary)' }, '& .MuiInputLabel-root.Mui-focused': { color: 'var(--foreground)' } }}
                        />
                        <TextField label="Company Name" defaultValue={selectedUser?.company} fullWidth variant="outlined"
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
                            onClick={() => setOpenEditModal(false)}
                        >
                            Save Changes
                        </Button>
                    </Stack>
                </Box>
            </Modal>

            {/* View Details Modal */}
            <Modal open={openViewModal} onClose={() => setOpenViewModal(false)}>
                <Box sx={modalStyle}>
                    {selectedUser && (
                        <>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" fontWeight={600}>
                                    User Profile
                                </Typography>
                                <Chip label={selectedUser.status} size="small" sx={{ borderRadius: 0 }}
                                    color={selectedUser.status === 'Active' ? 'success' : 'error'}
                                    variant="outlined"
                                />
                            </Box>

                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="caption" color="text.secondary">Full Name</Typography>
                                    <Typography variant="body1" fontWeight={500}>{selectedUser.name}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" color="text.secondary">Email Address</Typography>
                                    <Typography variant="body1">{selectedUser.email}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" color="text.secondary">Company</Typography>
                                    <Typography variant="body1">{selectedUser.company}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" color="text.secondary">Date Joined</Typography>
                                    <Typography variant="body1">{selectedUser.joined}</Typography>
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
                                onClick={() => setOpenViewModal(false)}
                            >
                                Close
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>

            {/* Confirmation Pop-up */}
            <Modal open={openConfirmModal} onClose={() => setOpenConfirmModal(false)}>
                <Box sx={confirmModalStyle}>
                    <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: "var(--foreground)" }}>
                        {selectedUser?.status === "Active" ? "Disable Profile" : "Enable Profile"}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3, color: "var(--text-secondary)" }}>
                        Are you sure you want to {selectedUser?.status === "Active" ? "disable" : "enable"} this user&#39;s profile?
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button
                            variant="outlined"
                            onClick={() => setOpenConfirmModal(false)}
                            sx={{
                                borderRadius: 0,
                                color: 'var(--foreground)',
                                borderColor: 'var(--foreground)',
                                minWidth: 100,
                                "&:hover": { borderColor: 'var(--foreground)', bgcolor: 'rgba(255, 255, 255, 0.05)' }
                            }}
                        >
                            NO
                        </Button>
                        <Button
                            variant="contained"
                            onClick={confirmStatusChange}
                            sx={{
                                borderRadius: 0,
                                bgcolor: 'var(--foreground)',
                                color: 'var(--background)',
                                minWidth: 100,
                                "&:hover": { bgcolor: 'rgba(255, 255, 255, 0.9)' }
                            }}
                        >
                            YES
                        </Button>
                    </Box>
                </Box>
            </Modal>

        </DashboardLayout>
    );
}
