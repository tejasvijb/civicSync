import { useAuth } from "../../store/useAuth";

// Mock authentication function
export const isAuthenticated = () => {
    const user = useAuth.getState().user;
    return !!user;
};
