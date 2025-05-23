import React, { useState } from 'react';
import { Box, Card, CardContent, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ReimbursementsList from './ReimbursementsList';
import AddDeductionForm from './AddDeductionForm';

const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand, sans-serif',
    fontWeight: 700,
  },
});

function App() {
  const [showAddDeductionForm, setShowAddDeductionForm] = useState(false);
  const [saveSuccessTrigger, setSaveSuccessTrigger] = useState(0);
  const [reimbursements, setReimbursements] = useState([
    {
      id: 1,
      name: 'Flight Tickets',
      category: 'Travel',
      deductFrom: 'Credit Summary',
      date: '2025-05-20',
      amount: 500,
      recurring: false,
      remarks: 'Business trip to Assam',
      document: 'Screenshot.20231203',
    },
    {
      id: 2,
      name: 'Phone Bill',
      category: 'Training Cost',
      deductFrom: 'Payroll',
      date: '2025-05-19',
      amount: 100,
      recurring: true,
      remarks: '',
      document: 'Screenshot.20231203',
    },
    {
      id: 3,
      name: 'Train Tickets',
      category: 'My Expenses',
      deductFrom: 'Payroll',
      date: '2025-05-18',
      amount: 200,
      recurring: false,
      remarks: 'Client meeting',
      document: 'Screenshot.20231203',
    },
  ]);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  const handleAddNewClick = () => {
    setShowAddDeductionForm(true);
  };

  const handleCancelClick = () => {
    setEditId(null);
    setShowAddDeductionForm(false);
    setError(''); 
  };

  const handleEditClick = (id) => {
    setEditId(id);
    setShowAddDeductionForm(true);
    setError(''); 
  };

  const handleDeleteClick = (id) => {
    setReimbursements((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveDeduction = (newDeduction) => {
    // Check for duplicates (name, category, deductFrom, date, amount)
    const isDuplicate = reimbursements.some(
      (item) =>
        item.id !== editId && // Exclude the item being edited
        item.name === newDeduction.name &&
        item.category === newDeduction.category &&
        item.deductFrom === newDeduction.deductFrom &&
        item.date === newDeduction.date &&
        item.amount === newDeduction.amount
    );
    if (isDuplicate) {
      setError('This reimbursement already exists.');
      setTimeout(() => setError(''), 2000);
      return;
    }

    if (editId) {
      setReimbursements((prev) =>
        prev.map((item) =>
          item.id === editId ? { ...item, ...newDeduction } : item
        )
      );
    } else {
      setReimbursements((prev) => [
        ...prev,
        { id: prev.length + 1, ...newDeduction },
      ]);
    }
    setEditId(null);
    setShowAddDeductionForm(false);
    setError('');
    setSaveSuccessTrigger((prev) => prev + 1); // Trigger success message
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f0f0f0',
        }}
      >
        <Card
          sx={{
            width: 650,
            height: 800,
            borderRadius: 3,
            boxShadow: 3,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardContent sx={{ flex: 1, overflowY: 'auto' }}>
            {showAddDeductionForm ? (
              <AddDeductionForm
                onCancel={handleCancelClick}
                onSave={handleSaveDeduction}
                editId={editId}
                editReimbursement={reimbursements.find((item) => item.id === editId)}
                error={error}
                onSaveSuccess={() => setSaveSuccessTrigger((prev) => prev + 1)} // Pass callback
              />
            ) : (
              <ReimbursementsList
                onAddNew={handleAddNewClick}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
                reimbursements={reimbursements}
                onSaveSuccess={saveSuccessTrigger} // Pass trigger
              />
            )}
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}

export default App;