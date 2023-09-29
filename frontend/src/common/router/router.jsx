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

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NavbarLayout />}>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/createAccount" element={<CreateAccount />} />
                </Route>
                <Route path="/profile" element={<Profile />} />
                <Route path="/verify/:guid" element={<Verify />} />
            </Routes>
        </BrowserRouter>
    );
}
