import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton, Divider, Alert } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';

function ReimbursementsList({ onAddNew, onEdit, onDelete, reimbursements, onSaveSuccess }) {
  const totalReimbursements = reimbursements.reduce((sum, item) => sum + item.amount, 0);
  const [successMessage, setSuccessMessage] = useState('');

  // Trigger success message when onSaveSuccess is called
  useEffect(() => {
    if (onSaveSuccess) {
      setSuccessMessage('Reimbursement saved successfully.');
      const timer = setTimeout(() => setSuccessMessage(''), 2000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [onSaveSuccess]);

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

      {successMessage && (
        <Alert
          severity="success"
          sx={{
            mb: 2,
            mx: 2, // Margin on sides for alignment
            backgroundColor: '#4caf50',
            color: '#fff',
            '& .MuiAlert-icon': {
              color: '#fff',
            },
          }}
        >
          {successMessage}
        </Alert>
      )}

      <List sx={{ flexGrow: 1 }}>
        {reimbursements.map((reimbursement, index) => (
          <React.Fragment key={reimbursement.id}>
            <ListItem
              secondaryAction={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AttachMoneyRoundedIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="body1">{reimbursement.amount}</Typography>
                  </Box>
                  <IconButton edge="end" aria-label="edit" size="large" onClick={() => onEdit(reimbursement.id)}>
                    <EditOutlinedIcon fontSize="medium" />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" size="large" onClick={() => onDelete(reimbursement.id)}>
                    <DeleteOutlineOutlinedIcon fontSize="medium" color="error" />
                  </IconButton>
                </Box>
              }
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#fff5f5',
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
                  secondary={
                    [
                      reimbursement.category,
                      `Adding to ${reimbursement.deductFrom}`,
                    ]
                      .filter(Boolean)
                      .join(' \u00A0\u00A0\u2022\u00A0\u00A0 ')
                  }
                />
              </Box>
            </ListItem>
            {index < reimbursements.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>

      <Divider sx={{ mt: 2, mb: 1.5 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body1">Total Reimbursements</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AttachMoneyRoundedIcon fontSize="small" />
          <Typography variant="body1">{totalReimbursements}</Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 2.5 }} />
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