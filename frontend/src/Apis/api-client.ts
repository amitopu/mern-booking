import { RegisterFormData } from "../Pages/Register";

export const register = async (formData: RegisterFormData) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(`${API_BASE_URL}/api/user/register`, {
        method: "POST",
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
