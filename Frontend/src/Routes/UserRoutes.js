import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homes from "../pages/Homes";
import Rooms from "../pages/Rooms";
import UserProfile from "../pages/User/UserProfile";
import Facility from "../pages/Facilities";
import Topbar from "../topbar/topbar";
import NotFound from "../NotFound/NotFound";
const UserRoutes = (props) => {
    return (
        <Router>
            <Topbar account={props.account}></Topbar>
            <Routes>
                <Route path="/" element={<Homes />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/services" element={<Facility />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default UserRoutes;
