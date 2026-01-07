import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const url = "https://ec-course-api.hexschool.io/v2";
const apiPath = "scrooge";

function Products() {
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState(null);
  const navigate = useNavigate();

  async function getProducts() {
    try {
      const res = await axios.get(`${url}/api/${apiPath}/admin/products/all`);
      setProducts(Object.values(res.data.products));
    } catch (err) {
      console.log(err);
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


  async function Logout() {
    console.log("Logout");
    try {
      document.cookie = "scrooge=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      axios.defaults.headers.common['Authorization'] = "";
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return (

    <div className="container p-5">
      <div className="d-flex justify-content-between">
        <h2>產品列表</h2>
        <button className='btn btn-outline-danger' type='button' id="checkLogin" onClick={() => Logout()} >登出</button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>產品名稱</th>
            <th>原價</th>
            <th>售價</th>
            <th>是否啟用</th>
            <th>查看細節</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.origin_price}</td>
              <td>{item.price}</td>
              <td>{item.is_enabled ? "啟用" : "未啟用"}</td>
              <td>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setTempProduct(item)}
                >
                  查看細節
                </button>
              </td>
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
            {tempProduct.imagesUrl?.map((url, index) => (
              <img
                key={index}
                src={url}
                className="images"
                style={{ width: "100px", height: "100px" }}
                alt="副圖"
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-secondary">請選擇一個商品查看</p>
      )}
    </div>
  );
}

export default Products;
