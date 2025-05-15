import axios, { AxiosInstance, Cancel } from "axios";
import {
    ApiRequestConfig,
    WithAbortFn,
    ApiExecutor,
    ApiExecutorArgs,
    ApiError,
} from "./api.types.ts"; // Default config for the axios instance
import { useAuth } from "../store/useAuth";
import Swal from "sweetalert2";

// Set different base URL based on the environment

const axiosParams = { baseURL: import.meta.env.VITE_BASE_URL };

// Create axios instance with default params
const axiosInstance = axios.create(axiosParams);

// Add request interceptor to attach auth token
axiosInstance.interceptors.request.use((config) => {
    const user = useAuth.getState().user;
    if (user?.authToken) {
        config.headers.Authorization = `Bearer ${user.authToken}`;
    }
    return config;
});

// Add response interceptor to handle 401 unauthorized responses
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Log out the user
            const logout = useAuth.getState().logout;
            logout();

            // Show error message
            Swal.fire({
                title: "Session Expired",
                text: "Your session has expired. Please log in again.",
                icon: "warning",
                confirmButtonText: "Ok",
            }).then(() => {
                // Redirect to login page
                window.location.href = "/auth/login";
            });
        }
        return Promise.reject(error);
    }
);

export const didAbort = (
    error: unknown
): error is Cancel & { aborted: boolean } => axios.isCancel(error);

const getCancelSource = () => axios.CancelToken.source();

export const isApiError = (error: unknown): error is ApiError => {
    return axios.isAxiosError(error);
};

const withAbort = <T>(fn: WithAbortFn) => {
    const executor: ApiExecutor<T> = async (...args: ApiExecutorArgs) => {
        const originalConfig = args[args.length - 1] as ApiRequestConfig;

        // Extract abort property from the config
        const { abort, ...config } = originalConfig;

        // Create cancel token and abort method only if abort
        // function was passed

        if (typeof abort === "function") {
            const { cancel, token } = getCancelSource();
            config.cancelToken = token;
            abort(cancel);
        }

        try {
            if (args.length > 2) {
                const [url, body] = args;
                return await fn<T>(url, body, config);
            } else {
                const [url] = args;
                return await fn<T>(url, config);
            }
        } catch (error) {
            console.log("api error", error);
            // Add "aborted" property to the error if the request was cancelled
            if (didAbort(error)) {
                error.aborted = true;
            }

            throw error;
        }
    };

    return executor;
};

//Main apifunction
const api = (axios: AxiosInstance) => {
    return {
        get: <T>(url: string, config: ApiRequestConfig = {}) =>
            withAbort<T>(axios.get)(url, config),
        delete: <T>(url: string, config: ApiRequestConfig = {}) =>
            withAbort<T>(axios.delete)(url, config),
        post: <T>(url: string, body: unknown, config: ApiRequestConfig = {}) =>
            withAbort<T>(axios.post)(url, body, config),
        patch: <T>(url: string, body: unknown, config: ApiRequestConfig = {}) =>
            withAbort<T>(axios.patch)(url, body, config),
        put: <T>(url: string, body: unknown, config: ApiRequestConfig = {}) =>
            withAbort<T>(axios.put)(url, body, config),
    };
};

export default api(axiosInstance);
