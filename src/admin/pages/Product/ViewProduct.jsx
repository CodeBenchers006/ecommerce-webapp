import React, { useEffect, useState } from "react";
import { Image } from "antd";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function ViewProduct() {
  const { product_id } = useParams();
  console.log(product_id);

  const baseURL = "http://localhost:8081/";

  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const deleteProduct = () => {

    var id = parseInt(product_id)
    
    axios.delete(
      baseURL+"product/delete/"+id,
      {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      { mode: "cors" }
    )
    .then((res) => console.log(res))
    .then(()=>{
      Swal.fire({
        text: "Product deleted successfully",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/admin/product")
    });

  }

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

  return (
    <div>
      <h3 className="mb-3">Product Details</h3>

      <div className="row">
        <div className="col-sm-12 col-lg-4 align-items-center " width={400}>
          <Image src={product.imageUrl} />
        </div>
        <div className="col-sm-12 col-lg-8 " width={400}>
          <div className="border p-5" width={400}>
            <p>
              <h6 style={{ fontSize: "30px" }}>{product.name}</h6>
            </p>
            <p>
              <label htmlFor="">Description</label>
              <p style={{ fontSize: "20px" }}>{product.description}</p>
            </p>
            <p>
              <label htmlFor="">Price</label>
              <h6 style={{ fontSize: "20px" }}>₹ {product.price}</h6>
            </p>
            <p>
              <label htmlFor="">Category</label>
              <h6 style={{ fontSize: "20px" }}>{category.categoryName}</h6>
            </p>

            <Space size={50}>
              <button
                className="btn btn-success"
                onClick={() => {
                  navigate("/admin/product/edit/" + product_id);
                }}
              >
                <EditIcon />
              </button>
              <button
                className="btn btn-danger "
                onClick={() => {
                  deleteProduct();
                }}
              >
                <DeleteForeverIcon />
              </button>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
