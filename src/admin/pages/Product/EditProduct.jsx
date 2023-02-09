import React, { useEffect, useState } from "react";
import { Image } from "antd";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EditProduct() {
  const { product_id } = useParams();
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/admin/product/view/" + product_id);
  };

  const showAlert = () => {
    Swal.fire({
      title: "Success",
      text: "Product Updated Successfully",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  //fetch the existing product data
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");

  const baseURL = "http://localhost:8081/";

  useEffect(() => {
    fetch(baseURL + "product/" + product_id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data);

        fetch(baseURL + "category/" + data.categoryId)
          .then((res) => res.json())
          .then((cat) => {
            console.log(cat);
            setCategory(cat);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })

      .catch((err) => {
        console.log(err.message);
      });
  }, [product_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data = {
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        description: product.description,
        categoryId: product.categoryId,
      };
      const res = await axios.put(
        baseURL + "product/update/" + product_id,
        data,
        {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
        },
        { mode: "cors" }
      );
      console.log(res.data);
      showAlert();
      navigate("/admin/product/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const editHandler = (e) => {
    if (e.target.name === "name") {
      setProduct({ ...product, name: e.target.value });
    }
    if (e.target.name === "url") {
      setProduct({ ...product, imageUrl: e.target.value });
    }
    if (e.target.name === "price") {
      setProduct({ ...product, price: e.target.value });
    }
    if (e.target.name === "description") {
      setProduct({ ...product, description: e.target.value });
    }
    if (e.target.name === "categoryid") {
      setProduct({ ...product, categoryId: e.target.value });
    }
  };

  return (
    <div>
      <h3 className="mb-4">Edit Product</h3>
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
            value={product.name}
            className="form-control"
            disabled
            onChange={(e) => editHandler(e)}
          />
          <label htmlFor="" className="pb-3 pt-2">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            id=""
            className="form-control"
            value={product.description}
            onChange={(e) => editHandler(e)}
          />
          <label htmlFor="" className="pb-3 pt-2">
            Price
          </label>
          <input
            type="text"
            name="price"
            id=""
            className="form-control"
            value={product.price}
            onChange={(e) => editHandler(e)}
          />
          <label htmlFor="" className="pb-3 pt-2">
            Category
          </label>
          <select
            name="categoryid"
            id=""
            className="form-control"
            disabled
            onChange={(e) => editHandler(e)}
          >
            <option value={category.id} name="categoryid">
              {category.categoryName}
            </option>
          </select>

          <label htmlFor="" className="pb-3 pt-2">
            ImageUrl
          </label>
          <input
            type="text"
            name="url"
            id=""
            className="form-control"
            value={product.imageUrl}
            onChange={(e) => editHandler(e)}
          />

          <div className="pt-5">
            <p>Preview</p>
            <Image width={400} src={product.imageUrl} />
          </div>
          <button className="btn btn-success border-0 rounded-3 my-5">
            Edit Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
