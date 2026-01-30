import App from "../App";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";
import Products from "../pages/Products";
import AdminOrder from "../pages/dashboard/AdminOrder";

import AdminProducts from "../pages/dashboard/AdminProducts";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
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
                path: "dashboard/products",
                element: <AdminProducts />
            },
            {
                path: "dashboard/orders",
                element: <AdminOrder />
            }
        ]
    }
];

export default routes;
