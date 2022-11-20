import { useContext } from "react";
import CommonContext from "../../context/CommonContext";
import { Link, Outlet } from "react-router-dom";

function FrontLayout({ children }) {
    const {isAuthenticated} =useContext(CommonContext);

    return (
        <div className="hold-transition layout-top-nav">
            <nav className="main-header navbar navbar-expand-md navbar-light navbar-white">
                <div className="container">
                    <a href="index3.html" className="navbar-brand">
                        <span className="brand-text font-weight-light">AdminLTE 3</span>
                    </a>
                    <button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse order-3" id="navbarCollapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/" className="nav-link">Home</Link>
                            </li>
                            {isAuthenticated ? 
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            </li>
                            :
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            }
                            
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="content">
                <div className="container">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default FrontLayout