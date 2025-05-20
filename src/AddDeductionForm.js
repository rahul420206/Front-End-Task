import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FormHelperText from '@mui/material/FormHelperText';
import { styled, TextField } from '@mui/material';
import { Box, Typography, IconButton, Button } from '@mui/material';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

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
      color: '#1976d2', // Ensure label color stays consistent when focused
    },
    '&.MuiInputLabel-shrink': {
      fontSize: '0.95rem',
    },
  },
}));

export default function AddDeductionForm({ onCancel }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', maxWidth: 600, margin: 'auto' }}>
      {/* Scrollable Form Content Area */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h7" fontWeight="bold">
            Add Deduction
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem' }}>
            Current Balance: <Box component="span" sx={{ color: '#007be4', fontWeight: 'bold' }}>$6,426.00</Box>
          </Typography>
        </Box>

        {/* Container for all form fields */}
        <Box>
          {/* Row 1: Name and Type */}
          <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
            <RedditTextField fullWidth id="name" label="Name" defaultValue="Training" />
            <RedditTextField
              fullWidth
              id="type-select"
              label="Type"
              select
              defaultValue="Training Cost"
            >
              <MenuItem value="Training Cost">Training Cost</MenuItem>
              <MenuItem value="My Salary">My Salary</MenuItem>
              <MenuItem value="My Expenses">My Expenses</MenuItem>
            </RedditTextField>
          </Box>

          {/* Row 2: Date of Expense and Deduct From */}
          <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
            <RedditTextField
              fullWidth
              id="date-of-expense"
              label="Date of Expense"
              type="date"
              defaultValue="2022-01-02"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <IconButton 
                  >
                    <CalendarTodayOutlinedIcon fontSize="small" sx={{ color: '#1976d2' }} />
                  </IconButton>
                ),
                sx: {
                  // Re-hide the default browser calendar icon
                  '& input::-webkit-calendar-picker-indicator': {
                    display: 'none',
                  },
                  // Ensure the input field is clickable
                  '& input': {
                    cursor: 'pointer',
                    // Explicitly remove any borderBottom on the input element itself
                    borderBottom: 'none',
                  },
                  '& .MuiInputAdornment-root': {
                  }
                },
              }}
              sx={{
                '& .MuiFilledInput-root': {
                  paddingRight: '8px',
                  // Override any potential browser-specific underlines and Material-UI underlines
                  '&:before, &:after': {
                    borderBottom: 'none !important', // Use !important to ensure override
                  },
                  // Remove underline on hover
                  '&:hover:not(.Mui-disabled):before': {
                    borderBottom: 'none !important',
                  },

                },
              }}
            />
            <RedditTextField
              fullWidth
              id="deduct-from-select"
              label="Deduct From"
              select
              defaultValue="Payroll"
            >
              <MenuItem value="Payroll">Payroll</MenuItem>
              <MenuItem value="Bank Balance">Bank Balance</MenuItem>
              <MenuItem value="Kidney">Kidney</MenuItem>
            </RedditTextField>
          </Box>

          {/* Row 3: Deduction Amount and Supporting Document */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
            <RedditTextField fullWidth id="deduction-amount" label="Deduction Amount" defaultValue="$ 500" />
            <Box sx={{ width: '100%' }}>
              <RedditTextField
                fullWidth
                id="supporting-document"
                label="Supporting Document"
                defaultValue="Screenshot.20231203"
                InputProps={{
                  readOnly: true,
                  disableUnderline: true,
                  endAdornment: (
                    <>
            <IconButton
              aria-label="preview file"
              title="Preview file"
              sx={{
                backgroundColor: '#f0f8ff', // Light blue background
                borderRadius: 1,
                px: 1.2,
                py: 0.8,
                mr: 0.5, // Small margin to separate icons
              }}
            >
              <VisibilityOutlinedIcon fontSize="small" sx={{ color: '#1976d2' }} />
            </IconButton>
            <IconButton
              aria-label="delete file"
              title="Delete file"
              sx={{
                backgroundColor: '#fff5f5', // Light red background
                borderRadius: 1,
                px: 1.2,
                py: 0.8,
                mr: 1,
                ml: 1 
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

          {/* Recurring Deduction (Full Width) */}
          <FormGroup sx={{ mb: 1 }}>
            <FormControlLabel
              control={<Checkbox defaultChecked={false} size="small" />}
              label="Recurring Deduction"
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
            />
          </FormGroup>

          {/* Remarks (Full Width) */}
          <RedditTextField
            fullWidth
            id="remarks"
            label={
              <>
                Remarks{' '}
                <span style={{ color: 'rgba(0, 0, 0, 0.3)' }}>(Optional)</span>
              </>
            }
            multiline
            rows={2}
            defaultValue=""
          />
        </Box>
      </Box>

      {/* Action Buttons: Cancel and Save (Footer section) */}
      <Box sx={{ p: 2, backgroundColor: 'background.paper', display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Button variant="text" onClick={onCancel} sx={{ textTransform: 'none', color: 'text.secondary' }}>
          Cancel
        </Button>
        <Button variant="contained" sx={{ textTransform: 'none', backgroundColor: '#2876ea' }}>
          Save
        </Button>
      </Box>
    </Box>
  );
}