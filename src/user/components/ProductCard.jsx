import React from "react";
import ReactStars from "react-rating-stars-component";
import { PlusOutlined, HeartOutlined, EyeOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import "../pages/User_Homepage/userhomepage.css";


function ProductCard(props) {

  let location=useLocation();
  console.log(location.pathname)

  return (
    <div className={` ${location.pathname === "/home/store" ? `col-${props.grid}` : "col-3" }` } style={props.card_style}>
      <div
        className="card product-card position-relative my-1"
        style={props.styles}
      >
        <div className="card-image" >
          <img src={props.item.imageUrl} className="card-img-top" alt="..." />
        </div>
        <div className="card-body product-details" >
          <h5 className="title">{props.item.name}</h5>
          <h6 style={{ height: "40px", marginBottom:"20px" }}>{props.item.description}</h6>
          <ReactStars
            count={5}
            size={24}
            activeColor="#ffd700"
            isHalf={true}
            value={3.5}
            edit={false}
          />
          <p className="price" style={{fontSize:"20px"}}>₹ {props.item.price}</p>
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
