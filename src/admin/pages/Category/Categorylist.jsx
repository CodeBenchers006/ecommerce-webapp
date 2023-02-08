import React from "react";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";

function Categorylist() {
  const navigate = useNavigate();
  const addCategory = () => {
    navigate("/admin/category/add");
  };

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },

    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "View",
      dataIndex: "view",
    },
  ];

  const data1 = [];

  for (let i = 1; i <= 4; i++) {
    data1.push({
      key: i,
      category: `Mobile`,
      description: "Mobiles",
      view: <button className="btn btn-primary">View</button>,
    });
  }
  return (
    <div>
      <h3 className="mb-3">Category List</h3>
      <div className="mb-4">
        <button className="btn btn-success" onClick={addCategory}>
          Add New
        </button>
      </div>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
}

export default Categorylist;
