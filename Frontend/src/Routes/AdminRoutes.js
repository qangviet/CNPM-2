import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "../Admin/Admin";
import NotFound from "../NotFound/NotFound";
const AdminRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AdminRoutes;
