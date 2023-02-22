import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";

const { Meta } = Card;

function Category() {
  const navigate = useNavigate();

  const addCategory = () => {
    navigate("/admin/category/add");
  };

  const editCategory = (id) => {
    navigate("/admin/category/edit/" + id);
  };

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

  return (
    <div>
      <h3 className="mb-3">Category</h3>
      <div className="mb-4">
        <button className="btn btn-success" onClick={addCategory}>
          Add New
        </button>
      </div>
      <div className="row">
        {categories.map((category) => {
          return (
            <div className="col-lg-3 col-md-4 col-sm-12 d-flex">
              <Card
                style={{
                  width: 300,
                  height: 400,
                  marginBottom: "40px",
                }}
                cover={<img alt="example" src={category.imageUrl} />}
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => editCategory(category.id)}
                  />,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={category.categoryName}
                  description={category.description}
                />
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
