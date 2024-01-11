import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homes from "../Home/Homes";
import Rooms from "../BookRoom/Rooms";
import UserProfile from "../User/UserProfile";
import Topbar from "../Home/topbar/topbar";
import NotFound from "../NotFound/NotFound";
import Feedback from "../Feedback/Feedback";
const UserRoutes = (props) => {
    return (
        <Router>
            <Topbar account={props.account}></Topbar>
            <Routes>
                <Route path="/" element={<Homes />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default UserRoutes;
