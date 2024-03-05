import { useForm } from "react-hook-form"
import { registerRequest } from "../api/auth"

function RegisterPage() {
    const { register, handleSubmit, errors } = useForm()

    const onSubmit = handleSubmit(async (values) => {
        values.source = "web";
        values.type = "user";
      console.log(values)
      const res = await  registerRequest(values)
      console.log(res)
  })
    return (
        <div className="bg-zinc-800 max-w-md p-10 rounded-md">
            <form onSubmit={onSubmit}>
                 <input type="text" 
                {...register("first_name",{"required":true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="First Name"
                />
                 <input type="text" 
                {...register("last_name",{"required":true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="Last Name"
                />
                <input type="text" 
                {...register("username",{"required":true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="Username"
                />
                <input type="text" 
                {...register("email",{"required":true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                placeholder="Email Address"
                />
                <input type="password" 
                {...register("password",{"required":true})}
                className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
               placeholder="Password"
               />
                <button type="submit" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Purple</button>
            </form>
        </div>
    )
}

export default RegisterPage