import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../Apis/api-client";
import { useAppContext } from "../Contexts/AppContext";

const SignOutButton = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const mutation = useMutation(apiClient.logOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            showToast({ message: "Signed Out Successfully", type: "SUCCESS" });
        },

        onError: () => {
            showToast({ message: "Signing Out failed", type: "ERROR" });
        },
    });
    const handleClick = () => {
        mutation.mutate();
    };
    return (
        <div className="flex bg-white text-blue-600 hover:bg-gray-100  font-bold items-center">
            <button onClick={handleClick} className="px-3">
                Sign Out
            </button>
        </div>
    );
};

export default SignOutButton;
