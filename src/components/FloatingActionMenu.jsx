import { useState } from 'react';
import {
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  Autocomplete,
} from '@mui/material';
import {
  Add as AddIcon,
  Hotel as HotelIcon,
  Person as PersonIcon,
  Payment as PaymentIcon,
  CheckCircle as CheckInIcon,
  ExitToApp as CheckOutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock data for reservations
const mockReservations = [
  { id: 'R001', guestName: 'John Doe', roomLabel: 'Ocean View Suite', roomId: '101' },
  { id: 'R002', guestName: 'Jane Smith', roomLabel: 'Mountain View Deluxe', roomId: '102' },
];

export default function FloatingActionMenu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [serviceFee, setServiceFee] = useState({ amount: '', description: '' });

  const handleAction = (action) => {
    setDialogType(action);
    setDialogOpen(true);
    setIsOpen(false);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setDialogType(null);
    setSelectedReservation(null);
    setServiceFee({ amount: '', description: '' });
  };

  const handleSubmit = () => {
    switch (dialogType) {
      case 'checkIn':
        console.log('Checking in reservation:', selectedReservation);
        break;
      case 'checkOut':
        console.log('Checking out reservation:', selectedReservation);
        break;
      case 'charge':
        console.log('Charging service fee:', serviceFee);
        break;
    }
    handleClose();
  };

  const actions = [
    { icon: <AddIcon />, name: 'New Reservation', action: () => navigate('/rooms') },
    { icon: <CheckInIcon />, name: 'Check In', action: () => handleAction('checkIn') },
    { icon: <CheckOutIcon />, name: 'Check Out', action: () => handleAction('checkOut') },
    { icon: <PaymentIcon />, name: 'Charge Service', action: () => handleAction('charge') },
  ];

  return (
    <>
      <SpeedDial
        ariaLabel="Actions Menu"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        open={isOpen}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.action}
            sx={{
              '& .MuiSpeedDialAction-staticTooltipLabel': {
                width: '120px',
                textAlign: 'center',
                bgcolor: 'primary.main',
                color: 'white',
              },
            }}
          />
        ))}
      </SpeedDial>

      <Dialog open={dialogOpen} onClose={handleClose}>
        <DialogTitle>
          {dialogType === 'checkIn' && 'Check In Guest'}
          {dialogType === 'checkOut' && 'Check Out Guest'}
          {dialogType === 'charge' && 'Charge Service Fee'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {(dialogType === 'checkIn' || dialogType === 'checkOut') && (
            <Autocomplete
              options={mockReservations}
              getOptionLabel={(option) => 
                `${option.guestName} - ${option.roomLabel} (${option.id})`
              }
              value={selectedReservation}
              onChange={(_, newValue) => setSelectedReservation(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Reservation"
                  fullWidth
                />
              )}
            />
          )}
          {dialogType === 'charge' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={serviceFee.amount}
                onChange={(e) => setServiceFee({ ...serviceFee, amount: e.target.value })}
                InputProps={{
                  startAdornment: <InputAdornment position="start">AED</InputAdornment>,
                }}
              />
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={2}
                value={serviceFee.description}
                onChange={(e) => setServiceFee({ ...serviceFee, description: e.target.value })}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            disabled={
              (dialogType === 'charge' && (!serviceFee.amount || !serviceFee.description)) ||
              ((dialogType === 'checkIn' || dialogType === 'checkOut') && !selectedReservation)
            }
          >
            {dialogType === 'checkIn' && 'Check In'}
            {dialogType === 'checkOut' && 'Check Out'}
            {dialogType === 'charge' && 'Charge Fee'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}