import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, registerRequest } from "../api/auth"

export const AuthContext = createContext()

export const useAuth= ()=>{

    const context = useContext(AuthContext)

    if(!context){
        throw new Error("use Auth must be used within an AuthProvider")
    }
    return context;
}

export const AuthProvdier = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated]= useState(false);
    const [errors, setErrors ] = useState([]) 

    const signup = async (user) => {
       try {

        const res = await registerRequest(user)
        setUser(res.data)
        setIsAuthenticated(true)
        
       } catch (error) {

        setErrors(error.response.data)
       }
    }

    const signin = async (user) => {   
        try {
            const res = await loginRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error)
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    useEffect( ()=>{
        if (errors.length >0) {
            setTimeout(()=>{setErrors([])
            },5000)
        }
    },[errors])

    return (
        <AuthContext.Provider value={{signup,signin,user,isAuthenticated,errors}}>
            {children}
        </AuthContext.Provider>
    )
}