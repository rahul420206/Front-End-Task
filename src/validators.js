export const validateName = (value) => {
    const alphaSpaceRegex = /^[A-Za-z ]*$/;
    const doubleSpaceRegex = /\s{2,}/;
  
    if (!value.trim()) {
      return 'Name is required.';
    }
    if (!alphaSpaceRegex.test(value)) {
      return 'Only alphabets are allowed.';
    }
    if (doubleSpaceRegex.test(value)) {
      return 'Double spaces are not allowed.';
    }
    return '';
  };
  
  export const validateAmount = (value) => {
    const amountRegex = /^[0-9]*\.?[0-9]*$/;
  
    if (!value.trim()) {
      return 'Amount is required.';
    }
    if (!amountRegex.test(value)) {
      return 'Only numbers and one decimal point allowed.';
    }
    return '';
  };
  
  export const validateType = (value) => {
    if (!value) {
      return 'Type is required.';
    }
    return '';
  };
  export const validateDeductFrom = (value) => {
    if (!value) {
      return 'Deduct From is required.';
    }
    return '';
  };