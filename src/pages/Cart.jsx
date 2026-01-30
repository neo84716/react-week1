import { useState, useEffect } from "react";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function Cart() {
  const [carts, setCarts] = useState([]);
  const [total, setTotal] = useState(0);

  async function getCarts() {
    try {
      const res = await axios.get(`${url}/api/${apiPath}/cart`);
      setCarts(res.data.data.carts);
      setTotal(res.data.data.final_total);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteCartItem(id) {
    const result = window.confirm("確定要刪除這個商品嗎？");
    if (!result) return;

    try {
      await axios.delete(`${url}/api/${apiPath}/cart/${id}`);
      alert("刪除成功");
      getCarts(); // 重新取得購物車
    } catch (err) {
      console.error("刪除失敗", err);
    }
  }

  useEffect(() => {
    getCarts();
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
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteCartItem(item.id)}
                    >
                      刪除
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
    </div>
  );
}

export default Cart;
