import { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Hotel as HotelIcon,
  Person as PersonIcon,
  Event as EventIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingUpIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import { LineChart, PieChart } from '@mui/x-charts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import CreateReservationDialog from '../components/CreateReservationDialog';

const mockData = {
  weeklyReservations: [
    { day: 'Mon', value: 5 },
    { day: 'Tue', value: 8 },
    { day: 'Wed', value: 12 },
    { day: 'Thu', value: 10 },
    { day: 'Fri', value: 15 },
    { day: 'Sat', value: 18 },
    { day: 'Sun', value: 14 },
  ],
  roomTypeDistribution: [
    { id: 0, value: 35, label: 'Standard', color: '#E31B54' },
    { id: 1, value: 25, label: 'Deluxe', color: '#FF4081' },
    { id: 2, value: 20, label: 'Suite', color: '#FFB74D' },
    { id: 3, value: 20, label: 'Executive', color: '#FF9800' },
  ],
  revenueData: [
    { month: 'Jan', room: 50000, service: 15000 },
    { month: 'Feb', room: 48000, service: 14000 },
    { month: 'Mar', room: 52000, service: 16000 },
  ],
  quickStats: [
    { title: 'Total Revenue', value: 145000, icon: <MoneyIcon sx={{ color: 'success.main' }} />, color: 'success.main' },
    { title: 'Occupancy Rate', value: '78%', icon: <TrendingUpIcon sx={{ color: 'primary.main' }} />, color: 'primary.main' },
    { title: 'Active Guests', value: 42, icon: <GroupIcon sx={{ color: 'info.main' }} />, color: 'info.main' },
  ],
  recentSearchResults: {
    rooms: [
      { id: '101', label: 'Ocean View Suite', type: 'Suite' },
      { id: '102', label: 'Mountain View Deluxe', type: 'Deluxe' },
    ],
    guests: [
      { id: 'G001', name: 'John Doe', phone: '+1 234-567-8900' },
      { id: 'G002', name: 'Jane Smith', phone: '+1 234-567-8901' },
    ],
    reservations: [
      { id: 'R001', guestName: 'John Doe', roomLabel: 'Ocean View Suite', dates: '15-20 Mar 2024' },
      { id: 'R002', guestName: 'Jane Smith', roomLabel: 'Mountain View Deluxe', dates: '1-5 Apr 2024' },
    ],
  },
};

const QuickStatsCard = ({ title, value, icon, color }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon}
        <Typography variant="h6" sx={{ ml: 1 }}>
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" color={color}>
        {typeof value === 'number' && !title.includes('Rate') ? `AED ${value}` : value}
      </Typography>
    </CardContent>
  </Card>
);

export default function Home() {
  const [openReservation, setOpenReservation] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const { isManager } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchResults(mockData.recentSearchResults);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenReservation(true)}
        >
          New Reservation
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        {mockData.quickStats.map((stat, index) => (
          <Grid item xs={12} md={4} key={index}>
            <QuickStatsCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Paper component="form" onSubmit={handleSearch} sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search rooms, guests, or reservations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchQuery('')} size="small">
                  ×
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {searchResults && (
        <Paper sx={{ mb: 3, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Search Results
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <HotelIcon /> Rooms
              </Typography>
              <List>
                {searchResults.rooms.map((room) => (
                  <ListItem key={room.id} divider>
                    <ListItemText
                      primary={room.label}
                      secondary={`Room ${room.id} - ${room.type}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => navigate(`/room/${room.id}`)}>
                        <VisibilityIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <PersonIcon /> Guests
              </Typography>
              <List>
                {searchResults.guests.map((guest) => (
                  <ListItem key={guest.id} divider>
                    <ListItemText
                      primary={guest.name}
                      secondary={guest.phone}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => navigate(`/guest/${guest.id}`)}>
                        <VisibilityIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <EventIcon /> Reservations
              </Typography>
              <List>
                {searchResults.reservations.map((reservation) => (
                  <ListItem key={reservation.id} divider>
                    <ListItemText
                      primary={`${reservation.guestName} - ${reservation.roomLabel}`}
                      secondary={reservation.dates}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => navigate(`/reservation/${reservation.id}`)}>
                        <VisibilityIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Weekly Reservations
            </Typography>
            <LineChart
              series={[
                {
                  data: mockData.weeklyReservations.map(d => d.value),
                  area: true,
                  color: '#E31B54',
                  showMark: true,
                },
              ]}
              xAxis={[{ 
                scaleType: 'point',
                data: mockData.weeklyReservations.map(d => d.day),
              }]}
              height={300}
              sx={{
                '.MuiLineElement-root': {
                  strokeWidth: 2,
                },
                '.MuiAreaElement-root': {
                  fillOpacity: 0.1,
                },
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Room Type Distribution
            </Typography>
            <PieChart
              series={[
                {
                  data: mockData.roomTypeDistribution,
                  innerRadius: 30,
                  paddingAngle: 2,
                  cornerRadius: 4,
                  highlightScope: { faded: 'global', highlighted: 'item' },
                },
              ]}
              height={300}
            />
          </Paper>
        </Grid>
      </Grid>

      <CreateReservationDialog
        open={openReservation}
        onClose={() => setOpenReservation(false)}
      />
    </Box>
  );
}