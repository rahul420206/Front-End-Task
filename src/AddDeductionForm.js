import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import FormHelperText from '@mui/material/FormHelperText'; // Import FormHelperText

export default function SimpleDeductionForm({ onCancel }) {
  const [name, setName] = React.useState('Training');
  const [type, setType] = React.useState('Training Cost');
  const [dateOfExpense, setDateOfExpense] = React.useState('2022-01-02');
  const [deductFrom, setDeductFrom] = React.useState('Payroll');
  const [deductionAmount, setDeductionAmount] = React.useState('$ 500');
  const [selectedFile, setSelectedFile] = React.useState({ name: 'Screenshot.20231203' });
  const [recurring, setRecurring] = React.useState(false);
  const [remarks, setRemarks] = React.useState('');

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      console.log("File selected:", event.target.files[0].name);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    console.log("File removed");
  };

  const handleFilePreview = () => {
    if (selectedFile) {
      console.log('Previewing file:', selectedFile.name);
    }
  };

  const handleSave = () => {
    const formData = {
      name,
      type,
      dateOfExpense,
      deductFrom,
      deductionAmount,
      fileName: selectedFile ? selectedFile.name : 'No file selected',
      recurring,
      remarks,
    };
    console.log('Form Data to Save:', formData);
  };

  const labelColor = '#1976d2'; // Defined label color

  // Common sx for TextField labels
  const textFieldLabelSx = {
    '& .MuiInputLabel-root': { color: labelColor },
    '& .MuiInputLabel-root.Mui-focused': { color: labelColor },
  };

  return (
    <Box sx={{ p: 3, maxWidth: 700, margin: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          Add Deduction
        </Typography>
        <Typography variant="body1">
          Current Balance: <span style={{ color: '#1976d2', fontWeight: 'bold' }}>$6,426.00</span>
        </Typography>
      </Box>

      <Box>
        {/* Row 1: Name and Type */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2.5 }}>
          <TextField
            required
            fullWidth
            id="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            sx={textFieldLabelSx}
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel id="type-select-label" sx={{ color: labelColor }}>Type</InputLabel>
            <Select
              labelId="type-select-label"
              id="type-select"
              value={type}
              label="Type"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="Training Cost">Training Cost</MenuItem>
              <MenuItem value="My Salary">My Salary</MenuItem>
              <MenuItem value="My Expenses">My Expenses</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Row 2: Date of Expense and Deduct From */}
        <Box sx={{ display: 'flex', gap: 2, mb: 2.5 }}>
          <TextField
            fullWidth
            id="date-of-expense"
            label="Date of Expense"
            type="date"
            value={dateOfExpense}
            onChange={(e) => setDateOfExpense(e.target.value)}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            sx={textFieldLabelSx}
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel id="deduct-from-label" sx={{ color: labelColor }}>Deduct From</InputLabel>
            <Select
              labelId="deduct-from-label"
              id="deduct-from-select"
              value={deductFrom}
              label="Deduct From"
              onChange={(e) => setDeductFrom(e.target.value)}
            >
              <MenuItem value="Payroll">Payroll</MenuItem>
              <MenuItem value="Bank Balance">Bank Balance</MenuItem>
              <MenuItem value="Kidney">Kidney</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Row 3: Deduction Amount and Supporting Document */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2.5 }}>
          <TextField
            fullWidth
            id="deduction-amount"
            label="Deduction Amount"
            value={deductionAmount}
            onChange={(e) => setDeductionAmount(e.target.value)}
            variant="outlined"
            sx={textFieldLabelSx}
          />
          <Box sx={{ width: '100%' }}> {/* Container for Supporting Document field */}
            
<Box
  id="supporting-document-interactive-area"
  sx={{
    display: 'flex',
    alignItems: 'center',
    height: '54px', // Increased from 40px to 48px for a larger field
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '4px',
    padding: selectedFile ? '0px 10px 0px 16px' : '0px', // Slightly increased padding for file view
    boxSizing: 'border-box',
    justifyContent: selectedFile ? 'space-between' : 'flex-start',
  }}
>
  {!selectedFile ? (
    <Button
      component="label"
      fullWidth
      role={undefined}
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
      sx={{
        textTransform: 'none',
        justifyContent: 'flex-start',
        height: '100%', // Ensure button fills the larger Box height
        border: 'none',
        padding: '0 16px', // Slightly increased padding for better spacing
        color: 'rgba(0, 0, 0, 0.87)',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      }}
    >
      Upload file
    </Button>
  ) : (
    <>
      <Typography
        variant="body1" // Changed from body2 to body1 for slightly larger text
        sx={{
          flexGrow: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {selectedFile.name}
      </Typography>
      <Box>
        <IconButton onClick={handleFilePreview} aria-label="preview file" title="Preview file">
          <VisibilityIcon fontSize="small" sx={{ color: labelColor }} />
        </IconButton>
        <IconButton onClick={clearSelectedFile} aria-label="delete file" title="Delete file">
          <DeleteIcon fontSize="small" sx={{ color: 'red' }} />
        </IconButton>
      </Box>
    </>
  )}
</Box>
<FormHelperText sx={{ mt: 0.5, ml: '16px' }}>
  File size should not exceed 25mb
</FormHelperText>
          </Box>
        </Box>

        {/* Recurring Deduction (Full Width) */}
        <FormGroup sx={{ mb: 1.5 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={recurring}
                onChange={(e) => setRecurring(e.target.checked)}
                size="small"
              />
            }
            label="Recurring Deduction"
            sx={{ '& .MuiFormControlLabel-label': { color: '#1976d2' } }}
          />
        </FormGroup>

        {/* Remarks (Full Width) */}
        <TextField
          fullWidth
          id="remarks"
          label={
            <>
              Remarks{' '}
              <span style={{ color: 'rgba(0, 0, 0, 0.6)' }}>(Optional)</span>
            </>
          }
          multiline
          rows={2}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          variant="outlined"
          sx={{ mb: 2.5, }}
          InputLabelProps={{
            sx: {
              color: '#1976d2', // Smaller font size for the label
            },
          }}
        />
      </Box>

      {/* Action Buttons: Cancel and Save */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 10 }}> {/* User's original mt value */}
        <Button
          variant="outlined"
          onClick={onCancel}
          sx={{ mr: 1, textTransform: 'none', border: 0 }}
          style={{ color: 'rgba(0, 0, 0, 0.6)' }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ textTransform: 'none' }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}