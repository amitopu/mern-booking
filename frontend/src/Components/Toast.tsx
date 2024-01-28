import { useEffect } from "react";

type ToastProps = {
    message: string;
    type: "SUCCESS" | "ERROR";
    onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

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
