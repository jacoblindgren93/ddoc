import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false);
    const cookie = new Cookies();

    useEffect(() => {
        if (cookie.get("token")) {
            setIsAuth(true);
        }
    }, [isAuth]);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    );
}
