import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";

function ProductList() {
  const baseURL = "http://localhost:8081/";
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);

  const addProduct = () => {
    navigate("/admin/product/add");
  };

  useEffect(() => {
    fetch(baseURL + "product/listAll")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "View",
      dataIndex: "view",
    },
  ];

  const data1 = [];

  product.map((prod, index) => {
    index += 1;
    data1.push({
      key: index,
      product: prod.name,
      price: prod.price,
      view: (
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate("/admin/product/view/" + prod.product_id);
          }}
        >
          Open
        </button>
      ),
    });
  });

  return (
    <div>
      <h3 className="mb-3">Product List</h3>
      <div className="mb-4">
        <button className="btn btn-success" onClick={addProduct}>
          Add New
        </button>
      </div>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
}

export default ProductList;
