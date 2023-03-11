import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Meta from "../../components/Meta";
import "../Checkout/checkout.css";

function OrderDetails() {
  const { id } = useParams();
  const baseURL = "http://localhost:8081/";

  const token = localStorage.getItem("user_token");
  const user = localStorage.getItem("user_name");

  const navigate = useNavigate();
  var isLoggedIn = false;
  if (token !== "null") {
    isLoggedIn = true;
  }
  if (token === null || token === "") {
    isLoggedIn = false;
  }

  useEffect(() => {
    if (!isLoggedIn) {
      Swal.fire({
        text: "Login to Continue",
        icon: "error",
        confirmButtonText: "Ok",
      });
      navigate("/");
    }
  });

  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    fetch(baseURL + "order/" + id + "?token=" + token)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrderDetails(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  console.log(id);

  const getOrderDate = (createdDate) => {
    const d =
      `${new Date(createdDate).getDate()}` +
      "/" +
      `${new Date(createdDate).getMonth() + 1}` +
      "/" +
      `${new Date(createdDate).getFullYear()}`;
    return d;
  };

  const getDeliveredDate = (createdDate) => {
    const d =
      `${new Date(createdDate).getDate() + 7}` +
      "/" +
      `${new Date(createdDate).getMonth() + 1}` +
      "/" +
      `${new Date(createdDate).getFullYear()}`;
    console.log(d);
    return d;
  };

  let curr = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const compareDates = (d1, d2) => {
    var date1 = Date.now(d1);
    var date2 = Date.now(d1) + 7;

    console.log(date1);
    if (date1 < date2) {
      return (
        "Items dispatched, will be delivered within 7 business days. Estimated delivery date: " +
        d2
      );
    } else {
      return "Delivered on " + d2;
    }
  };
  return (
    <>
      <Meta title="OrderDetails"></Meta>
      <div className="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 px-4">
              <div className="checkout-left-data">
                <h3 className="website-name">Order Details</h3>
                <div>
                  <div className="d-flex align-items-center justify-content-between">
                    <p>Ordered on {orderDetails.createdDate}</p>
                    <p>Order# {id}</p>
                    <p>
                      <a href="">Invoice</a>
                    </p>
                  </div>
                  <div className="border border-white border-3 rounded d-flex justify-content-between p-3">
                    <div style={{ width: "40%", height: "100%" }}>
                      <h6>Shipping Address</h6>
                      <p>
                        {user} <br />
                        {orderDetails.deliveryAddress}
                      </p>
                    </div>
                    <div style={{ width: "20%", height: "100%" }}>
                      <h6>Payment Methods</h6>
                      <p>Card Payment</p>
                    </div>
                    <div style={{ width: "30%", height: "100%" }}>
                      <h6>Order Summary</h6>
                      <div className="d-flex justify-content-between">
                        <span>Item(s) Subtotal:</span>
                        <span>{curr.format(orderDetails.totalPrice)}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Shipping:</span>
                        <span>{curr.format(0)}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Total:</span>
                        <span>{curr.format(orderDetails.totalPrice)}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>
                          <strong>Grand Total:</strong>
                        </span>
                        <span>
                          <strong>
                            {" "}
                            {curr.format(orderDetails.totalPrice)}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>
                  {orderDetails.orderItems &&
                    orderDetails.orderItems.map((item) => {
                      const orderDate = getOrderDate(item.createdDate);

                      const deliveredDate = getDeliveredDate(item.createdDate);

                      const status = compareDates(orderDate, deliveredDate);
                      return (
                        <>
                          <div className="border border-white border-3 rounded  p-3 my-4">
                            <div>
                              <h4 style={{ fontSize: "18px" }}>{status}</h4>
                            </div>
                            <div className="d-flex ">
                              <img
                                src={item.product.imageUrl}
                                alt=""
                                className="img-fluid me-3"
                                style={{ width: "150px" }}
                              />
                              <div className="">
                                <span>
                                  <a
                                    href={
                                      "/home/store/product/" +
                                      item.product.product_id
                                    }
                                  >
                                    {item.product.name}
                                  </a>
                                </span>{" "}
                                <br />
                                <span>Sold by: CodeBenchers006</span> <br />
                                <span>
                                {curr.format(item.product.price)}
                                </span>{" "}
                                <br />
                                <button
                                  className="btn btn-primary mt-3"
                                  onClick={() => {
                                    navigate(
                                      "/home/store/product/" +
                                        item.product.product_id
                                    );
                                  }}
                                >
                                  Buy Again
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
