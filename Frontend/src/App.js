import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PermisRoutes from "./Routes/PermisRoutes";
const App = () => {
    return (
        <React.Fragment>
            <PermisRoutes></PermisRoutes>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </React.Fragment>
    );
};

export default App;
