import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  IconButton,
} from '@mui/material';
import {
  KingBed,
  SmokeFree,
  SmokingRooms,
  Visibility,
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CreateRoomDialog from '../components/CreateRoomDialog';
import { useAuth } from '../contexts/AuthContext';

const mockRooms = [
  {
    id: '101',
    label: 'Ocean View Suite',
    type: 'Suite',
    beds: { LARGE: 1, MEDIUM: 1 },
    smoking: false,
    status: 'available',
  },
  {
    id: '102',
    label: 'Mountain View Deluxe',
    type: 'Deluxe',
    beds: { LARGE: 1 },
    smoking: false,
    status: 'occupied',
  },
];

export default function Rooms() {
  const [openCreateRoom, setOpenCreateRoom] = useState(false);
  const navigate = useNavigate();
  const { isManager } = useAuth();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Rooms
        </Typography>
        {isManager && (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setOpenCreateRoom(true)}
          >
            Add Room
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {mockRooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {room.label}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  Room {room.id} - {room.type}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Chip
                    icon={room.smoking ? <SmokingRooms /> : <SmokeFree />}
                    label={room.smoking ? 'Smoking' : 'Non-Smoking'}
                    size="small"
                  />
                  <Chip
                    icon={<KingBed />}
                    label={`${Object.entries(room.beds)
                      .map(([type, count]) => `${count} ${type}`)
                      .join(', ')}`}
                    size="small"
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<Visibility />}
                  onClick={() => navigate(`/room/${room.id}`)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <CreateRoomDialog
        open={openCreateRoom}
        onClose={() => setOpenCreateRoom(false)}
      />
    </Box>
  );
}