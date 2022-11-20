import { useContext } from "react";
import CommonContext from "./../../../context/CommonContext";
import { useNavigate } from "react-router-dom";
import AppConfig from "../../../AppConfig";
import { Link } from "react-router-dom";

function SideBar(){
    const {clearAuthData,userData}=useContext(CommonContext);
    let navigate=useNavigate();
    function logout(){
        clearAuthData();
        navigate('/login');
    }
    return (
        <aside className="main-sidebar sidebar-dark-primary">
            <a href="index3.html" className="brand-link">
                <img src={AppConfig.APP_LOGO} className="brand-image img-circle elevation-3"/>
                    <span className="brand-text font-weight-light">{AppConfig.APP_NAME}</span>
            </a>

            <div className="sidebar" style={{marginTop:'10px'}}>
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src={AppConfig.NO_IMAGE} className="img-circle elevation-2" alt="User Image"/>
                    </div>
                    <div className="info">
                        <a href="profile" className="d-block">{userData.name}</a>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item"><Link to="/dashboard" className="nav-link"><i className="fa fa-tachometer-alt nav-icon"></i><p> Dashboard</p></Link></li>
                        <li className="nav-item"><Link to="/note/index" className="nav-link"><i className="fa fa-users nav-icon"></i><p> Notes</p></Link></li>
                        <li className="nav-item"><a onClick={logout} className="nav-link"><i className="fa fa-sign-out-alt nav-icon"></i><p> Logout</p></a></li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}
export default SideBar