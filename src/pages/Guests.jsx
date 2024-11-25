import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Edit,
  Delete,
  Search,
  Visibility,
  PersonAdd,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CreateGuestDialog from '../components/CreateGuestDialog';

// Mock guest data
const mockGuests = [
  {
    id: 'G001',
    name: 'John Doe',
    telephone: '+1 234-567-8900',
    address: '123 Main St, City, Country',
    activeReservations: 1,
  },
  {
    id: 'G002',
    name: 'Jane Smith',
    telephone: '+1 234-567-8901',
    address: '456 Oak Ave, City, Country',
    activeReservations: 2,
  },
  {
    id: 'G003',
    name: 'Robert Johnson',
    telephone: '+1 234-567-8902',
    address: '789 Pine Rd, City, Country',
    activeReservations: 0,
  },
];

export default function Guests() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openCreateGuest, setOpenCreateGuest] = useState(false);
  const navigate = useNavigate();

  const filteredGuests = mockGuests.filter(guest =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Guests
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAdd />}
          onClick={() => setOpenCreateGuest(true)}
        >
          New Guest
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search guests by name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Guest ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Telephone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Active Reservations</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGuests.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell>{guest.id}</TableCell>
                <TableCell>{guest.name}</TableCell>
                <TableCell>{guest.telephone}</TableCell>
                <TableCell>{guest.address}</TableCell>
                <TableCell>{guest.activeReservations}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/guest/${guest.id}`)}
                  >
                    <Visibility />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/guest/${guest.id}`)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    disabled={guest.activeReservations > 0}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateGuestDialog
        open={openCreateGuest}
        onClose={() => setOpenCreateGuest(false)}
      />
    </Box>
  );
}