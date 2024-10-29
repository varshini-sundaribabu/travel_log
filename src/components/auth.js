// Store token and set an expiration timestamp in localStorage
export const setToken = (token) => {
    const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour
    localStorage.setItem('token', token);
    localStorage.setItem('token_expiration', expirationTime);
  };
  
  // Retrieve token if it hasn't expired
  export const getToken = () => {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('token_expiration');
  
    if (token && expiration && new Date().getTime() < expiration) {
      return token;
    }
    clearToken(); // Clear expired token
    return null;
  };
  
  // Clear token and expiration time
  export const clearToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiration');
  };
  
  // Check if token is expired
  export const isTokenExpired = () => {
    const expiration = localStorage.getItem('token_expiration');
    return expiration && new Date().getTime() >= expiration;
  };
  