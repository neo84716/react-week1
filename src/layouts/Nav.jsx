import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Nav() {
  const navigate = useNavigate();

  async function Logout() {
    try {
      // 清除 cookie
      document.cookie = "scrooge=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // 移除 axios header
      axios.defaults.headers.common["Authorization"] = "";
      // 導回登入頁
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  }

  const isLoggedIn = document.cookie.includes("scrooge=");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="navbar-brand">React 作業練習</div>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* 前台區塊：永遠顯示 */}
            <li className="nav-item">
              <span className="nav-link disabled fw-bold text-primary">前台</span>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">產品列表</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">購物車</Link>
            </li>

            <li><hr className="dropdown-divider" /></li>

            {/* 後台區塊：只有登入後才顯示 */}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <span className="nav-link disabled fw-bold text-danger">後台</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard/products">產品管理</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard/orders">訂單管理</Link>
                </li>
              </>
            )}
          </ul>

          <form className="d-flex">
            {isLoggedIn ? (
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={Logout}
              >
                登出
              </button>
            ) : (
              <Link className="btn btn-outline-primary" to="/home">
                後台登入
              </Link>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
