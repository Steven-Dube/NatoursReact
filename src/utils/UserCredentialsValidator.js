export const validateEmail = (email) => {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
}

export const validateName = (name) => {
  return name.length > 0;
}

export const validatePassword = (password) => {
  return password.length > 7;
}

export const validateConfirmPassword = (password, confirmPassword) => {
  return confirmPassword === password;
}