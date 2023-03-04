import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import "../Checkout/checkout.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Accordion from "react-bootstrap/Accordion";
import Swal from "sweetalert2";

function UserOrder() {
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
  const baseURL = "http://localhost:8081/";
  const [orderItems, setOrderItems] = useState("");

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

  useEffect(() => {
    fetch(baseURL + "order/listAll?token=" + token)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrderItems(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const getOrderDate = (createdDate) => {
    return (
      new Date(createdDate).getDate() +
      "/" +
      new Date(createdDate).getMonth() +
      "/" +
      new Date(createdDate).getFullYear()
    );
  };

  const getDeliveredDate = (createdDate) => {
    return (
      new Date(createdDate).getDate() +
      7 +
      "/" +
      new Date(createdDate).getMonth() +
      "/" +
      new Date(createdDate).getFullYear()
    );
  };

  const compareDates = (d1, d2) => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();

    if (date1 < date2) {
      return "Items dispatched, will be delivered within 7 business days";
    } else {
      return "Delivered on " + d2;
    }
  };

  return (
    <>
      <Meta title="Orders"></Meta>
      <div className="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 px-4">
              <div className="checkout-left-data">
                <h3 className="website-name">Your Orders</h3>

                {orderItems.length > 0 ? (
                  orderItems.map((order) => {
                    const orderDate = getOrderDate(order.createdDate);

                    const deliveredDate = getDeliveredDate(order.createdDate);

                    const status = compareDates(orderDate, deliveredDate);

                    //console.log(orderDate);
                    //console.log(deliveredDate);
                    console.log(status);
                    return (
                      <div className="justify-content-between align-items-center mb-5 ">
                        <div
                          className="d-flex justify-content-between  w-100 p-3"
                          style={{ backgroundColor: "#BDCDD6" }}
                        >
                          <div>
                            <h6>Order Placed</h6>
                            <p>{order.createdDate}</p>
                          </div>
                          <div>
                            <h6>Total</h6>
                            <p>Rs {order.totalPrice}</p>
                          </div>
                          <div>
                            <h6>Ship To</h6>
                            <p>{user}</p>
                          </div>
                          <div>
                            <h6>Order #{order.id} </h6>
                            <div>
                              <NavLink to={"/home/order/" + order.id}>
                                View order details
                              </NavLink>
                            </div>
                          </div>
                        </div>
                        <div
                          className="w-100  p-3"
                          style={{ backgroundColor: "white" }}
                        >
                          <div>
                            <h5>{status}</h5>
                          </div>
                          {order.orderItems &&
                            order.orderItems.map((item) => {
                              return (
                                <div>
                                  <Accordion>
                                    <Accordion.Item eventKey="0">
                                      <Accordion.Header>
                                        <strong>{item.product.name}</strong>
                                      </Accordion.Header>
                                      <Accordion.Body>
                                        <div className="d-flex align-items-center py-4 ">
                                          <div className="d-flex w-80">
                                            <img
                                              src={item.product.imageUrl}
                                              alt=""
                                              className="img-fluid"
                                              style={{ width: "10%" }}
                                            />
                                            <div className="p-3">
                                              <p>{item.product.name}</p>
                                              <div className="w-30 d-flex ">
                                                <button className="btn btn-primary">
                                                  Buy Again
                                                </button>
                                                <button
                                                  className="btn btn-warning mx-4"
                                                  onClick={() => {
                                                    navigate(
                                                      "/home/store/product/" +
                                                        item.product.product_id
                                                    );
                                                  }}
                                                >
                                                  View Item
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="w-20">
                                            <Link to="">
                                              Write a product review
                                            </Link>
                                          </div>
                                        </div>
                                      </Accordion.Body>
                                    </Accordion.Item>
                                  </Accordion>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <h6>No Orders</h6>
                )}

                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center  pb-4">
                    <NavLink to="/home/checkout" className="text-dark">
                      <ArrowBackIcon className="me-2" />
                      Return to Information
                    </NavLink>
                    <NavLink
                      to={"/home/checkout/payment"}
                      className="button-ship"
                    >
                      Continue to Payment
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserOrder;
