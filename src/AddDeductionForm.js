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
import moment from 'moment'; 
import InputAdornment from '@mui/material/InputAdornment';

const RedditTextField = styled((props) => (  //styled is a function used to add own styles, here it is used to customize the TextField. The arrrow function takes props and this props is passed through components and uses them to render the custom styled Textfield
  <TextField
    // slotProps={{ disableUnderline: true }}   // A slot is a part of a component that can be overridden and/or customized. Normally TextFields show an underline below the input
    {...props}  // Take all the props(name, value, onChange, etc) pass them down to TextField so that these customized styles can be applied to them
    variant="filled"  // This changes the style of the text field to the "filled" version — which usually has a light background with no outline.
    size="small"
  />
))(({ theme }) => ({     // theme is a MUI object that contains default styling rules. we’re writing custom styles
  '& .MuiFilledInput-root': {  // .MuiFilledInput-root means "specifically style the input area inside RedditTextField component."
    overflow: 'hidden',  // hides anything that doesn’t fit instead of showing a scrollbar or letting it spill out
    borderRadius: 9,  
    border: '1px solid',  // 1px solid means the input box will have a thin (1 pixel wide) solid line around it.
    fontSize: '0.875rem',  // 0.875rem is about 14 pixels (because 1 rem = 16 pixels, so 0.875 * 16 = 14)
    backgroundColor: '#FFFFFF',   // sets the color of the textfield to white
    borderColor: '#E0E3E7',  // light grey colour 
    transition: theme.transitions.create(['border-color', 'box-shadow']),  // This adds smooth animations (transitions) when user clicks the input (making it "focused"), the border color will change smoothly instead of instantly. 

    '&::before, &::after': {  // this ensures that no underline appears under the input at any time
      borderBottom: 'none !important',
    },

    '&.Mui-focused': {  // Changes the border color when the input is focused.
      borderColor: '#000000',
    },
  },

  '& .MuiInputLabel-root': {  // This targets the label of the TextField (e.g., "Name")
    color: '#1976d2',
    fontSize: '0.875rem',
    '&.Mui-focused': {    //  This keeps the label color the same when the input is focused.
      color: '#1976d2',
    },
    '&.MuiInputLabel-shrink': {  // This adjusts the label’s font size when it "shrinks."
      fontSize: '0.95rem',
    },
  },
  '& .MuiFormHelperText-root': {   //  This styles the helper text (error messages) below the input.
    marginLeft: '4px', 
    fontSize: '0.75rem', 
  },
}));


export default function AddDeductionForm({ onCancel, onSave, editId, editReimbursement, error, onSaveSuccess }) {  // This line defines a React component named AddDeductionForm and makes it the default export of the file. This means we can import this component in another file (App.js) using import AddDeductionForm from './AddDeductionForm';.
  const [formData, setFormData] = useState(  // uses React’s useState hook to create a state variable called formData and a function setFormData.
                                             // formData: An object that holds all the form’s values (like the name, amount, etc.).
                                             // setFormData: A function to update formData when the user types or changes something.
                                             // The stuff inside useState(...) is the initial value of formData when the form first loads.
    editReimbursement
      ? {                                   // Uses a ternary operator (? :) to decide what the initial formData should be
          name: editReimbursement.name,     // It checks if editReimbursement exists (i.e., we’re editing an existing reimbursement). If yes, it fills the form with existing data; if no, it starts with empty/default values.
          type: editReimbursement.category,  //This creates an object with all the fields of the form, filled with the existing reimbursement’s data.
          date: editReimbursement.date,
          deductFrom: editReimbursement.deductFrom,
          amount: editReimbursement.amount,
          document: editReimbursement.document,
          recurring: editReimbursement.recurring,
          remarks: editReimbursement.remarks,
        }
      : {
          name: '',                           // This creates an object with default empty values for all the form fields.
          type: '',
          date: moment().format('DD-MM-YYYY'), // Current Date
          deductFrom: '',
          amount: '',
          document: 'Screenshot.20231203',   // Pre Defined Data
          recurring: false,
          remarks: '',
        }
  );

  const [errors, setErrors] = useState({      // Creates a state variable called errors using React’s useState hook to store error messages for specific form fields.
                                              // errors: An object that holds error messages for each field (name, amount, type, deductFrom).
                                              // A function to update the errors object when something is wrong (e.g., a field is empty).
    name: '',
    amount: '',
    type: '',
    deductFrom: '',
  });

  const [formError, setFormError] = useState('');  // Creates another state variable called formError to store a top-level error message for the whole form.
                                                   // formError: A string to show a general error message at the top of the form (e.g., "Please fill in all required fields.").
                                                   // setFormError: A function to update formError when something goes wrong with the form as a whole.

  const handleChange = (e) => {                    // handleChange is a function that runs whenever the user changes something in the form (
    const { name, value, type, checked } = e.target;  // This pulls out specific pieces of information from the event (e) to know what the user changed.
                                                    // name: The name of the field that changed (e.g., "name", "amount", "recurring").
                                                    // value: The new value the user entered (e.g., "Flight Tickets" for the name field, or "500" for the amount field).
                                                    // type: The type of the input field (e.g., "text" for a text field, "checkbox" for a checkbox).
                                                    // checked: For checkboxes, this is true if checked, false if unchecked (only relevant for the recurring field).
    if (name === 'name') {                          // This checks if the field the user changed is the name field (
      const alphaSpaceRegex = /^[A-Za-z ]*$/;       
      const doubleSpaceRegex = /\s{2,}/;            // This is a rule that checks for two or more spaces in a row.
  
      if (!value.trim()) {                        // This checks if the name field is empty (or just spaces) and sets an error if it is.
        setErrors((prev) => ({                     // Takes the previous errors object (e.g., { name: '', amount: '', ... }).
          ...prev,                                 // Creates a new object with all the old errors (...prev) but changes name to the error message "Name is required."
          name: 'Name is required1.',
        }));
      } else if (!alphaSpaceRegex.test(value)) {    //  If the name isn’t empty, this checks if it contains anything other than letters and spaces.
        setErrors((prev) => ({                      // Updates errors to show "Only alphabets are allowed." for the name field.
          ...prev,
          name: 'Only alphabets are allowed.',
        }));
      } else if (doubleSpaceRegex.test(value)) {    // If the name passes the previous checks, this checks for double spaces.
        setErrors((prev) => ({                      // Sets an error message for name.
          ...prev,
          name: 'Double spaces are not allowed.',
        }));
      } else {
        setErrors((prev) => ({ ...prev, name: '' })); // If the name passes all checks (not empty, only letters/spaces, no double spaces), this clears the error.
      }
    }
  
    if (name === 'amount') {                        //  This checks if the user changed the amount field (the "Deduction Amount" text box).
      const amountRegex = /^[0-9]*\.?[0-9]*$/;      // allows decimal numbers too
      if (!value.trim()) {                          // This checks if the amount field is empty.
        setErrors((prev) => ({                      // Sets an error message for amount.
          ...prev,
          amount: 'Amount is required.',
        }));
      } else if (!amountRegex.test(value)) {        // If the amount isn’t empty, this checks if it’s a valid number.
        setErrors((prev) => ({                      //  Sets an error message for amount.
          ...prev,
          amount: 'Only numbers and one decimal point allowed.',
        }));
      } else {                                      // If the amount passes all checks, this clears the error.
        setErrors((prev) => ({ ...prev, amount: '' }));  // Sets amount error to an empty string (no error).
      }
    }
  
    if (name === 'type') {                        //  If the user changed the "Type" dropdown.
      if (!value) {                               //  If the value is empty (e.g., no option selected), this is true.
        setErrors((prev) => ({                    //  Sets an error message for type.
          ...prev,
          type: 'Type is required.',
        }));
      } else {
        setErrors((prev) => ({ ...prev, type: '' }));  
      }
    }
  
    if (name === 'deductFrom') {                  //  This validates the deductFrom field (the "Deduct From" dropdown, e.g., "Payroll", "Bank Balance").  
      if (!value) {                               // If no option is selected, this is true.
        setErrors((prev) => ({                    // Sets an error message.
          ...prev,
          deductFrom: 'Deduct From is required.',
        }));
      } else {
        setErrors((prev) => ({ ...prev, deductFrom: '' }));  //  If an option is selected, clear the error.
      }
    }
  
    setFormData((prev) => ({            //  This updates the formData state with the new value the user entered.
      ...prev,                          // This creates a new object and copies all the current values from prev (the old formData) into it.
      [name]: type === 'checkbox' ? checked : value,  // The [name] variable (e.g., "name", "amount", "recurring") decides which field in the object to update.
                                                      // type === 'checkbox': Checks if the field is a checkbox
                                                      // If the field is a checkbox (type === 'checkbox' is true), use checked (which is true or false). Otherwise, use value (what the user typed or selected).
    }));
  };

  const handleSave = () => {                //  This defines a function called handleSave that runs when the user clicks the "Save" button.
    // Check for existing errors or empty required fields
    if (errors.name || errors.amount || errors.type || errors.deductFrom) {
      setFormError('Please correct the invalid data before saving.');
      setTimeout(() => setFormError(''), 2000);
      return;
    }
  
    // Additional checks for emptiness (in case errors are cleared but fields are empty)
    if (!formData.name.trim()) {          //  This checks if the name field is empty, even if there wasn’t an error set earlier.
      setErrors((prev) => ({ ...prev, name: 'Name is required.' }));  //  Sets an error message for name.
      setFormError('Please fill in all required fields.');            // Shows a top-level error message.
      setTimeout(() => setFormError(''), 2000);
      return;
    }
  
    if (!formData.amount.trim()) {
      setErrors((prev) => ({ ...prev, amount: 'Amount is required.' }));
      setFormError('Please fill in all required fields.');
      setTimeout(() => setFormError(''), 2000);
      return;
    }
  
    if (!formData.type) {
      setErrors((prev) => ({ ...prev, type: 'Type is required.' }));
      setFormError('Please fill in all required fields.');
      setTimeout(() => setFormError(''), 2000);
      return;
    }
  
    if (!formData.deductFrom) {
      setErrors((prev) => ({ ...prev, deductFrom: 'Deduct From is required.' }));
      setFormError('Please fill in all required fields.');
      setTimeout(() => setFormError(''), 2000);
      return;
    }
  
    const amount = parseFloat(formData.amount);     //  This converts the amount (a string) into a number.
    if (isNaN(amount)) {                            // if amount is "Not a Number."
      setErrors((prev) => ({ ...prev, amount: 'Valid amount is required.' }));  //  Sets an error for amount.
      setFormError('Please correct the invalid data before saving.');
      setTimeout(() => setFormError(''), 2000);
      return;
    }
  
    setFormError('');       //  Sets formError to an empty string, removing any top-level error message.
    onSave({                //  We send all the form data to the parent component to save the reimbursement (e.g., add it to the list in ReimbursementsList.js).
      name: formData.name,
      category: formData.type,
      deductFrom: formData.deductFrom,
      date: formData.date,
      amount,
      recurring: formData.recurring,
      remarks: formData.remarks,
      document: formData.document,
    });
  
    if (onSaveSuccess) {  //  Checks if onSaveSuccess exists (it’s a prop passed from the parent).
      onSaveSuccess();    //  This calls the onSaveSuccess function to trigger the success message(in ReimbursementsList.js).
    }
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

        {formError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {formError}
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
              error={!!errors.type}
              helperText={errors.type}
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
              name="deductFrom"
              label="Deduct From"
              select
              value={formData.deductFrom}
              onChange={handleChange}
              error={!!errors.deductFrom}
              helperText={errors.deductFrom}
            >
              <MenuItem value="Payroll">Payroll</MenuItem>
              <MenuItem value="Bank Balance">Bank Balance</MenuItem>
              <MenuItem value="PF Fund">PF Fund</MenuItem>
            </RedditTextField>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
            <RedditTextField
              fullWidth
              name="amount"
              label="Deduction Amount"
              value={formData.amount}
              onChange={handleChange}
              error={!!errors.amount}
              helperText={errors.amount}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: '#000000' }}>
                    $
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ width: '100%' }}>
              <RedditTextField
                fullWidth
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
              <FormHelperText sx={{ mt: 0.25, ml: '4px', fontSize: '0.75rem' }}>
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