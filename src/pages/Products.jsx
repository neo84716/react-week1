import { useState, useEffect } from "react";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function Products() {
  const [products, setProducts] = useState([]);


  async function getProducts() {
    try {
      const res = await axios.get(`${url}/api/${apiPath}/products/all`);
      setProducts(res.data.products);
    } catch (err) {
      console.log(err);
    }
  }
  async function addCartItem(product_id, addQty) {

    axios.get(`${url}/api/${apiPath}/cart`)
      .then(function (response) {
        let carts = response.data.data.carts;
        console.log(carts);
        let existingItem = carts.find(item => item.product.id === product_id);
        let qty = addQty;
        if (existingItem) {
          quantity += existingItem.quantity; // 如果已存在，加上現有數量
        }


        return axios.post(`${url}/api/${apiPath}/cart`, {
          data: {
            product_id,
            qty
          }
        });
      })
      .then(function (response) {
        alert('商品已加入購物車')
        console.log('加入購物車成功', response.data);
      })
      .catch(function (error) {
        console.error('加入購物車失敗', error);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container p-5">
      <h2 className="mb-4">產品列表</h2>
      <div className="row">
        {products.map((item) => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card h-100 shadow-sm">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  className="card-img-top"
                  alt={item.title}
                  style={{ objectFit: "cover", height: "200px" }}
                />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text text-muted">
                  分類：{item.category}
                </p>
                <p className="card-text">
                  {item.content}
                </p>
                <p className="card-text small text-secondary">
                  {item.description}
                </p>
                <p className="card-text text-muted">
                  原價：<del>{item.origin_price}</del>
                </p>
                <p className="card-text fw-bold text-danger">
                  售價：{item.price}
                </p>
                <button type="button" className="btn btn-outline-primary" onClick={() => addCartItem(item.id, 1)}>加入購物車</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
