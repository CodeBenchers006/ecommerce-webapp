import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { Image } from "antd";

function EditCategory() {
  const { id } = useParams();
  const baseURL = "http://localhost:8081/";

  //fetch category data to display on the fields
  const [category, setCategory] = useState("");
  useEffect(() => {
    fetch(baseURL + "category/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCategory(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const showAlert = () => {
    Swal.fire({
      title: "Success",
      text: "Category Updated Successfully",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        categoryName: category.categoryName,
        description: category.description,
        imageUrl: category.imageUrl,
      };
      console.log(category);
      const res = await axios.put(
        baseURL + `category/update/${id}`,
        data,
        {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        },
        { mode: "cors" }
      );
      console.log(res.data);
      showAlert();
      //navigate('/admin/category')
    } catch (err) {
      console.log(err.message);
    }
  };

  const edithandler = (e) => {
    if (e.target.name === "name") {
      setCategory({ ...category, categoryName: e.target.value });
    }
    if (e.target.name === "description") {
      setCategory({ ...category, description: e.target.value });
    }
    if (e.target.name === "url") {
      setCategory({ ...category, imageUrl: e.target.value });
    }
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate("/admin/category");
  };

  return (
    <div>
      <h3 className="mb-4">Edit Category</h3>
      <div>
        <button
          className="btn btn-info"
          style={{ width: "100px", color: "white", float: "right" }}
          onClick={goBack}
        >
          Back
        </button>
      </div>
      <div className="pt-5">
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="" className="pb-3">
            Name
          </label>
          <input
            type="text"
            value={category.categoryName}
            name="name"
            id=""
            className="form-control"
            disabled
            onChange={(e) => edithandler(e)}
          />

          <label htmlFor="" className="pb-3 pt-2">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            id=""
            className="form-control"
            value={category.description}
            onChange={(e) => edithandler(e)}
          />
          <label htmlFor="" className="mt-3">
            Upload Image
          </label>
          <div className="mt-4">
            <input
              type="text"
              name="url"
              id=""
              className="form-control"
              value={category.imageUrl}
              onChange={(e) => edithandler(e)}
            />
          </div>
          <div className="pt-5">
            <p>Preview</p>
            <Image width={200} src={category.imageUrl} />
          </div>
          <button className="btn btn-success border-0 rounded-3 my-5">
            Edit Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditCategory;
