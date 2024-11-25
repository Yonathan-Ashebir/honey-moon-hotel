import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

export default function CreateReservationDialog({ open, onClose }) {
  const [formData, setFormData] = useState({
    guestId: '',
    roomId: '',
    startDate: null,
    endDate: null,
  });

  const handleSubmit = () => {
    // Handle reservation creation
    console.log('Creating reservation:', formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Reservation</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Guest ID"
              value={formData.guestId}
              onChange={(e) => setFormData({ ...formData, guestId: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Room"
              value={formData.roomId}
              onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
              select
            >
              <MenuItem value="101">101 - Ocean View Suite</MenuItem>
              <MenuItem value="102">102 - Mountain View Deluxe</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Check-in Date"
              value={formData.startDate}
              onChange={(date) => setFormData({ ...formData, startDate: date })}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Check-out Date"
              value={formData.endDate}
              onChange={(date) => setFormData({ ...formData, endDate: date })}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create Reservation
        </Button>
      </DialogActions>
    </Dialog>
  );
}