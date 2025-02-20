const validateSignupForm = {
  validteName: (name) => {
    if (!name) return "Name is required";
    if (name.length < 3) return "Name must be at least 3 characters long";
    return true;
  },

  validteEmail: (email) => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format";
    return true;
  },

  validtePass: (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters long";
    return true;
  }
};

export default validateSignupForm;
    