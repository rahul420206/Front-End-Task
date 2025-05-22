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
import moment from 'moment'; // Added Moment.js import
import InputAdornment from '@mui/material/InputAdornment';

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
    boxShadow: 'none',

    '&::before, &::after': {
      borderBottom: 'none !important',
    },

    '&.Mui-focused': {
      borderColor: '#1976d2',
      backgroundColor: '#fff',
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
          date: moment().format('DD-MM-YYYY'), 
          deductFrom: '',
          amount: '',
          document: 'Screenshot.20231203',
          recurring: false,
          remarks: '',
        }
  );

  const [errors, setErrors] = useState({
    name: '',
    // Add other field errors if needed
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    // Validation logic for 'name' field
    if (name === 'name') {
      const alphaSpaceRegex = /^[A-Za-z ]*$/;
      const doubleSpaceRegex = /\s{2,}/;
  
      if (!alphaSpaceRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          name: 'Only alphabets are allowed.',
        }));
        return;
      }
  
      if (doubleSpaceRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          name: 'Double spaces are not allowed.',
        }));
        return;
      }
  
      setErrors((prev) => ({ ...prev, name: '' }));
    }
  
    // Validation logic for 'amount' field
    if (name === 'amount') {
      const amountRegex = /^[0-9]*\.?[0-9]*$/; // allows decimals
    
      if (!amountRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          amount: 'Only numbers and one decimal point allowed.',
        }));
        return;
      }
    
      setErrors((prev) => ({ ...prev, amount: '' }));
    }    
  
    // Set the value if everything is valid
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
            error={!!errors.name}
            helperText={errors.name}
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
              <MenuItem value="My Salary">My Salary</MenuItem>
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
                  <IconButton aria-label="calendar" title="Calendar">
                    <CalendarTodayOutlinedIcon fontSize="small" sx={{ color: '#1976d2' }} />
                  </IconButton>
                ),
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
              <MenuItem value="Bank Balance">Bank Balance</MenuItem>
              <MenuItem value="Kidney">Kidney</MenuItem>
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
              error={Boolean(errors.amount)}
              helperText={errors.amount}
              InputProps={{
                startAdornment: <InputAdornment position="start" color>$</InputAdornment>,
              }}
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
          sx={{ textTransform: 'Capitalize', color: 'text.secondary' }}
        >
          cancel
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