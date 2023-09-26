import Homepage from "src/pages/homepage/homepage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "src/pages/notFound/notFound";
import NavbarLayout from "../layout/navbarLayout";
import About from "src/pages/about/about";
import SignIn from "src/pages/signIn/signIn";
import Contact from "src/pages/contact/contact";

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
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
