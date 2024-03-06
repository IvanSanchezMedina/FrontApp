import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signup, user, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate("/profile")
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        values.source = "web";
        values.type = "user";
        signup(values)

    })

    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
            {
                registerErrors.map((error, i) => (
                    <div  className="bg-red-500 p-2 text-white" key={i}>{error}</div>
                ))
            }
            <form onSubmit={onSubmit}>
                <input type="text"
                    {...register("first_name", { "required": true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="First Name"
                />
                {errors.first_name && (
                    <p className="text-red-500 font-bold mt-1">{errors.first_name.message}</p>
                )}


                <input type="text"
                    {...register("last_name", { "required": true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Last Name"
                />
                {errors.last_name && (
                    <p className="text-red-500 font-bold mt-1">{errors.last_name.message}</p>
                )}


                <input type="text"
                    {...register("username", { "required": true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Username"
                />
                {errors.username && (
                    <p className="text-red-500 font-bold mt-1">{errors.username.message}</p>
                )}


                <input type="text"
                    {...register("email", { "required": true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Email Address"
                />
                {errors.email && (
                    <p className="text-red-500 font-bold mt-1">{errors.email.message}</p>
                )}


                <input type="password"
                    {...register("password", { "required": true })}
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder="Password"
                />
                {errors.password && (
                    <p className="text-red-500 font-bold mt-1">{errors.password.message}</p>
                )}

                <button type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Purple</button>
            </form>
        </div>
    )
}

export default RegisterPage