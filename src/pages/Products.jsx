import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../layouts/Nav";
import ProductModal from "../components/ProductModal";

const url = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function Products() {
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  async function getProducts() {
    try {
      const res = await axios.get(`${url}/api/${apiPath}/admin/products/all`);
      setProducts(Object.values(res.data.products));
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
      <Nav />
      <div className="container p-5">
        <div className="d-flex justify-content-between">
          <h2>產品列表</h2>
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
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setTempProduct(item)}
                  >
                    查看細節
                  </button>
                </td>
                <td>
                  <button className="btn btn-outline-info me-2" onClick={() => { setMode("edit"); setSelectedProduct(item); setShowModal(true); }}>修改</button>
                  <button className="btn btn-outline-danger" onClick={() => deleteProducts(item.id)}>刪除</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>單一產品細節</h2>
        {tempProduct ? (
          <div className="card" style={{ width: "25rem" }}>
            <img src={tempProduct.imageUrl} className="card-img-top" alt={tempProduct.title} />
            <div className="card-body">
              <h5>{tempProduct.title}</h5>
              <p>商品描述：{tempProduct.description}</p>
              <p>商品內容：{tempProduct.content}</p>
              <p>
                售價：<del>{tempProduct.origin_price}</del> 元 / {tempProduct.price} 元
              </p>
            </div>
            <h5 className="mt-3">更多圖片：</h5>
            <div className="d-flex flex-wrap gap-2">
              {tempProduct.imagesUrl?.map((url, index) => url ? (
                <img
                  key={index}
                  src={url}
                  className="images"
                  style={{ width: "100px", height: "100px" }}
                  alt="副圖"
                />
              ) : null
              )}
            </div>
          </div>
        ) : (
          <p className="text-secondary">請選擇一個商品查看</p>
        )}
      </div >
    </>
  );
}

export default Products;
