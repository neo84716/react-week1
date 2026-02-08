import { useState, useEffect } from "react";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function AdminOrder() {
  const [orders, setOrders] = useState([]);

  async function getOrders() {
    try {
      const res = await axios.get(`${url}/api/${apiPath}/admin/orders`);
      setOrders(res.data.orders);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  // 時間轉換
  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString("zh-TW");
  }

  return (
    <div className="container-fluid p-5">
      <h2 className="mb-4">訂單管理</h2>

      {orders.length === 0 ? (
        <p className="text-muted">目前沒有訂單</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle w-100">
            <thead className="table-light">
              <tr>
                <th style={{ minWidth: "150px" }}>訂單編號</th>
                <th style={{ minWidth: "180px" }}>建立時間</th>
                <th style={{ minWidth: "120px" }}>客戶</th>
                <th style={{ minWidth: "200px" }} className="text-nowrap">Email</th>
                <th style={{ minWidth: "150px" }} className="text-nowrap">電話</th>
                <th style={{ minWidth: "250px" }}>地址</th>
                <th style={{ minWidth: "250px" }}>商品</th>
                <th style={{ minWidth: "120px" }}>總金額</th>
                <th style={{ minWidth: "100px" }}>付款狀態</th>
                <th style={{ minWidth: "150px" }}>留言</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{formatDate(order.create_at)}</td>
                  <td>{order.user.name}</td>
                  <td className="text-nowrap">{order.user.email}</td>
                  <td className="text-nowrap">{order.user.tel}</td>
                  <td>{order.user.address}</td>
                  <td>
                    <ul className="list-unstyled mb-0">
                      {Object.values(order.products).map((p) => (
                        <li key={p.id} className="mb-2">
                          <strong>{p.product.title}</strong> x {p.qty} = {p.final_total}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="fw-bold text-danger">{order.total}</td>
                  <td>
                    {order.is_paid ? (
                      <span className="badge bg-success">已付款</span>
                    ) : (
                      <span className="badge bg-secondary">未付款</span>
                    )}
                  </td>
                  <td>{order.message || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminOrder;
