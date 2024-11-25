import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

// Mock configuration data
const mockConfig = {
  lateCancellationFee: 50.00,
  lateCancellationThresholdHours: 24,
  extensionFeePerDay: 100.00,
};

const mockRoomTypes = [
  {
    id: 1,
    size: 'Standard',
    hasView: false,
    maximumDailyRate: 150.00,
  },
  {
    id: 2,
    size: 'Deluxe',
    hasView: true,
    maximumDailyRate: 250.00,
  },
  {
    id: 3,
    size: 'Suite',
    hasView: true,
    maximumDailyRate: 350.00,
  },
];

export default function Settings() {
  const { isManager } = useAuth();
  const [config, setConfig] = useState(mockConfig);
  const [roomTypes, setRoomTypes] = useState(mockRoomTypes);
  const [openRoomTypeDialog, setOpenRoomTypeDialog] = useState(false);
  const [editingRoomType, setEditingRoomType] = useState(null);

  if (!isManager) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h5">
          Access Denied. Manager privileges required.
        </Typography>
      </Box>
    );
  }

  const handleConfigChange = (field) => (event) => {
    setConfig({
      ...config,
      [field]: parseFloat(event.target.value) || 0,
    });
  };

  const handleSaveConfig = () => {
    console.log('Saving configuration:', config);
    // API call to save configuration
  };

  const handleEditRoomType = (roomType) => {
    setEditingRoomType(roomType);
    setOpenRoomTypeDialog(true);
  };

  const handleDeleteRoomType = (id) => {
    setRoomTypes(roomTypes.filter(rt => rt.id !== id));
  };

  const handleSaveRoomType = (roomType) => {
    if (editingRoomType) {
      setRoomTypes(roomTypes.map(rt => 
        rt.id === editingRoomType.id ? roomType : rt
      ));
    } else {
      setRoomTypes([...roomTypes, { ...roomType, id: Date.now() }]);
    }
    setOpenRoomTypeDialog(false);
    setEditingRoomType(null);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        System Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Fee Configuration
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Late Cancellation Fee ($)"
                  type="number"
                  value={config.lateCancellationFee}
                  onChange={handleConfigChange('lateCancellationFee')}
                  InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Late Cancellation Threshold (hours)"
                  type="number"
                  value={config.lateCancellationThresholdHours}
                  onChange={handleConfigChange('lateCancellationThresholdHours')}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Extension Fee per Day ($)"
                  type="number"
                  value={config.extensionFeePerDay}
                  onChange={handleConfigChange('extensionFeePerDay')}
                  InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveConfig}
                  startIcon={<SaveIcon />}
                >
                  Save Configuration
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">
                Room Types
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setEditingRoomType(null);
                  setOpenRoomTypeDialog(true);
                }}
              >
                Add Room Type
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Size</TableCell>
                    <TableCell>View</TableCell>
                    <TableCell>Max Daily Rate</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roomTypes.map((roomType) => (
                    <TableRow key={roomType.id}>
                      <TableCell>{roomType.size}</TableCell>
                      <TableCell>{roomType.hasView ? 'Yes' : 'No'}</TableCell>
                      <TableCell>${roomType.maximumDailyRate.toFixed(2)}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          onClick={() => handleEditRoomType(roomType)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteRoomType(roomType.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <RoomTypeDialog
        open={openRoomTypeDialog}
        onClose={() => {
          setOpenRoomTypeDialog(false);
          setEditingRoomType(null);
        }}
        onSave={handleSaveRoomType}
        roomType={editingRoomType}
      />
    </Box>
  );
}

function RoomTypeDialog({ open, onClose, onSave, roomType }) {
  const [formData, setFormData] = useState(
    roomType || {
      size: '',
      hasView: false,
      maximumDailyRate: 0,
    }
  );

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {roomType ? 'Edit Room Type' : 'Add Room Type'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Size"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.hasView}
                  onChange={(e) => setFormData({ ...formData, hasView: e.target.checked })}
                />
              }
              label="Has View"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Maximum Daily Rate ($)"
              type="number"
              value={formData.maximumDailyRate}
              onChange={(e) => setFormData({
                ...formData,
                maximumDailyRate: parseFloat(e.target.value) || 0,
              })}
              InputProps={{ inputProps: { min: 0, step: 0.01 } }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {roomType ? 'Save Changes' : 'Add Room Type'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}