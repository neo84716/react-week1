import { useState, useEffect } from "react";
import axios from "axios";

const url = import.meta.env.VITE_API_URL;
const apiPath = import.meta.env.VITE_API_PATH;

function ProductModal({ show, onClose, getProducts, mode = "add", product }) {
    const [item, setItem] = useState(
        {
            "data": {
                "title": "",
                "category": "",
                "origin_price": 0,
                "price": 0,
                "unit": "個",
                "description": "",
                "content": "",
                "is_enabled": 0,
                "imageUrl": "",
                "imagesUrl": [
                    "",
                    "",
                    "",
                    "",
                    ""
                ]
            }
        }
    );
    useEffect(() => {
        if (show) {
            if (mode === "edit" && product) {
                setItem({ data: { ...product } });
            } else {
                setItem({
                    data: {
                        title: "",
                        category: "",
                        origin_price: 0,
                        price: 0,
                        unit: "個",
                        description: "",
                        content: "",
                        is_enabled: 0,
                        imageUrl: "",
                        imagesUrl: ["", "", "", "", ""]
                    }
                });
            }
        }
    }, [show, mode, product]);

    function eventHandle(e) {
        const { name, type, checked, value } = e.target;

        if (type === "checkbox") {
            setItem({
                ...item,
                data: {
                    ...item.data,
                    [name]: checked ? 1 : 0   // 轉成 1/0
                }
            });
        } else {
            const match = name.match(/imagesUrl\[(\d+)\]/);
            if (match) {
                const index = parseInt(match[1], 10);
                const newImages = [...item.data.imagesUrl];
                newImages[index] = value;
                setItem({
                    ...item,
                    data: {
                        ...item.data,
                        imagesUrl: newImages
                    }
                });
            } else {
                setItem({
                    ...item,
                    data: {
                        ...item.data,
                        [name]: type === "checkbox"
                            ? (checked ? 1 : 0)
                            : type === "number"
                                ? Number(value) : value
                    }
                });
            }
        }

    }

    async function handleSubmit() {
        try {
            if (mode === "add") {
                await axios.post(`${url}/api/${apiPath}/admin/product`, item);
                alert(`新增產品 "${item.data.title}" 成功`);
            } else {
                await axios.put(`${url}/api/${apiPath}/admin/product/${item.data.id}`, item);
                alert(`更新產品 "${item.data.title}" 成功`);
            }
            await getProducts();
            onClose();
        } catch (err) {
            console.error("操作失敗", err);
        }
    }

    if (!show) return null;

    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold" id="ProductModal">{mode === "add" ? "新增產品" : "編輯產品"}</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">

                            <div className="row">
                                <div className="d-flex justify-content-end align-items-center mb-2">
                                    <div className="col-4 d-flex justify-content-end align-items-center me-2">
                                        <p className="mb-0">Title：</p>
                                    </div>
                                    <div className="col-8 d-flex justify-content-center align-items-center">
                                        <input type="text" className="form-control" id="title" name="title" value={item.data.title} placeholder="請輸入標題" onChange={eventHandle} />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end align-items-center mb-2">
                                    <div className="col-4 d-flex justify-content-end align-items-center me-2">
                                        <p className="mb-0">Category：</p>
                                    </div>
                                    <div className="col-8 d-flex justify-content-center align-items-center">
                                        <input type="text" className="form-control" id="category" name="category" value={item.data.category} placeholder="請輸入類別" onChange={eventHandle} />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end align-items-center mb-2">
                                    <div className="col-4 d-flex justify-content-end align-items-center me-2">
                                        <p className="mb-0">Origin_Price；</p>
                                    </div>
                                    <div className="col-8 d-flex justify-content-center align-items-center">
                                        <input type="number" className="form-control" id="origin_price" name="origin_price" value={item.data.origin_price} placeholder="請輸入原價" onChange={eventHandle} />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end align-items-center mb-2">
                                    <div className="col-4 d-flex justify-content-end align-items-center me-2">
                                        <p className="mb-0">Price：</p>
                                    </div>
                                    <div className="col-8 d-flex justify-content-center align-items-center">
                                        <input type="number" className="form-control" id="price" name="price" placeholder="請輸入售價" value={item.data.price} onChange={eventHandle} />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end align-items-center mb-2">
                                    <div className="col-4 d-flex justify-content-end align-items-center me-2">
                                        <p className="mb-0">Unit：</p>
                                    </div>
                                    <div className="col-8 d-flex justify-content-center align-items-center">
                                        <input type="text" className="form-control" id="unit" name="unit" placeholder="請輸入單位" value={item.data.unit} onChange={eventHandle} />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end align-items-center mb-2">
                                    <div className="col-4 d-flex justify-content-end align-items-center me-2">
                                        <p className="mb-0">Description：</p>
                                    </div>
                                    <div className="col-8 d-flex justify-content-center align-items-center">
                                        <input type="text" className="form-control" id="description" name="description" placeholder="請輸入商品敘述" value={item.data.description} onChange={eventHandle} />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end align-items-center mb-2">
                                    <div className="col-4 d-flex justify-content-end align-items-center me-2">
                                        <p className="mb-0">Content：</p>
                                    </div>
                                    <div className="col-8 d-flex justify-content-center align-items-center">
                                        <input type="text" className="form-control" id="content" name="content" placeholder="請輸入商品內容" value={item.data.content} onChange={eventHandle} />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end align-items-center mb-2">
                                    <div className="col-4 d-flex justify-content-end align-items-center me-2">
                                        <p className="mb-0">Enable：</p>
                                    </div>
                                    <div className="col-8 d-flex justify-content-center align-items-center">
                                        <input type="checkbox" id="is_enabled" name="is_enabled" checked={item.data.is_enabled === 1} onChange={eventHandle} />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-end align-items-center mb-2">
                                    <div className="col-4 d-flex justify-content-end align-items-center me-2">
                                        <p className="mb-0">ImageUrl：</p>
                                    </div>
                                    <div className="col-8 d-flex justify-content-center align-items-center">
                                        <input type="text" className="form-control" id="imageUrl" name="imageUrl" placeholder="請輸入主圖網址" value={item.data.imageUrl} onChange={eventHandle} />
                                    </div>
                                </div>
                                {item.data.imagesUrl.map((url, index) => (
                                    <div key={index} className="d-flex justify-content-end align-items-center mb-2">
                                        <div className="col-4 d-flex justify-content-end align-items-center me-2">
                                            <p className="mb-0">imagesUrl-{index + 1}：</p>
                                        </div>
                                        <div className="col-8 d-flex justify-content-center align-items-center">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name={`imagesUrl[${index}]`}
                                                value={url}
                                                placeholder="請輸入副圖網址"
                                                onChange={eventHandle}
                                            />
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Close</button>
                            <button className="btn btn-outline-primary" onClick={handleSubmit}>
                                {mode === "add" ? "Add" : "Update"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductModal;