import React from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';

const dummyReimbursements = [
  { id: 1, name: 'Flight Tickets', category: 'Travel', details: 'Adding to Credit Summary', amount: 500 },
  { id: 2, name: 'Phone Bill', category: 'Travel', details: 'Adding to payroll', amount: 100 },
  { id: 3, name: 'Train Tickets', category: 'Travel', details: 'Adding to payroll', amount: 200 },
  
];

function ReimbursementsList({ onAddNew }) {
  const totalReimbursements = dummyReimbursements.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h7" sx={{ padding: '0 16px', mt: 2.25 }}>
          Added Reimbursements
        </Typography>
        <Button
          variant="contained"
          onClick={onAddNew}
          sx={{
            textTransform: 'none',
            mt: 1.5,
            mr: 1.5,
            backgroundColor: '#2876ea',
          }}
        >
          Add New
        </Button>
      </Box>

      <List sx={{ flexGrow: 1 }}>
        {dummyReimbursements.map((reimbursement, index) => ( // Added index here
          <React.Fragment key={reimbursement.id}> {/* Use Fragment to group ListItem and Divider */}
            <ListItem
              // ... (ListItem props like secondaryAction)
                secondaryAction={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {/* Amount with currency icon */}
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                         <AttachMoneyRoundedIcon fontSize="small" sx={{ mr: 0.5 }} /> {/* Adjusted mr */}
                         <Typography variant="body1">{reimbursement.amount}</Typography>
                      </Box>

                      {/* Edit Icon Button */}
                      <IconButton edge="end" aria-label="edit" size="large"> {/* Changed size to small */}
                        <EditOutlinedIcon fontSize="medium" /> {/* Changed fontSize to small */}
                      </IconButton>

                      {/* Delete Icon Button (color changed to red) */}
                      <IconButton edge="end" aria-label="delete" size="large"> {/* Changed size to small */}
                        <DeleteOutlineOutlinedIcon fontSize="medium" color="error" /> {/* Used color="error" for red */}
                      </IconButton>
                   </Box>
                }
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                 {/* Icon on the left (color changed to match reimbursement icon) */}
                 {/* Ensure the color here is the intended one, '#1976d2' (MUI blue) or 'red' */}
                 <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff5f5', // light red
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    mr: 1,
                  }}
                >
                  <ArrowOutwardIcon sx={{ color: 'red', fontSize: 20 }} />
                </Box>

                <ListItemText
                  primary={<Typography variant="body1" sx={{ fontWeight: 'medium' }}>{reimbursement.name}</Typography>}
                  // Add spaces around the bullet point for more separation
                  secondary={`${reimbursement.category} \u00A0\u2022\u00A0 ${reimbursement.details}`}
                />
              </Box>
            </ListItem>
            {/* Add Divider after the ListItem, but not after the last one */}
            {index < dummyReimbursements.length - 1 && <Divider component="li" />} {/* Conditionally render Divider */}
          </React.Fragment>
        ))}
      </List>

      {/* Divider before the total section */}
      <Divider sx={{ mt: 2, mb: 1.5 }} />

      {/* Total Reimbursements section (will be pushed to the bottom) */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body1"> {/* Changed to body1 for smaller text like the image */}
          Total Reimbursements
        </Typography>
        {/* Box for the total amount including the currency icon */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AttachMoneyRoundedIcon fontSize="small"  />
            <Typography variant="body1"> {/* Changed to body1 for smaller text */}
              {totalReimbursements}
            </Typography>
        </Box>
      </Box>

      {/* Divider after the total section (based on image) */}
       <Divider sx={{ mb: 2.5 }} />


      {/* Done button (aligned to the right and pushed to the bottom) */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          sx={{ textTransform: 'none', backgroundColor: '#2876ea', mr: 1.5 }}
        >
          Done
        </Button>
      </Box>
    </Box>
  );
}

export default ReimbursementsList;