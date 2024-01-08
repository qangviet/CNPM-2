import { useEffect, useState } from "react";
import AdminRoutes from "./AdminRoutes";
import GuestRoutes from "./GuestRoutes";
import EmployeeRoutes from "./EmployeeRoutes";
import UserRoutes from "./UserRoutes.js";
const PermisRoutes = () => {
    const [account, setAccount] = useState(null);
    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (session) {
            setAccount(JSON.parse(session));
        }
    }, []);

    if (!account) return <GuestRoutes></GuestRoutes>;
    else if (account.role === 1) return <UserRoutes account={account}></UserRoutes>;
    else if (account.role === 2) return <EmployeeRoutes></EmployeeRoutes>;
    else if (account.role === 3) return <AdminRoutes></AdminRoutes>;
};

export default PermisRoutes;
