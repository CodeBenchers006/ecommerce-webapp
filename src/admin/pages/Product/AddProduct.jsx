import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Image } from "antd";

//fetch the category names inorder to make a dropdown list
const baseURL = "http://localhost:8081/";

function AddProduct() {
  const navigate = useNavigate();

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

  const showAlert = () => {
    Swal.fire({
      title: "Success",
      text: "Added Successfully",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const goBack = () => {
    navigate("/admin/product");
  };

  //post the product details
  const [categoryId, setcategoryId] = useState("");
  const [name, setname] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [price, setprice] = useState("");
  const [description, setDescription] = useState("");
  const [totalItems, setTotalItems] = useState("")

  console.log(totalItems)

  const pathname = window.location.pathname;
  console.log(pathname);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        baseURL + "product/create",
        {
          categoryId: categoryId,
          name: name,
          imageUrl: imageUrl,
          price: price,
          description: description,
          totalItems: totalItems
        },
        {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        {
          mode: "cors",
        }
      );
      console.log(res.data);
      showAlert();
      navigate("/admin/product/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <h3 className="mb-4">Add Product</h3>
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
            placeholder="Product Name"
            required
            value={name}
            onChange={(e) => setname(e.target.value)}
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
          <label htmlFor="" className="pb-3 pt-2">
            Price
          </label>
          <input
            type="text"
            name="price"
            id=""
            className="form-control"
            placeholder="Enter Price"
            required
            value={price}
            onChange={(e) => setprice(e.target.value)}
          />
          <label htmlFor="" className="pb-3 pt-2">
            Total Items
          </label>
          <input
            type="number"
            name="totalitems"
            id=""
            className="form-control"
            placeholder="Enter Total Items"
            required
            value={totalItems}
            onChange={(e) => setTotalItems(e.target.value)}

            style={{width:"15%"}}
          />

          <label htmlFor="" className="pb-3 pt-2">
            Category
          </label>
          <select
            name=""
            className="form-control"
            id=""
            onChange={(e) => setcategoryId(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((category) => {
              return (
                <option value={category.id}>{category.categoryName}</option>
              );
            })}
          </select>

          <label htmlFor="" className="mt-3">
            Upload Image URL
          </label>
          <div className="mt-4">
            <input
              type="text"
              name="url"
              id=""
              className="form-control"
              required
              value={imageUrl}
              onChange={(e) => setimageUrl(e.target.value)}
            />
          </div>
          <div className="pt-5">
            <p>Preview</p>
            <Image width={200} src={imageUrl} />
          </div>
          <button className="btn btn-success border-0 rounded-3 my-5">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
