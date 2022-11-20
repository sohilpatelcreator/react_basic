import NavBar from "./partial/NavBar"
import SideBar from "./partial/SideBar"
import AlertMessage from './../../components/alert/AlertMessage'
import { Outlet } from "react-router-dom";

function MainLayout({children}) {
    console.log('MainLayout');
    return (
        <div className="hold-transition sidebar-mini layout-fixed layout-navbar-fixed">
            <div className="wrapper">
                <NavBar/>
                <SideBar/>
                <div className="content-wrapper">
                    <section className="content">
                        <div className="container-fluid">
                            <AlertMessage ></AlertMessage>
                            <Outlet />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default MainLayout