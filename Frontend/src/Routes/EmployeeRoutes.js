import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Employee from "../Employee/Employee";
import NotFound from "../NotFound/NotFound";

const EmployeeRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/employee" element={<Employee />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default EmployeeRoutes;
