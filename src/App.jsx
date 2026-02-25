import { Outlet } from "react-router-dom";
import Nav from "./layouts/Nav";
import MessageToast from "./components/MessageToast";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      {/* 共用的導覽列 */}
      <Nav />

      {/* 全域訊息提示 */}
      <MessageToast />

      {/* 子路由渲染區 */}
      <Outlet />
    </div>
  );
}

export default App;
