import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "antd";

function InventoryPage() {
  const baseURL = "http://localhost:8081/";

  const [inventory, SetInventory] = useState("");
  const navigate = useNavigate();

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },

    {
      title: "Product Name",
      dataIndex: "product",
    },
    {
      title: "Total Items",
      dataIndex: "totalitems",
    },
    {
      title: "Edit",
      dataIndex: "view",
    },
  ];

  const data1 = [];

  useEffect(() => {
    fetch(baseURL + "inventory/checkAll")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        SetInventory(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  inventory&&inventory.map((item, index) => {
    index += 1;
    data1.push({
      key: index,
      product: item.product.name,
      totalitems: item.totalItems!==0?item.totalItems:"Out of Stock",
      view: (
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate("/admin/product/edit/" + item.product.product_id);
          }}
        >
          Edit
        </button>
      ),
    });
  });

  return (
    <div>
      <h3 className="mb-3">Inventory List</h3>
      <div className="mb-4">
        
      </div>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
}

export default InventoryPage;
