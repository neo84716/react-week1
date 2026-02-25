import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { RotatingLines } from 'react-loader-spinner'
import useMessage from "../hooks/useMessage";

const url = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function Cart() {
  const [carts, setCarts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadingDeleteId, setLoadingDeleteId] = useState(null);
  const {showError , showSuccess} = useMessage();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // 取得購物車
  async function getCart() {
    try {
      const res = await axios.get(`${url}/api/${apiPath}/cart`);
      setCarts(res.data.data.carts);
      setTotal(res.data.data.final_total);
    } catch (err) {
      console.error("取得購物車失敗", err);
      showError(err.response.data.message)
    }
  }

  // 刪除購物車項目
  async function deleteCartItem(cartId) {
    setLoadingDeleteId(cartId)
    try {
      await axios.delete(`${url}/api/${apiPath}/cart/${cartId}`);
      showSuccess('已刪除商品')
      getCart();
    } catch (err) {
      console.error("刪除失敗", err);
      showError(err.response.data.message)
    } finally {
      setLoadingDeleteId(null)
    }
  }

  // 送出訂單
  async function onSubmit(data) {
    if (carts.length === 0) {
      alert("購物車是空的，無法送出訂單！");
      return;
    }

    try {
      const res = await axios.post(`${url}/api/${apiPath}/order`, {
        data: {
          user: {
            name: data.name,
            email: data.email,
            tel: data.tel,
            address: data.address,
          },
          message: data.message,
        }
      });
      showSuccess('訂單已送出！')
      console.log("訂單成功", res.data);
      reset(); // 清空表單
      getCart(); // 重新載入購物車（通常會變空）
    } catch (err) {
      console.error("訂單送出失敗", err.response?.data || err);
      showError(err.response.data.message)
    }
  }


  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="container p-5">
      <h2 className="mb-4">購物車</h2>
      {carts.length === 0 ? (
        <p className="text-muted">購物車目前是空的</p>
      ) : (
        <>
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th scope="col">商品</th>
                <th scope="col">圖片</th>
                <th scope="col">單價</th>
                <th scope="col">數量</th>
                <th scope="col">小計</th>
                <th scope="col">操作</th>
              </tr>
            </thead>
            <tbody>
              {carts.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.product.title}</strong>
                    <div className="text-muted small">{item.product.category}</div>
                  </td>
                  <td>
                    {item.product.imageUrl && (
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.title}
                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                        className="rounded"
                      />
                    )}
                  </td>
                  <td>{item.product.price}</td>
                  <td>{item.qty}</td>
                  <td className="fw-bold text-danger">{item.final_total}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm d-flex justify-content-center align-items-center"
                      onClick={() => deleteCartItem(item.id)} disabled={loadingDeleteId === item.id}
                    >
                      {loadingDeleteId === item.id ? <RotatingLines
                        visible={true}
                        height="24"
                        width="24"
                        color="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                      /> : "刪除"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>
              總金額：<span className="text-danger">{total}</span>
            </h4>
          </div>
        </>
      )}

      {/* 表單資料 */}
      <div className="my-5 row justify-content-center">
        <form onSubmit={handleSubmit(onSubmit)} className="col-md-6">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">收件人姓名</label>
            <input
              id="name"
              type="text"
              className="form-control"
              placeholder="請輸入姓名"
              {...register("name", { required: "請輸入收件人姓名。" })}
            />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="請輸入 Email"
              {...register("email", {
                required: "請輸入 Email。",
                pattern: { value: /^\S+@\S+$/i, message: "Email 格式不正確。" },
              })}
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="tel" className="form-label">收件人電話</label>
            <input
              id="tel"
              type="tel"
              className="form-control"
              placeholder="請輸入電話"
              {...register("tel", {
                required: "請輸入收件人電話。",
                minLength: { value: 8, message: "電話號碼至少需要 8 碼。" },
                pattern: { value: /^\d+$/, message: "電話號碼格式不正確，僅限數字。" },
              })}
            />
            {errors.tel && <p className="text-danger">{errors.tel.message}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">收件人地址</label>
            <input
              id="address"
              type="text"
              className="form-control"
              placeholder="請輸入地址"
              {...register("address", { required: "請輸入收件人地址。" })}
            />
            {errors.address && <p className="text-danger">{errors.address.message}</p>}
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">留言</label>
            <textarea
              id="message"
              className="form-control"
              placeholder="留言"
              rows="3"
              {...register("message")}
            />
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-danger">送出訂單</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cart;
