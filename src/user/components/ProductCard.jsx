import React from "react";
import ReactStars from "react-rating-stars-component";
import { PlusOutlined, HeartOutlined, EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../pages/User_Homepage/userhomepage.css";

function ProductCard(props) {
  return (
    <div className="col-3" style={{ width: "28%" }}>
      <div
        class="card product-card position-relative"
        style={{ width: "20rem", height: "35rem" }}
      >
        <div className="card-image" style={{ height: "300px" }}>
          <img src={props.item.imageUrl} className="card-img-top" alt="..." />
        </div>
        <div class="card-body product-details" >
          <h5 className="title">{props.item.name}</h5>
          <h6 style={{ height: "40px" }}>{props.item.description}</h6>
          <ReactStars
            count={5}
            size={24}
            activeColor="#ffd700"
            isHalf={true}
            value={3.5}
            edit={false}
          />
          <p className="price">₹ {props.item.price}</p>
          <div className="action-bar">
            <div className="justify-content-center">
              <Link to="" className="px-4 icon">
                <PlusOutlined />
              </Link>
              <Link to="" className="px-4">
                <HeartOutlined />
              </Link>
              <Link to="" className="px-4">
                <EyeOutlined />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
