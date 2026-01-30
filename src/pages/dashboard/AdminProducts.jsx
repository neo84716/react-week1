import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ProductModal from "../../components/ProductModal";
import Pagination from "../../components/Pagination";

const url = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function Products() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({});

  async function getProducts(page = 1) {
    try {
      const res = await axios.get(`${url}/api/${apiPath}/admin/products?page=${page}`);
      setProducts(res.data.products);
      setPagination(res.data.pagination);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteProducts(id) {
    const result = window.confirm("確定要刪除這個項目嗎？");
    if (result) {
      try {
        const res = await axios.delete(`${url}/api/${apiPath}/admin/product/${id}`);
        alert("刪除成功");
        getProducts()
      } catch (err) {
        console.log(err);
      }
    }

  }

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)scrooge\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (!token) {
      navigate("/");
      return;
    }
    axios.defaults.headers.common["Authorization"] = token;
    getProducts();
  }, []);

  return (
    <>
      <div className="container p-5">
        <div className="d-flex justify-content-between">
          <h2>產品管理</h2>
          <button type="button" className="btn btn-outline-primary" onClick={() => { setMode("add"); setSelectedProduct(null); setShowModal(true); }}>
            新增產品
          </button>
          <ProductModal show={showModal} onClose={() => setShowModal(false)} mode={mode} product={selectedProduct} getProducts={getProducts} />
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>產品名稱</th>
              <th>原價</th>
              <th>售價</th>
              <th>是否啟用</th>
              <th>查看細節</th>
              <th>編輯</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.origin_price}</td>
                <td>{item.price}</td>
                <td className={item.is_enabled ? "text-success" : "text-danger"}>{item.is_enabled ? "啟用" : "未啟用"}</td>
                <td>
                  <Link
                    to={`/products/${item.id}`}
                    state={{ product: item }}
                    className="btn btn-outline-primary text-decoration-none"
                  >
                    查看細節
                  </Link>

                </td>
                <td>
                  <button className="btn btn-outline-info me-2" onClick={() => { setMode("edit"); setSelectedProduct(item); setShowModal(true); }}>修改</button>
                  <button className="btn btn-outline-danger" onClick={() => deleteProducts(item.id)}>刪除</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination pagination={pagination} onChangePage={getProducts} />
      </div >
    </>
  );
}

export default Products;
