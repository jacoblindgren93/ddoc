import Homepage from "src/pages/public/homepage/homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "src/pages/public/notFound/notFound";
import NavbarLayout from "../layout/navbarLayout";
import About from "src/pages/public/about/about";
import SignIn from "src/pages/public/signIn/signIn";
import Contact from "src/pages/public/contact/contact";
import CreateAccount from "src/pages/public/createAccount/createAccount";
import Profile from "src/pages/loggedIn/profile/profile";
import Verify from "src/pages/public/verify/verify";
import AuthChecker from "../authChecker/authChecker";
import ResetPassword from "src/pages/public/resetPassword/resetPassword";

export default function RoutesLoggedIn() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}
