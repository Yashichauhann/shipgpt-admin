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
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";

const MOCK_SHIPS = [
    { id: 1, name: "Poseidon I", type: "Cargo", capacity: "10000 TEU", status: "Active" },
    { id: 2, name: "Sea Breeze", type: "Tanker", capacity: "50000 DWT", status: "Maintenance" },
    { id: 3, name: "Ocean Voyager", type: "Container", capacity: "15000 TEU", status: "Inactive" },
];

export default function ShipManagementLayout() {
    const [ships, setShips] = useState(MOCK_SHIPS);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);
    const [selectedShip, setSelectedShip] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Form states for Add/Edit
    const [formData, setFormData] = useState({ name: "", type: "", capacity: "", status: "Active" });

    const handleOpenView = (ship: any) => {
        setSelectedShip(ship);
        setFormData(ship); // Initialize form data with ship details
        setIsEditing(false); // Default to view mode
        setOpenViewModal(true);
    };

    const handleCloseView = () => {
        setSelectedShip(null);
        setOpenViewModal(false);
        setIsEditing(false);
    };

    const handleAddShip = () => {
        const newShip = {
            id: ships.length + 1,
            ...formData,
            status: formData.status || "Active"
        };
        setShips([...ships, newShip]);
        setOpenAddModal(false);
        setFormData({ name: "", type: "", capacity: "", status: "Active" }); // Reset form
    };

    const handleUpdateShip = () => {
        if (!selectedShip) return;
        setShips(ships.map(s => s.id === selectedShip.id ? { ...formData, id: s.id } : s));
        setSelectedShip({ ...formData, id: selectedShip.id });
        setIsEditing(false);
    };

    const handleDeleteShip = () => {
        if (!selectedShip) return;
        setShips(ships.filter(s => s.id !== selectedShip.id));
        handleCloseView();
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
        outline: 'none',
        fontFamily: 'var(--font-primary) !important'
    };

    const textFieldStyle = {
        '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            color: 'var(--foreground)',
            fontFamily: 'var(--font-primary) !important',
            '& fieldset': { borderColor: 'var(--border)' },
            '&.Mui-disabled': {
                '& fieldset': { borderColor: 'var(--border)' },
                '& .MuiInputBase-input': {
                    '-webkit-text-fill-color': 'var(--foreground) !important',
                    color: 'var(--foreground) !important'
                }
            }
        },
        '& .MuiInputLabel-root': {
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-primary) !important'
        },
        '& .MuiInputLabel-root.Mui-focused': { color: 'var(--foreground)' },
        '& .MuiSelect-icon': { color: 'var(--foreground)' },
        '& .MuiInputBase-input': { fontFamily: 'var(--font-primary) !important' },
        '& .MuiMenuItem-root': { fontFamily: 'var(--font-primary) !important' }
    };

    return (
        <DashboardLayout>
            <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4" fontWeight={700} sx={{ fontFamily: 'var(--font-primary) !important' }}>
                    Ship Management
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        setFormData({ name: "", type: "", capacity: "", status: "Active" });
                        setOpenAddModal(true);
                    }}
                    sx={{
                        bgcolor: "var(--card-bg)",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                        borderRadius: 0,
                        textTransform: "none",
                        px: 3,
                        py: 1.5,
                        fontFamily: 'var(--font-primary) !important',
                        "&:hover": {
                            bgcolor: "rgba(255,255,255,0.05)",
                            border: "1px solid var(--foreground)",
                        },
                    }}
                >
                    Add Ship
                </Button>
            </Box>

            {/* Ship Table */}
            <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid var(--border)", borderRadius: 0, bgcolor: "var(--card-bg)" }}>
                <Table sx={{ minWidth: 650 }} aria-label="ship table">
                    <TableHead sx={{ bgcolor: "var(--card-bg)" }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 600, color: "var(--foreground)", fontFamily: "var(--font-primary) !important" }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: "var(--foreground)", fontFamily: "var(--font-primary) !important" }}>Type</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: "var(--foreground)", fontFamily: "var(--font-primary) !important" }}>Capacity</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: "var(--foreground)", fontFamily: "var(--font-primary) !important" }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: "var(--foreground)", textAlign: 'right', fontFamily: "var(--font-primary) !important" }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ships.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" sx={{ fontWeight: 500, color: "var(--foreground)", fontFamily: "var(--font-primary) !important" }}>
                                    {row.name}
                                </TableCell>
                                <TableCell sx={{ color: "var(--foreground)", fontFamily: "var(--font-primary) !important" }}>{row.type}</TableCell>
                                <TableCell sx={{ color: "var(--foreground)", fontFamily: "var(--font-primary) !important" }}>{row.capacity}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={row.status}
                                        size="small"
                                        sx={{
                                            borderRadius: 0,
                                            bgcolor: row.status === 'Active' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                            color: row.status === 'Active' ? '#10b981' : '#ef4444',
                                            fontWeight: 500,
                                            border: `1px solid ${row.status === 'Active' ? '#10b981' : '#ef4444'}`
                                        }}
                                    />
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

            {/* Add Ship Modal */}
            <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2" mb={3} fontWeight={600} sx={{ fontFamily: 'var(--font-primary) !important' }}>
                        Add New Ship
                    </Typography>
                    <Stack spacing={2}>
                        <TextField
                            label="Ship Name"
                            fullWidth
                            variant="outlined"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            sx={textFieldStyle}
                        />
                        <TextField
                            label="Type"
                            fullWidth
                            variant="outlined"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            sx={textFieldStyle}
                        />
                        <TextField
                            label="Capacity"
                            fullWidth
                            variant="outlined"
                            value={formData.capacity}
                            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                            sx={textFieldStyle}
                        />
                        <FormControl fullWidth sx={textFieldStyle}>
                            <InputLabel id="status-select-label" sx={{ fontFamily: 'var(--font-primary) !important' }}>Status</InputLabel>
                            <Select
                                labelId="status-select-label"
                                value={formData.status}
                                label="Status"
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                sx={{
                                    color: "var(--foreground)",
                                    fontFamily: 'var(--font-primary) !important',
                                    '.MuiSvgIcon-root': { color: "var(--foreground)" }
                                }}
                            >
                                <MenuItem value="Active" sx={{ fontFamily: 'var(--font-primary) !important' }}>Active</MenuItem>
                                <MenuItem value="Inactive" sx={{ fontFamily: 'var(--font-primary) !important' }}>Inactive</MenuItem>
                                <MenuItem value="Maintenance" sx={{ fontFamily: 'var(--font-primary) !important' }}>Maintenance</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            onClick={handleAddShip}
                            sx={{
                                mt: 2,
                                bgcolor: "var(--card-bg)",
                                color: "var(--foreground)",
                                border: "1px solid var(--border)",
                                borderRadius: 0,
                                "&:hover": { bgcolor: "rgba(255,255,255,0.05)", border: "1px solid var(--foreground)" },
                            }}
                        >
                            Create Ship
                        </Button>
                    </Stack>
                </Box>
            </Modal>

            {/* View/Edit Ship Modal */}
            <Modal open={openViewModal} onClose={handleCloseView}>
                <Box sx={modalStyle}>
                    {selectedShip && (
                        <>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h6" fontWeight={600} sx={{ fontFamily: 'var(--font-primary) !important' }}>
                                    {isEditing ? "Edit Ship Details" : "Ship Details"}
                                </Typography>
                                <Box>
                                    {!isEditing ? (
                                        <>
                                            <IconButton onClick={() => setIsEditing(true)} sx={{ color: "var(--foreground)", mr: 1 }}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={handleDeleteShip} sx={{ color: "#ef4444" }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    ) : (
                                        <IconButton onClick={() => setIsEditing(false)} sx={{ color: "var(--text-secondary)" }}>
                                            <Typography variant="caption">Cancel</Typography>
                                        </IconButton>
                                    )}
                                </Box>
                            </Box>

                            <Stack spacing={2}>
                                <TextField
                                    label="Ship Name"
                                    fullWidth
                                    variant="outlined"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    disabled={!isEditing}
                                    sx={textFieldStyle}
                                />
                                <TextField
                                    label="Type"
                                    fullWidth
                                    variant="outlined"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    disabled={!isEditing}
                                    sx={textFieldStyle}
                                />
                                <TextField
                                    label="Capacity"
                                    fullWidth
                                    variant="outlined"
                                    value={formData.capacity}
                                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                    disabled={!isEditing}
                                    sx={textFieldStyle}
                                />
                                <FormControl fullWidth disabled={!isEditing} sx={textFieldStyle}>
                                    <InputLabel id="view-status-select-label" sx={{ fontFamily: 'var(--font-primary) !important' }}>Status</InputLabel>
                                    <Select
                                        labelId="view-status-select-label"
                                        value={formData.status}
                                        label="Status"
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        sx={{ color: "var(--foreground)", '.MuiSvgIcon-root': { color: "var(--foreground)" } }}
                                    >
                                        <MenuItem value="Active">Active</MenuItem>
                                        <MenuItem value="Inactive">Inactive</MenuItem>
                                        <MenuItem value="Maintenance">Maintenance</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>

                            {isEditing ? (
                                <Button
                                    variant="contained"
                                    fullWidth
                                    startIcon={<SaveIcon />}
                                    onClick={handleUpdateShip}
                                    sx={{
                                        mt: 4,
                                        bgcolor: "#10b981",
                                        color: "#fff",
                                        borderRadius: 0,
                                        fontFamily: 'var(--font-primary) !important',
                                        "&:hover": { bgcolor: "#059669" },
                                    }}
                                >
                                    Save Changes
                                </Button>
                            ) : (
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    onClick={handleCloseView}
                                    sx={{
                                        mt: 4,
                                        borderColor: "var(--border)",
                                        color: "var(--foreground)",
                                        borderRadius: 0,
                                        fontFamily: 'var(--font-primary) !important',
                                        "&:hover": { borderColor: "var(--foreground)", bgcolor: 'transparent' },
                                    }}
                                >
                                    Close
                                </Button>
                            )}
                        </>
                    )}
                </Box>
            </Modal>
        </DashboardLayout>
    );
}
