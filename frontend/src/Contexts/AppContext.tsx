import React, { useContext, useState } from "react";
import Toast from "../Components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../Apis/api-client";

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
};

type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
};

const AppContext = React.createContext<AppContext | undefined>(undefined);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: false,
    });
    return (
        <AppContext.Provider
            value={{
                showToast: (toastMessage) => {
                    setToast(toastMessage);
                },
                isLoggedIn: !isError,
            }}
        >
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => {
                        setToast(undefined);
                    }}
                ></Toast>
            )}
            {children}
        </AppContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
};

export default AppContextProvider;
