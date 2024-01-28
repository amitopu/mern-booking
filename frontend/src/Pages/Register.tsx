import { useForm } from "react-hook-form";
import * as apiClient from "../Apis/api-client";
import { useMutation } from "react-query";
import { useAppContext } from "../Contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const Register = () => {
    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>();

    const mutation = useMutation({
        mutationFn: apiClient.register,
        onSuccess: () => {
            showToast({ message: "Registration successful!", type: "SUCCESS" });
            navigate("/");
        },

        onError: async (error: Error) => {
            showToast({ message: await error.message, type: "ERROR" });
        },
    });

    const onSubmit = handleSubmit((data) => {
        // console.log(data);
        mutation.mutate(data);
    });

    return (
        <div className="flex flex-col py-6">
            <h2 className="text-3xl font-bold mb-5">Create an account</h2>
            <form
                className="flex flex-col gap-5 text-start text-sm font-bold"
                onSubmit={onSubmit}
            >
                <div className="flex flex-col md:flex-row gap-5">
                    <label className="flex flex-col flex-1 gap-2 text-gray-700">
                        First Name
                        <input
                            type="text"
                            className="border rounded w-full py-1 px-2"
                            {...register("firstName", {
                                required: "This field is required",
                            })}
                        />
                        {errors.firstName && (
                            <span className="text-red-500">
                                {errors.firstName.message}
                            </span>
                        )}
                    </label>
                    <label className="flex flex-col gap-2 flex-1 text-gray-700">
                        Last Name
                        <input
                            type="text"
                            className="border rounded w-full py-1 px-2"
                            {...register("lastName", {
                                required: "This field is required",
                            })}
                        />
                        {errors.lastName && (
                            <span className="text-red-500">
                                {errors.lastName.message}
                            </span>
                        )}
                    </label>
                </div>
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
                <label className="flex flex-col gap-2 flex-1 text-gray-700">
                    Confirm Password
                    <input
                        type="password"
                        className="border rounded w-full py-1 px-2"
                        {...register("confirmPassword", {
                            validate: (val) => {
                                if (!val) {
                                    return "This field is required";
                                } else if (watch("password") !== val) {
                                    return "Your passwords didn't match";
                                }
                            },
                        })}
                    />
                    {errors.confirmPassword && (
                        <span className="text-red-500">
                            {errors.confirmPassword.message}
                        </span>
                    )}
                </label>
                <span>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-bold text-xl rounded-md p-2 hover:bg-blue-500"
                    >
                        Create account
                    </button>
                </span>
            </form>
        </div>
    );
};

export default Register;
