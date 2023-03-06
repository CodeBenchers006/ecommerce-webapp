import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Image } from "antd";

const baseURL = "http://localhost:8081/";

function AddCategory() {
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const showAlert = () => {
    Swal.fire({
      title: "Success",
      text: "Added Successfully",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const goBack = () => {
    navigate("/admin/category");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        baseURL + "category/create",
        {
          categoryName: categoryName,
          description: description,
        },
        {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        { mode: "cors" }
      );
      console.log(res.data);
      showAlert();
      //navigate('/admin/category')
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h3 className="mb-4">Add Category</h3>
      <button
        className="btn btn-info"
        style={{ width: "100px", color: "white", float: "right" }}
        onClick={goBack}
      >
        Back
      </button>
      <div className="pt-5">
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="" className="pb-3">
            Name
          </label>
          <input
            type="text"
            name="name"
            id=""
            className="form-control"
            placeholder="Enter Category Name"
            required
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <label htmlFor="" className="pb-3 pt-2">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            id=""
            className="form-control"
            placeholder="Enter Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="btn btn-success border-0 rounded-3 my-5">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
