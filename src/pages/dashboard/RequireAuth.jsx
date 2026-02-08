import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const token = document.cookie.split("; ").find(row => row.startsWith("scrooge="));
  if (!token) {
    return <Navigate to="/home" replace />; // 沒有登入就導回登入頁
  }
  return children;
}

export default RequireAuth;
