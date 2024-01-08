import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Homes from "../pages/Homes";
import Rooms from "../pages/Rooms";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Topbar from "../topbar/topbar";
import NotFound from "../NotFound/NotFound";
import Feedback from "../pages/Feedback/Feedback";
const GuestRoutes = () => {
    return (
        <Router>
            <Topbar account={{}}></Topbar>
            <Routes>
                <Route path="/" element={<Homes />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />{" "}
                <Route path="/feedback" element={<Feedback />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default GuestRoutes;
