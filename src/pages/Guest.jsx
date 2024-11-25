import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Event,
  Payment,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock guest data
const mockGuest = {
  id: 'G001',
  name: 'John Doe',
  telephone: '+1 234-567-8900',
  address: '123 Main St, City, Country',
  creditCard: '**** **** **** 1234',
  reservations: [
    {
      id: 'R001',
      roomLabel: 'Ocean View Suite',
      roomId: '101',
      startDate: '2024-03-15',
      endDate: '2024-03-20',
      status: 'confirmed',
    },
  ],
  fees: [
    {
      id: 'F001',
      type: 'RoomFee',
      amount: 500.00,
      status: 'unpaid',
      description: 'Room charge for Ocean View Suite',
    },
    {
      id: 'F002',
      type: 'ServiceFee',
      amount: 50.00,
      status: 'paid',
      description: 'Room service',
    },
  ],
};

export default function Guest() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [guestData, setGuestData] = useState(mockGuest);
  const [editedData, setEditedData] = useState(mockGuest);

  const handleSave = () => {
    setGuestData(editedData);
    setEditing(false);
  };

  const handleDelete = () => {
    console.log('Deleting guest:', id);
    setDeleteDialogOpen(false);
    navigate('/guests');
  };

  const handlePayFee = (feeId) => {
    console.log('Paying fee:', feeId);
    // Update fee status logic here
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Guest Details
        </Typography>
        <Box>
          {editing ? (
            <>
              <IconButton color="primary" onClick={handleSave}>
                <SaveIcon />
              </IconButton>
              <IconButton color="error" onClick={() => setEditing(false)}>
                <CancelIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton color="primary" onClick={() => setEditing(true)}>
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => setDeleteDialogOpen(true)}
                disabled={guestData.reservations.length > 0}
              >
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Guest ID"
                  value={editedData.id}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={editing ? editedData.name : guestData.name}
                  onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                  disabled={!editing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Telephone"
                  value={editing ? editedData.telephone : guestData.telephone}
                  onChange={(e) => setEditedData({ ...editedData, telephone: e.target.value })}
                  disabled={!editing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  multiline
                  rows={2}
                  value={editing ? editedData.address : guestData.address}
                  onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
                  disabled={!editing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Credit Card"
                  value={guestData.creditCard}
                  disabled
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Active Reservations
            </Typography>
            {guestData.reservations.map((reservation) => (
              <Paper
                key={reservation.id}
                elevation={1}
                sx={{ p: 2, mb: 2, backgroundColor: 'background.default' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Event color="primary" />
                  <Typography variant="subtitle1">
                    {reservation.roomLabel}
                  </Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  Check-in: {reservation.startDate}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Check-out: {reservation.endDate}
                </Typography>
                <Chip
                  size="small"
                  label={reservation.status}
                  color={reservation.status === 'confirmed' ? 'success' : 'warning'}
                  sx={{ mt: 1 }}
                />
                <Button
                  size="small"
                  onClick={() => navigate(`/reservation/${reservation.id}`)}
                  sx={{ mt: 1, display: 'block' }}
                >
                  View Details
                </Button>
              </Paper>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Fees and Charges
            </Typography>
            <Grid container spacing={2}>
              {guestData.fees.map((fee) => (
                <Grid item xs={12} sm={6} md={4} key={fee.id}>
                  <Paper
                    elevation={1}
                    sx={{ p: 2, backgroundColor: 'background.default' }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Payment color="primary" />
                      <Typography variant="subtitle1">
                        AED {fee.amount.toFixed(2)}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {fee.description}
                    </Typography>
                    <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                      <Chip
                        size="small"
                        label={fee.status}
                        color={fee.status === 'paid' ? 'success' : 'warning'}
                      />
                      {fee.status === 'unpaid' && (
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => handlePayFee(fee.id)}
                        >
                          Pay Now
                        </Button>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Guest</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this guest? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}