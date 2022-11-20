import { useContext, useState } from "react";
import CommonContext from "./../../context/CommonContext";

import { Link } from "react-router-dom"
import AppConfig from "../../AppConfig"
import General from '../../helpers/General'
import { Ajax } from "../../helpers/Ajax";
import { useNavigate } from "react-router-dom";
import AlertMessageWidget from "../../components/alert/AlertMessageWidget";

function Login() {
    const { setAuthData, setLoading } = useContext(CommonContext);
    let navigate = useNavigate();
    const [flashMessage, setFlashMessage] = useState({ type: '', message: '' });
    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        Ajax.post('site/login', General.serializeForm(e.target), function (response) {
            setLoading(false);
            if (response.status) {
                setAuthData(response.auth_token, response.data);
                navigate("/dashboard", { replace: true });
                setFlashMessage({ type: 'success', message: response.message });
            } else {
                setFlashMessage({ type: 'danger', message: response.message });
            }
        });
    }

    return (
        <div>
            <div className="login-logo">
                <Link to="/"><b>{AppConfig.APP_NAME}</b></Link>
            </div>
            <div className="card">
                <div className="card-body login-card-body">
                    <p className="login-box-msg">Sign in to start your session</p>
                    <AlertMessageWidget type={flashMessage.type} message={flashMessage.message} reset={() => setFlashMessage({ type: '', message: '' })}></AlertMessageWidget>
                    <form onSubmit={handleSubmit} method="post">
                        <div className="input-group mb-3">
                            <input name="email" type="email" className="form-control" placeholder="Email" required />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" name="password" className="form-control" placeholder="Password" required />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <div className="icheck-primary">
                                    <input type="checkbox" id="remember" name="remember" />
                                    <label htmlFor="remember">
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                            <div className="col-4">
                                <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                            </div>
                        </div>
                    </form>

                    <p className="mb-1">
                        <Link to="/forgot-password">I forgot my password</Link>
                    </p>
                    <p className="mb-0">
                        <Link to="/register" className="text-center">Register a new membership</Link>
                    </p>
                </div>

            </div>
        </div>
    )
}
export default Login