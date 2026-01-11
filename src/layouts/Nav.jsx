import { useNavigate } from "react-router-dom";
import axios from "axios";

function Nav() {
    const navigate = useNavigate();
    async function Logout() {
        // console.log("Logout");
        try {
            document.cookie = "scrooge=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            axios.defaults.headers.common['Authorization'] = "";
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand">React 作業練習</a>
                <form className="d-flex">
                    <button className='btn btn-outline-danger' type='button' id="checkLogin" onClick={() => Logout()} >登出</button>
                </form>
            </div>
        </nav>
    );
}

export default Nav;