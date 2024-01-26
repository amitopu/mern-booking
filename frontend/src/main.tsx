import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import AppContextProvider from "./Contexts/AppContext.tsx";

const client = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={client}>
                <AppContextProvider>
                    <App />
                </AppContextProvider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
);
