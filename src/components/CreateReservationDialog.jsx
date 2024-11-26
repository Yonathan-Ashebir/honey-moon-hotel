import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Autocomplete,
  Typography,
  Box,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

// Mock data
const mockGuests = [
  { id: 'G001', name: 'John Doe', phone: '+1 234-567-8900' },
  { id: 'G002', name: 'Jane Smith', phone: '+1 234-567-8901' },
];

const mockRooms = [
  { id: '101', label: 'Ocean View Suite', type: 'Suite' },
  { id: '102', label: 'Mountain View Deluxe', type: 'Deluxe' },
];

export default function CreateReservationDialog({ open, onClose }) {
  const [formData, setFormData] = useState({
    guest: null,
    room: null,
    startDate: null,
    endDate: null,
  });

  const handleSubmit = () => {
    console.log('Creating reservation:', formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Reservation</DialogTitle>
      <DialogContent>
        <Grid container spacing={3} sx={{ mt: 0 }}>
          <Grid item xs={12}>
            <Autocomplete
              options={mockGuests}
              getOptionLabel={(option) => `${option.name} (${option.phone})`}
              value={formData.guest}
              onChange={(_, newValue) => setFormData({ ...formData, guest: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="Select Guest" required />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <Box>
                    <Typography variant="subtitle1">{option.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {option.phone}
                    </Typography>
                  </Box>
                </li>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              options={mockRooms}
              getOptionLabel={(option) => `${option.label} (${option.type})`}
              value={formData.room}
              onChange={(_, newValue) => setFormData({ ...formData, room: newValue })}
              renderInput={(params) => (
                <TextField {...params} label="Select Room" required />
              )}
              renderOption={(props, option) => (
                <li {...props}>
                  <Box>
                    <Typography variant="subtitle1">{option.label}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Room {option.id} - {option.type}
                    </Typography>
                  </Box>
                </li>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Check-in Date"
              value={formData.startDate}
              onChange={(date) => setFormData({ ...formData, startDate: date })}
              slotProps={{ 
                textField: { 
                  fullWidth: true,
                  required: true
                } 
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Check-out Date"
              value={formData.endDate}
              onChange={(date) => setFormData({ ...formData, endDate: date })}
              slotProps={{ 
                textField: { 
                  fullWidth: true,
                  required: true
                } 
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={!formData.guest || !formData.room || !formData.startDate || !formData.endDate}
        >
          Create Reservation
        </Button>
      </DialogActions>
    </Dialog>
  );
}