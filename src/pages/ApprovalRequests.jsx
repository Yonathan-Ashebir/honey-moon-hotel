import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Chip,
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
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Hotel as HotelIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock data for pending approvals
const mockApprovals = [
  {
    id: 'A001',
    reservationId: 'R001',
    guestId: 'G001',
    guestName: 'John Doe',
    roomId: '101',
    roomLabel: 'Ocean View Suite',
    startDate: '2024-03-15',
    endDate: '2024-03-20',
    totalAmount: 1500.00,
    status: 'pending',
    requestDate: '2024-02-28',
  },
  {
    id: 'A002',
    reservationId: 'R002',
    guestId: 'G002',
    guestName: 'Jane Smith',
    roomId: '102',
    roomLabel: 'Mountain View Deluxe',
    startDate: '2024-04-01',
    endDate: '2024-04-05',
    totalAmount: 1200.00,
    status: 'pending',
    requestDate: '2024-02-29',
  },
];

export default function ApprovalRequests() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredApprovals = mockApprovals.filter(approval =>
    approval.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    approval.roomLabel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (approvalId) => {
    console.log('Approving request:', approvalId);
  };

  const handleReject = (approvalId) => {
    console.log('Rejecting request:', approvalId);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Pending Approvals
      </Typography>

      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by guest name or room..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Request Date</TableCell>
              <TableCell>Guest</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Dates</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApprovals.map((approval) => (
              <TableRow key={approval.id}>
                <TableCell>{approval.requestDate}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon color="primary" />
                    <Box>
                      <Typography variant="body1">{approval.guestName}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        ID: {approval.guestId}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HotelIcon color="primary" />
                    <Box>
                      <Typography variant="body1">{approval.roomLabel}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Room {approval.roomId}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    Check-in: {approval.startDate}
                  </Typography>
                  <Typography variant="body2">
                    Check-out: {approval.endDate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    Total Amount: AED {approval.totalAmount.toFixed(2)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="success"
                    onClick={() => handleApprove(approval.id)}
                  >
                    <ApproveIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleReject(approval.id)}
                  >
                    <RejectIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}