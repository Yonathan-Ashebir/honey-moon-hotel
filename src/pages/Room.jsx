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
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  KingBed,
  SmokeFree,
  SmokingRooms,
  Event,
  Delete,
  Favorite,
  Edit as EditIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import { DateCalendar } from '@mui/x-date-pickers';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';
import CreateRoomDialog from '../components/CreateRoomDialog';

// Mock room data
const mockRoom = {
  id: '101',
  label: 'Ocean View Suite',
  type: 'Suite',
  beds: { LARGE: 1, MEDIUM: 1 },
  smoking: false,
  description: 'Luxurious suite with panoramic ocean views, featuring a spacious living area and premium amenities.',
  adjoiningRooms: [
    { id: '102', label: 'Mountain View Deluxe' },
  ],
  reservations: [
    {
      id: 'res1',
      guestName: 'John Doe',
      startDate: new Date(2024, 2, 15),
      endDate: new Date(2024, 2, 20),
      status: 'confirmed',
    },
    {
      id: 'res2',
      guestName: 'Jane Smith',
      startDate: new Date(2024, 3, 1),
      endDate: new Date(2024, 3, 5),
      status: 'pending',
    },
  ],
};

export default function Room() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isManager } = useAuth();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [calendarView, setCalendarView] = useState('month');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // In a real app, fetch room data based on id
  const room = mockRoom;

  const handleDelete = () => {
    console.log('Deleting room:', id);
    setDeleteDialogOpen(false);
    navigate('/rooms');
  };

  const handleDateClick = (date) => {
    const reservation = room.reservations.find(res => 
      date >= res.startDate && date <= res.endDate
    );
    
    if (reservation) {
      navigate(`/reservation/${reservation.id}`);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Room Details
        </Typography>
        {isManager && (
          <Box>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<EditIcon />}
              onClick={() => setEditDialogOpen(true)}
              sx={{ mr: 1 }}
            >
              Edit Room
            </Button>
            {room.reservations.length === 0 && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={() => setDeleteDialogOpen(true)}
              >
                Delete Room
              </Button>
            )}
          </Box>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Favorite color="primary" />
              <Typography variant="h6">
                {room.label}
              </Typography>
            </Box>
            <Typography color="textSecondary" gutterBottom>
              Room {room.id} - {room.type}
            </Typography>
            <Typography variant="body1" paragraph>
              {room.description}
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                icon={room.smoking ? <SmokingRooms /> : <SmokeFree />}
                label={room.smoking ? 'Smoking' : 'Non-Smoking'}
                color={room.smoking ? 'default' : 'success'}
              />
              {Object.entries(room.beds).map(([type, count]) => (
                count > 0 && (
                  <Chip
                    key={type}
                    icon={<KingBed />}
                    label={`${count} ${type}`}
                    color="secondary"
                  />
                )
              ))}
            </Box>
          </Paper>

          <Paper sx={{ p: 3, mt: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LinkIcon color="primary" />
              <Typography variant="h6">
                Adjoining Rooms
              </Typography>
            </Box>
            {room.adjoiningRooms.length > 0 ? (
              <Grid container spacing={2}>
                {room.adjoiningRooms.map((adjoiningRoom) => (
                  <Grid item xs={12} sm={6} key={adjoiningRoom.id}>
                    <Paper
                      elevation={1}
                      sx={{ p: 2, backgroundColor: 'background.default' }}
                    >
                      <Typography variant="subtitle1">
                        {adjoiningRoom.label}
                      </Typography>
                      <Typography color="textSecondary">
                        Room {adjoiningRoom.id}
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => navigate(`/room/${adjoiningRoom.id}`)}
                        sx={{ mt: 1 }}
                      >
                        View Room
                      </Button>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography color="textSecondary">
                No adjoining rooms assigned
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Reservations Calendar
              </Typography>
              <ToggleButtonGroup
                value={calendarView}
                exclusive
                onChange={(e, value) => value && setCalendarView(value)}
                size="small"
              >
                <ToggleButton value="month">Month</ToggleButton>
                <ToggleButton value="week">Week</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <DateCalendar
              value={selectedDate}
              onChange={(newDate) => {
                setSelectedDate(newDate);
                handleDateClick(newDate);
              }}
              sx={{
                '& .MuiPickersDay-root': {
                  borderRadius: 1,
                },
                '& .MuiPickersDay-today': {
                  borderColor: 'primary.main',
                },
              }}
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Legend:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip
                  size="small"
                  label="Confirmed"
                  color="success"
                />
                <Chip
                  size="small"
                  label="Pending"
                  color="warning"
                />
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Reservations
            </Typography>
            <Grid container spacing={2}>
              {room.reservations.map((reservation) => (
                <Grid item xs={12} sm={6} md={4} key={reservation.id}>
                  <Paper
                    elevation={1}
                    sx={{ p: 2, backgroundColor: 'background.default' }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Event color="primary" />
                      <Typography variant="subtitle1">
                        {reservation.guestName}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      Check-in: {format(reservation.startDate, 'PPP')}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Check-out: {format(reservation.endDate, 'PPP')}
                    </Typography>
                    <Chip
                      size="small"
                      label={reservation.status.toUpperCase()}
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
        <DialogTitle>Delete Room</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this room? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <CreateRoomDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        existingRoom={room}
      />
    </Box>
  );
}