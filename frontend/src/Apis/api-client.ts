import { RegisterFormData } from "../Pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/user/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-type": "Application/json",
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }
};

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/verifytoken`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("You Are Not Authorized");
    }

    return response.json();
};
