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
  Typography,
  Grid,
} from '@mui/material';
import {
  Add as AddIcon,
  Person as PersonIcon,
  Payment as PaymentIcon,
  CheckCircle as CheckInIcon,
  ExitToApp as CheckOutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CreateReservationDialog from './CreateReservationDialog';

// Mock data
const mockGuests = [
  { id: 'G001', name: 'John Doe', room: '101 - Ocean View Suite' },
  { id: 'G002', name: 'Jane Smith', room: '102 - Mountain View Deluxe' },
  { id: 'G003', name: 'Robert Johnson', room: '103 - Garden Suite' },
];

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
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [serviceFee, setServiceFee] = useState({ amount: '', description: '' });
  const [createReservationOpen, setCreateReservationOpen] = useState(false);

  const handleAction = (action) => {
    setDialogType(action);
    setDialogOpen(true);
    setIsOpen(false);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setDialogType(null);
    setSelectedReservation(null);
    setSelectedGuest(null);
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
        console.log('Charging service fee:', { guest: selectedGuest, ...serviceFee });
        break;
    }
    handleClose();
  };

  const actions = [
    { 
      icon: <AddIcon />, 
      name: 'New Reservation',
      tooltipTitle: 'New Reservation', 
      action: () => setCreateReservationOpen(true)
    },
    { 
      icon: <CheckInIcon />, 
      name: 'Check In',
      tooltipTitle: 'Check In Guest', 
      action: () => handleAction('checkIn')
    },
    { 
      icon: <CheckOutIcon />, 
      name: 'Check Out',
      tooltipTitle: 'Check Out Guest', 
      action: () => handleAction('checkOut')
    },
    { 
      icon: <PaymentIcon />, 
      name: 'Charge',
      tooltipTitle: 'Charge Service Fee', 
      action: () => handleAction('charge')
    },
  ];

  const renderDialogContent = () => {
    switch (dialogType) {
      case 'checkIn':
      case 'checkOut':
        return (
          <Autocomplete
            fullWidth
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
            renderOption={(props, option) => (
              <li {...props}>
                <Box>
                  <Typography variant="subtitle1">{option.guestName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.roomLabel} - {option.id}
                  </Typography>
                </Box>
              </li>
            )}
          />
        );
      case 'charge':
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Autocomplete
                fullWidth
                options={mockGuests}
                getOptionLabel={(option) => `${option.name} - ${option.room}`}
                value={selectedGuest}
                onChange={(_, newValue) => setSelectedGuest(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Select Guest" required />
                )}
                renderOption={(props, option) => (
                  <li {...props}>
                    <Box>
                      <Typography variant="subtitle1">{option.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {option.room}
                      </Typography>
                    </Box>
                  </li>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                value={serviceFee.amount}
                onChange={(e) => setServiceFee({ ...serviceFee, amount: e.target.value })}
                InputProps={{
                  startAdornment: <InputAdornment position="start">AED</InputAdornment>,
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={serviceFee.description}
                onChange={(e) => setServiceFee({ ...serviceFee, description: e.target.value })}
                required
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SpeedDial
        ariaLabel="Actions Menu"
        sx={{ 
          position: 'fixed', 
          bottom: 16, 
          right: 16,
          '& .MuiSpeedDial-actions': {
            paddingBottom: 1,
          }
        }}
        icon={<SpeedDialIcon />}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        open={isOpen}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.tooltipTitle}
            tooltipOpen
            onClick={action.action}
            sx={{
              '& .MuiSpeedDialAction-staticTooltipLabel': {
                backgroundColor: 'primary.main',
                color: 'white',
                fontSize: '0.75rem',
                padding: '4px 8px',
                whiteSpace: 'nowrap',
                minWidth: 'auto',
              },
            }}
          />
        ))}
      </SpeedDial>

      <Dialog 
        open={dialogOpen} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {dialogType === 'checkIn' && 'Check In Guest'}
          {dialogType === 'checkOut' && 'Check Out Guest'}
          {dialogType === 'charge' && 'Charge Service Fee'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          {renderDialogContent()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            disabled={
              (dialogType === 'charge' && (!selectedGuest || !serviceFee.amount || !serviceFee.description)) ||
              ((dialogType === 'checkIn' || dialogType === 'checkOut') && !selectedReservation)
            }
          >
            {dialogType === 'checkIn' && 'Check In'}
            {dialogType === 'checkOut' && 'Check Out'}
            {dialogType === 'charge' && 'Charge Fee'}
          </Button>
        </DialogActions>
      </Dialog>

      <CreateReservationDialog
        open={createReservationOpen}
        onClose={() => setCreateReservationOpen(false)}
      />
    </>
  );
}