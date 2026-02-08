import { Outlet, Link } from "react-router-dom";
import Nav from "./layouts/Nav";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      {/* 共用的導覽列 */}
      <Nav />

      {/* 子路由渲染區 */}
      <Outlet />
    </div>
  );
}

export default App;
