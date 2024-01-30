import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ToastProps = {
    message: string;
    type: "SUCCESS" | "ERROR";
    path: string;
    onClose: () => void;
};

const Toast = ({ message, type, path, onClose }: ToastProps) => {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
            if (path !== "") {
                navigate(path);
            }

            onClose();
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose, path, navigate]);

    const style =
        type === "SUCCESS"
            ? "fixed top-4 right-4 z-50 p-4 rounded-md max-w-md bg-green-400"
            : "fixed top-4 right-4 z-50 p-4 rounded-md max-w-md bg-red-400";
    return (
        <div className={style}>
            <div className="flex justify-center items-center">
                <span className="text-lg text-white font-semibold">
                    {message}
                </span>
            </div>
        </div>
    );
};

export default Toast;
