import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "src/providers/AuthContext";

export default function AuthChecker() {
    const { isAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuth) {
            navigate("/");
        }
    }, [isAuth]);

    return <Outlet />;
}
