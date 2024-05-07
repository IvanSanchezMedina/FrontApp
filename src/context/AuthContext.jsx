import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, registerRequest, verifyTokenRequest, logoutRequest } from "../api/auth"
import Cookies from "js-cookie";
export const AuthContext = createContext()

export const useAuth = () => {

    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("use Auth must be used within an AuthProvider")
    }
    return context;
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
   
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const updateUserAndToken = (newUser) => {
        setUser(newUser);
      };

    const signup = async (user) => {
        try {

            const res = await registerRequest(user)
          if (res.status === 200) {
            setUser(res.data)
            setIsAuthenticated(true)
          }
           
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
          
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const logout = async (user) => { 
        try {
            const cookies = Cookies.get()
            const res = await logoutRequest(cookies.token)

            if (res.status === 200) {
           
                Cookies.remove('token')
                Cookies.remove('cookie_usuario')
                setIsAuthenticated(false)
                setUser(null)
            }
           
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
       
    }
    useEffect(() => {
        if (errors.length > 0) {
            setTimeout(() => {
                setErrors([])
            }, 5000)
        }
    }, [errors])

    useEffect(() => {

        async function checkLogin() {
            const cookies = Cookies.get()
            if (!cookies.token) {
                setIsAuthenticated(false)
                setLoading(false)
                return setUser(null)
            }

            try {

                const res = await verifyTokenRequest(cookies.token)

                if (!res.data) {

                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }
                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) { 
            
            setIsAuthenticated(false)
            setUser(null)
            setLoading(false)
        }

    }

      checkLogin();
}, [] )


return (
    <AuthContext.Provider value={{ signup, signin,logout, loading, user, isAuthenticated, errors, updateUserAndToken }}>
        {children}
    </AuthContext.Provider>
)
}