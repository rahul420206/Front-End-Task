import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import FormHelperText from '@mui/material/FormHelperText';
import Alert from '@mui/material/Alert'; 
import { styled, TextField } from '@mui/material';
import { Box, Typography, IconButton, Button } from '@mui/material';

const RedditTextField = styled((props) => (
  <TextField
    InputProps={{ disableUnderline: true }}
    {...props}
    variant="filled"
    size="small"
  />
))(({ theme }) => ({
  '& .MuiFilledInput-root': {
    overflow: 'hidden',
    borderRadius: 9,
    border: '1px solid',
    fontSize: '0.875rem',
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E3E7',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#F5F5F5',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#1976d2',
    fontSize: '0.875rem',
    '&.Mui-focused': {
      color: '#1976d2',
    },
    '&.MuiInputLabel-shrink': {
      fontSize: '0.95rem',
    },
  },
}));

export default function AddDeductionForm({ onCancel, onSave, editId, editReimbursement, error }) {
  const [formData, setFormData] = useState(
    editReimbursement
      ? {
          name: editReimbursement.name,
          type: editReimbursement.category,
          date: editReimbursement.date,
          deductFrom: editReimbursement.deductFrom,
          amount: `$ ${editReimbursement.amount}`,
          document: editReimbursement.document,
          recurring: editReimbursement.recurring,
          remarks: editReimbursement.remarks,
        }
      : {
          name: '',
          type: '',
          date: new Date().toISOString().split('T')[0], 
          deductFrom: '',
          amount: '$ ',
          document: 'Screenshot.20231203',
          recurring: false,
          remarks: '',
        }
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = () => {
    const amount = parseFloat(formData.amount.replace('$', '').trim());
    if (isNaN(amount)) return;
    if (!formData.date) return; 
    onSave({
      name: formData.name,
      category: formData.type,
      deductFrom: formData.deductFrom,
      date: formData.date,
      amount,
      recurring: formData.recurring,
      remarks: formData.remarks,
      document: formData.document,
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: 600, margin: 'auto' }}>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" fontWeight="bold">
            {editId ? 'Edit Deduction' : 'Add Deduction'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
            Current Balance: <Box component="span" sx={{ color: '#007be4', fontWeight: 'bold' }}>$6,426.00</Box>
          </Typography>
        </Box>

        {/* Added error alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box>
          <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
            <RedditTextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <RedditTextField
              fullWidth
              id="type-select"
              name="type"
              label="Type"
              select
              value={formData.type}
              onChange={handleChange}
            >
              <MenuItem value="Training Cost">Training Cost</MenuItem>
              <MenuItem value="Travel">Travel</MenuItem>
              <MenuItem value="My Expenses">My Expenses</MenuItem>
            </RedditTextField>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
            <RedditTextField
              fullWidth
              id="date-of-expense"
              name="date"
              label="Date of Expense"
              type="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <IconButton aria-label="calendar" title="Calendar" disableRipple>
                    <CalendarTodayOutlinedIcon fontSize="small" sx={{ color: '#1976d2' }} />
                  </IconButton>
                ),
                sx: {
                  '& input::-webkit-calendar-picker-indicator': { display: 'none' },
                  '& input': { cursor: 'pointer', borderBottom: 'none' },
                },
              }}
              sx={{
                '& .MuiFilledInput-root': {
                  paddingRight: '8px',
                  '&:before, &:after': { borderBottom: 'none' },
                },
              }}
            />
            <RedditTextField
              fullWidth
              id="deduct-from-select"
              name="deductFrom"
              label="Deduct From"
              select
              value={formData.deductFrom}
              onChange={handleChange}
            >
              <MenuItem value="Payroll">Payroll</MenuItem>
              <MenuItem value="Credit Summary">Credit Summary</MenuItem>
              <MenuItem value="PF Fund">PF Fund</MenuItem>
            </RedditTextField>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
            <RedditTextField
              fullWidth
              id="deduction-amount"
              name="amount"
              label="Deduction Amount"
              value={formData.amount}
              onChange={handleChange}
            />
            <Box sx={{ width: '100%' }}>
              <RedditTextField
                fullWidth
                id="supporting-document"
                name="document"
                label="Supporting Document"
                value={formData.document}
                onChange={handleChange}
                InputProps={{
                  readOnly: true,
                  disableUnderline: true,
                  endAdornment: (
                    <>
                      <IconButton
                        aria-label="preview file"
                        title="Preview file"
                        sx={{
                          backgroundColor: '#f0f8ff',
                          borderRadius: 1,
                          px: 1.2,
                          py: 0.8,
                          mr: 0.5,
                        }}
                      >
                        <VisibilityOutlinedIcon fontSize="small" sx={{ color: '#1976d2' }} />
                      </IconButton>
                      <IconButton
                        aria-label="delete file"
                        title="Delete file"
                        sx={{
                          backgroundColor: '#fff5f5',
                          borderRadius: 1,
                          px: 1.2,
                          py: 0.8,
                          mr: 1,
                          ml: 1,
                        }}
                      >
                        <DeleteOutlineOutlinedIcon fontSize="small" sx={{ color: 'red' }} />
                      </IconButton>
                    </>
                  ),
                }}
                sx={{ '& .MuiFilledInput-root': { paddingRight: '8px' } }}
              />
              <FormHelperText sx={{ mt: 0.25, ml: '12px', fontSize: '0.75rem' }}>
                File size should not exceed 25mb
              </FormHelperText>
            </Box>
          </Box>

          <FormGroup sx={{ mb: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  name="recurring"
                  checked={formData.recurring}
                  onChange={handleChange}
                  size="small"
                />
              }
              label="Recurring Deduction"
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
            />
          </FormGroup>

          <RedditTextField
            fullWidth
            id="remarks"
            name="remarks"
            label={
              <>
                Remarks <span style={{ color: 'rgba(0, 0, 0, 0.3)' }}>(Optional)</span>
              </>
            }
            multiline
            rows={2}
            value={formData.remarks}
            onChange={handleChange}
          />
        </Box>
      </Box>

      <Box sx={{ p: 2, backgroundColor: 'background.paper', display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button
          variant="text"
          onClick={onCancel}
          sx={{ textTransform: 'none', color: 'text.secondary' }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ textTransform: 'none', backgroundColor: '#2876ea' }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}