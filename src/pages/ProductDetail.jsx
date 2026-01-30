import { useLocation, useNavigate } from "react-router-dom";

function ProductDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;

    if (!product) return <p>找不到產品資料</p>;

    return (
        <div className="container mt-4">
            <h2>{product.title}</h2>
            <p className="text-muted">
                原價：<del>{product.origin_price}</del>
            </p>
            <p className="fw-bold text-danger">
                售價：{product.price}
            </p>
            <p>描述：{product.description}</p>
            <p>內容：{product.content}</p>
            <img src={product.imageUrl} alt={product.title} className="img-fluid mb-3 w-25 d-block rounded shadow" />
            <button className="btn btn-secondary" onClick={() => navigate("/dashboard/products")}>
                返回
            </button>
        </div>
    );
}


export default ProductDetail;
