export const setTokenInStorage = (token) => {
    // Store the token in persistent storage (e.g., cookies or local storage)
    localStorage.setItem('token', token);
  };
  
  export const getTokenFromStorage = () => {
    // Retrieve the token from persistent storage (e.g., cookies or local storage)
    return localStorage.getItem('token');
  };