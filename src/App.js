import React, { useState } from 'react';
import { Box, Card, CardContent, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import ReimbursementsList from './ReimbursementsList';
import AddDeductionForm from './AddDeductionForm';

// MUI theme with Quicksand Semi Bold
const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand, sans-serif',
    fontWeight: 700,
  },
});

function App() {
  const [showAddDeductionForm, setShowAddDeductionForm] = useState(false);

  const handleAddNewClick = () => {
    setShowAddDeductionForm(true);
  };

  const handleCancelClick = () => {
    setShowAddDeductionForm(false);
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
            width: 600,         // Portrait width
            height: 700,        // Portrait height
            borderRadius: 3,
            boxShadow: 3,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardContent sx={{ flex: 1, overflowY: 'auto' }}>
            {showAddDeductionForm ? (
              <AddDeductionForm onCancel={handleCancelClick} />
            ) : (
              <ReimbursementsList onAddNew={handleAddNewClick} />
            )}
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}

export default App;
