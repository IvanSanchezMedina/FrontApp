import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signin, user, isAuthenticated, errors: loginErrors } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate("/profile")
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {

    signin(values)

  })

  return (

    <div className="flex h-[calc(100vh-100px)] items-center justify-center">

      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {
          loginErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white text-center" key={i}>{error}</div>
          ))
        }
        <form onSubmit={onSubmit}>

          <input type="text"
            {...register("email", { "required": true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
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

          <button type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Login</button>
        </form>

        <p className="flex gap-x-2 justify-between">
          Don´t have an account? <Link to="/register" className="text-sky-500">Sign up</Link>
        </p>
      </div>

    </div>
  )
}

export default LoginPage