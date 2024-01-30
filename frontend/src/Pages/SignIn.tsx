import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../Apis/api-client";
import { useAppContext } from "../Contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
    email: string;
    password: string;
};

const SignIn = () => {
    const { showToast } = useAppContext();
    const queryClient = useQueryClient();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<SignInFormData>();
    const navigate = useNavigate();
    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast({
                message: "Sign in successful",
                type: "SUCCESS",
            });
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },

        onError: (error: Error) => {
            showToast({
                message: error.message,
                type: "ERROR",
            });
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });
    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-3xl font-bold">Sign In</h2>
            <form
                onSubmit={onSubmit}
                className="flex flex-col gap-5 text-start text-sm font-bold"
            >
                <label className="flex flex-col gap-2 flex-1 text-gray-700">
                    Email
                    <input
                        type="email"
                        className="border rounded w-full py-1 px-2"
                        {...register("email", {
                            required: "This field is required",
                        })}
                    />
                    {errors.email && (
                        <span className="text-red-500">
                            {errors.email.message}
                        </span>
                    )}
                </label>
                <label className="flex flex-col gap-2 flex-1 text-gray-700">
                    Password
                    <input
                        type="password"
                        className="border rounded w-full py-1 px-2"
                        {...register("password", {
                            required: "This field is required",
                            minLength: {
                                value: 6,
                                message:
                                    "Password must be at least 6 characters",
                            },
                        })}
                    />
                    {errors.password && (
                        <span className="text-red-500">
                            {errors.password.message}
                        </span>
                    )}
                </label>
                <span className="flex justify-between items-center">
                    <span className="text-sm">
                        Not registered?{" "}
                        <Link
                            className="hover:font-bold hover:text-blue-200"
                            to="/register"
                        >
                            Create an account
                        </Link>
                    </span>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-bold text-xl rounded-md p-2 hover:bg-blue-500"
                    >
                        Sign In
                    </button>
                </span>
            </form>
        </div>
    );
};

export default SignIn;
