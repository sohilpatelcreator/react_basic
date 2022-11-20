import React from "react";
import { Outlet } from "react-router-dom";

function BlankLayout({children}){
    return (
        <div className="hold-transition login-page">
            <div className="login-box">
            <Outlet />
            </div>
        </div>
    )
}

export default BlankLayout