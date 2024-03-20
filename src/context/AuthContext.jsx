import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth"
import Cookies from "js-cookie";
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
   
        setIsAuthenticated(true)
        setUser(res.data)
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
        //    console.log(error)
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

    useEffect(()=>{
 
       async function checkLogin() {
            const cookies = Cookies.get()
            // console.log('cookies',cookies)
            if (cookies.token) {
                // console.log('token',cookies.token)
                try {
                    // console.log('token desde checklogin',cookies.token)
                    // console.log('cookie_usuario desde checklogin',cookies.cookie_usuario)
                    const res = await verifyTokenRequest(cookies.token) 
                    console.log('res',res)
                    if(!res.data) setIsAuthenticated(false)
    
                    isAuthenticated(true)
                    setUser(res.data)
                } catch (error) {
                    setIsAuthenticated(false)
                    setUser(null)
                }
            }
        }

      checkLogin();
    } ,[] )


    return (
        <AuthContext.Provider value={{signup,signin,user,isAuthenticated,errors}}>
            {children}
        </AuthContext.Provider>
    )
}