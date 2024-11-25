import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import {
  Event,
  Person,
  Hotel,
  Cancel as CancelIcon,
  CheckCircle,
  ExitToApp,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

// Mock reservation data
const mockReservation = {
  id: 'R001',
  guestId: 'G001',
  guestName: 'John Doe',
  roomId: '101',
  roomLabel: 'Ocean View Suite',
  startDate: '2024-03-15',
  endDate: '2024-03-20',
  status: 'confirmed',
  approved: true,
  checkedIn: false,
  totalAmount: 1500.00,
  fees: [
    {
      id: 'F001',
      type: 'RoomFee',
      amount: 1200.00,
      description: 'Room charge for 5 nights',
    },
    {
      id: 'F002',
      type: 'ServiceFee',
      amount: 300.00,
      description: 'Additional services',
    },
  ],
};

export default function Reservation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isClerk } = useAuth();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [reservation, setReservation] = useState(mockReservation);

  const handleCancel = () => {
    console.log('Canceling reservation:', id);
    setCancelDialogOpen(false);
    navigate('/');
  };

  const handleCheckIn = () => {
    console.log('Checking in reservation:', id);
    setReservation({ ...reservation, checkedIn: true });
  };

  const handleCheckOut = () => {
    console.log('Checking out reservation:', id);
    navigate(`/guest/${reservation.guestId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getApprovalStatus = () => {
    if (!reservation.approved) {
      return <Chip label="PENDING APPROVAL" color="warning" />;
    }
    return null;
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Reservation Details
        </Typography>
        {isClerk && reservation.status === 'confirmed' && (
          <Box>
            {!reservation.checkedIn ? (
              <Button
                variant="contained"
                color="primary"
                startIcon={<CheckCircle />}
                onClick={handleCheckIn}
                sx={{ mr: 1 }}
              >
                Check In
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                startIcon={<ExitToApp />}
                onClick={handleCheckOut}
                sx={{ mr: 1 }}
              >
                Check Out
              </Button>
            )}
            <Button
              variant="outlined"
              color="error"
              startIcon={<CancelIcon />}
              onClick={() => setCancelDialogOpen(true)}
            >
              Cancel Reservation
            </Button>
          </Box>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Reservation Information
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography color="textSecondary" gutterBottom>
                Reservation ID
              </Typography>
              <Typography variant="body1">{reservation.id}</Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography color="textSecondary" gutterBottom>
                Status
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip
                  label={reservation.status.toUpperCase()}
                  color={getStatusColor(reservation.status)}
                />
                {reservation.checkedIn && (
                  <Chip
                    label="CHECKED IN"
                    color="info"
                  />
                )}
                {getApprovalStatus()}
              </Box>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography color="textSecondary" gutterBottom>
                Dates
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Event color="primary" />
                <Typography>
                  Check-in: {reservation.startDate}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Event color="primary" />
                <Typography>
                  Check-out: {reservation.endDate}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Guest Information
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Person color="primary" />
              <Box>
                <Typography variant="body1">{reservation.guestName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Guest ID: {reservation.guestId}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              onClick={() => navigate(`/guest/${reservation.guestId}`)}
            >
              View Guest Details
            </Button>
          </Paper>

          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Room Information
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Hotel color="primary" />
              <Box>
                <Typography variant="body1">{reservation.roomLabel}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Room ID: {reservation.roomId}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="outlined"
              onClick={() => navigate(`/room/${reservation.roomId}`)}
            >
              View Room Details
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Charges and Fees
            </Typography>
            <Grid container spacing={2}>
              {reservation.fees.map((fee) => (
                <Grid item xs={12} key={fee.id}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box>
                      <Typography variant="body1">{fee.description}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {fee.type}
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      AED {fee.amount.toFixed(2)}
                    </Typography>
                  </Box>
                  <Divider />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Typography variant="h6">Total Amount</Typography>
                  <Typography variant="h6">
                    AED {reservation.totalAmount.toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Dialog
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
      >
        <DialogTitle>Cancel Reservation</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to cancel this reservation? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>Keep Reservation</Button>
          <Button onClick={handleCancel} color="error" variant="contained">
            Cancel Reservation
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}