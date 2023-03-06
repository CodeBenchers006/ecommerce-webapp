import React, { useEffect, useState } from "react";
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
      title: "Edit",
      dataIndex: "view",
    },
  ];

  const data1 = [];

  const baseURL = "http://localhost:8081/";
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(baseURL + "category/list")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


  categories.map((cat, index) => {
    index += 1;
    data1.push({
      key: index,
      category: cat.categoryName,
      description: cat.description,
      view: (
        <button
          className="btn btn-primary"
          onClick={() => {
            navigate("/admin/category/edit/" +cat.id);
          }}
        >
          Edit
        </button>
      ),
    });
  });

  
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
