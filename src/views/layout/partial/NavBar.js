import { Link } from "react-router-dom";

function NavBar(){
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" data-widget="pushmenu" to="/"><i className="fas fa-bars"></i></Link>
                </li>
            
            </ul>
            
            <ul className="navbar-nav ml-auto">
                <li className="nav-item d-none d-sm-inline-block">
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                </li>
                
            </ul>
        </nav>
    )
}
export default NavBar