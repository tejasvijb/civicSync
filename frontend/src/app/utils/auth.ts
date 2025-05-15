// Mock authentication function
export const isAuthenticated = () => {
    // Replace with your actual authentication logic
    return !!sessionStorage.getItem("authToken");
};
