const validateAuth = (fields, fieldNames) => {
  const error = { status: false };

  fieldNames.forEach((field) => {
    if (!fields[field] || fields[field].trim() === '') {
      switch (field) {
        case 'firstname':
          error[field] = 'Please enter your first name';
          break;
        case 'lastname':
          error[field] = 'Please enter your last name';
          break;
        case 'confirmPassword':
          error[field] = 'Please confirm your password.';
          break;
        default:
          error[field] = `Please enter a valid ${field}.`;
      }
      error.status = true;
    }
  });

  // checks for valid email
  const emailFormat = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
  if (fields.email) {
    if (!emailFormat.test(fields.email.trim())) {
      error.email = 'You\'ve entered an invalid email.';
      error.status = true;
    }
  }

  // checks for valid password
  const alphaNumberic = /((^[0-9]+[a-z]+)|(^[a-z]+[0-9]+))+[0-9a-z]+$/i;
  if (fields.password) {
    if (fields.password.length < 8 && !alphaNumberic.test(fields.password.trim())) {
      error.password = 'Your password must be more than 8 characters.';
      error.status = true;
    }
  }

  // checks if passwords match
  if (fields.confirmPassword) {
    if (fields.password !== '' && fields.confirmPassword !== '') {
      if (fields.password !== fields.confirmPassword) {
        error.confirmPassword = 'Passwords do not match.';
        error.status = true;
      }
    }
  }

  return error;
};

export default validateAuth;
