import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const url = import.meta.env.VITE_API_URL;

function Home() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [status, setStatus] = useState("");

  async function onSubmit(data) {
    try {
      const res = await axios.post(`${url}/admin/signin`, {
        username: data.username,
        password: data.password,
      });
      const { expired, token } = res.data;
      document.cookie = `scrooge=${token}; expires=${new Date(expired)}; path=/;`;
      axios.defaults.headers.common["Authorization"] = token;
      setStatus("登入成功 ✅");
      navigate("/Products");
    } catch (err) {
      setStatus("登入失敗 ❌");
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="text-center p-5 border border-1 rounded-5 border-dark bg-light" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="mb-4">登入頁面</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column gap-3">
          <div>
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              {...register("username", {
                required: "請輸入 Email。",
                pattern: { value: /^\S+@\S+$/i, message: "Email 格式不正確。" },
              })}
            />
            {errors.username && <p className="text-danger mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              {...register("password", { required: "請輸入密碼。" })}
            />
            {errors.password && <p className="text-danger mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" className="btn btn-outline-primary">登入</button>
          <p className="mt-2">{status}</p>
        </form>
      </div>
    </div>
  );
}

export default Home;
