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
  FormControlLabel,
  Switch,
  Typography,
  Box,
  Autocomplete,
  Chip,
} from '@mui/material';

const ROOM_TYPES = ['Standard', 'Deluxe', 'Suite', 'Executive'];
const BED_TYPES = ['LARGE', 'MEDIUM', 'SMALL'];

// Mock available rooms for adjoining selection
const AVAILABLE_ROOMS = [
  { id: '101', label: 'Ocean View Suite' },
  { id: '102', label: 'Mountain View Deluxe' },
  { id: '103', label: 'Garden Suite' },
  { id: '104', label: 'Executive Suite' },
];

export default function CreateRoomDialog({ open, onClose, existingRoom = null }) {
  const [formData, setFormData] = useState(existingRoom || {
    label: '',
    type: '',
    beds: {
      LARGE: 0,
      MEDIUM: 0,
      SMALL: 0,
    },
    smoking: false,
    description: '',
    adjoiningRooms: [],
  });

  const handleSubmit = () => {
    console.log('Saving room:', formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{existingRoom ? 'Edit Room' : 'Create New Room'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Room Label"
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Room Type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              select
            >
              {ROOM_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Bed Configuration
            </Typography>
            <Grid container spacing={2}>
              {BED_TYPES.map((type) => (
                <Grid item xs={4} key={type}>
                  <TextField
                    fullWidth
                    label={type}
                    type="number"
                    value={formData.beds[type]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        beds: {
                          ...formData.beds,
                          [type]: parseInt(e.target.value, 10) || 0,
                        },
                      })
                    }
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              options={AVAILABLE_ROOMS}
              getOptionLabel={(option) => `${option.label} (${option.id})`}
              value={formData.adjoiningRooms}
              onChange={(_, newValue) => setFormData({ ...formData, adjoiningRooms: newValue })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Adjoining Rooms"
                  placeholder="Select adjoining rooms"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={`${option.label} (${option.id})`}
                    {...getTagProps({ index })}
                    color="primary"
                    variant="outlined"
                  />
                ))
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.smoking}
                  onChange={(e) =>
                    setFormData({ ...formData, smoking: e.target.checked })
                  }
                />
              }
              label="Smoking Allowed"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {existingRoom ? 'Save Changes' : 'Create Room'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}