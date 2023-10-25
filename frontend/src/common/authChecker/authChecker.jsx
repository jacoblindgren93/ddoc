import { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "src/providers/AuthContext";
import Cookies from "universal-cookie";

export default function AuthChecker() {
    const cookie = new Cookies();
    if (!cookie.get("token")) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
}
