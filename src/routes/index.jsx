import App from "../App";
import Cart from "../pages/Cart";
import Home from "../pages/Home"; // 登入頁面
import ProductDetail from "../pages/ProductDetail";
import Products from "../pages/Products";
import AdminOrder from "../pages/dashboard/AdminOrder";
import AdminProducts from "../pages/dashboard/AdminProducts";
import RequireAuth from "../pages/dashboard/RequireAuth"; // 新增一個檢查元件

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Products /> // 前台首頁改成商品列表
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "products/:id",
        element: <ProductDetail />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "home", // 登入頁面放在 /home
        element: <Home />
      },
      {
        path: "dashboard/products",
        element: (
          <RequireAuth>
            <AdminProducts />
          </RequireAuth>
        )
      },
      {
        path: "dashboard/orders",
        element: (
          <RequireAuth>
            <AdminOrder />
          </RequireAuth>
        )
      }
    ]
  }
];

export default routes;
