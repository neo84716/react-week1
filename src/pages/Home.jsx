import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_API_URL;

function Home() {
  const [data, setData] = useState({ username: "", password: "" });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  async function login() {
    try {
      const res = await axios.post(`${url}/admin/signin`, data);
      const { expired, token } = res.data;
      document.cookie = `scrooge=${token}; expires=${new Date(expired)}; path=/;`;
      axios.defaults.headers.common["Authorization"] = token;
      setStatus("登入成功 ✅");
      navigate("/Products"); // 登入成功後切換到產品分頁
    } catch (err) {
      setStatus("登入失敗 ❌");
    }
  }

  function eventHandle(e) {
    const { value, name } = e.target;
    setData({ ...data, [name]: value });
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="text-center p-5 border border-1 rounded-5 border-dark bg-light">
        <h2>登入頁面</h2>
        <div className="d-flex flex-column gap-3">
          <input className="border border-1 rounded-1 p-2 border-dark" type="email" name="username" placeholder="email" onChange={eventHandle} />
          <input className="border border-1 rounded-1 p-2 border-dark" type="password" name="password" placeholder="password" onChange={eventHandle} />
          <button className="btn btn-outline-primary" onClick={login}>登入</button>
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
