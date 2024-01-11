import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Homes from "../Home/Homes";
import Rooms from "../BookRoom/Rooms";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Topbar from "../Home/topbar/topbar";
import NotFound from "../NotFound/NotFound";
import Feedback from "../Feedback/Feedback";
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
