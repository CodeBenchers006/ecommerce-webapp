import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import "./checkout.css";
import { Link, NavLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import data from "./countries.json";

function Checkout(props) {
  const baseURL =
    "http://localhost:8081/cart/items?token=3bc9addb-0d4a-4dae-b2ca-ca5702e2619a";
  const [cartItems, setCartItems] = useState("");

  useEffect(() => {
    fetch(baseURL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCartItems(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [desh, setDesh] = useState("");

  console.log(desh);

  const cartItem = cartItems.cartItemDtoList;
  console.log(cartItem);
  return (
    <>
      <Meta title="Checkout"></Meta>
      <div className="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-lg-7 col-sm-12  border-right px-4">
              <div className="checkout-left-data">
                <h3 className="website-name">Budget Basket</h3>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <NavLink to="/home/cart" className="text-dark total">
                        Cart
                      </NavLink>
                    </li>
                    &nbsp;
                    <li className="breadcrumb-item active total text-dark">
                      Information
                    </li>
                    &nbsp;
                    <li className="breadcrumb-item active total ">Shipping</li>
                    &nbsp;
                    <li
                      className="breadcrumb-item active total"
                      aria-current="page"
                    >
                      Payment
                    </li>
                  </ol>
                </nav>
                <h4 className="title total-price">Contact Information</h4>
                <p className="user-details">
                  Aditya Sharma (codebenchers006@gmail.com)
                </p>
                <h4 className="mb-3 total-price">Shipping Address</h4>
                <form
                  action=""
                  className="d-flex gap-15 justify-content-between flex-wrap"
                >
                  <div className="w-100">
                    <select
                      name=""
                      id=""
                      className="form-control form-select"
                      onChange={(e) => setDesh(e.target.value)}
                    >
                      <option value="" selected disabled>
                        Select Country
                      </option>
                      {data.country &&
                        data.country.map((x) => {
                          return <option value={x.name}>{x.name}</option>;
                        })}
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control"
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control"
                      placeholder="Contact Number"
                    />
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control"
                      placeholder="Address"
                    />
                  </div>

                  <div className="w-100">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control"
                      placeholder="Apartment/Landmark (optional)"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control"
                      placeholder="City"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <select name="" id="" className="form-control form-select">
                      <option value="" selected disabled>
                        State
                      </option>
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control"
                      placeholder="Pin Code"
                    />
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center border-bottom pb-4">
                      <NavLink to="/home/cart" className="text-dark">
                        <ArrowBackIcon className="me-2" />
                        Return to Cart
                      </NavLink>
                      <NavLink
                        to="/home/checkout/shipping"
                        className="button-ship"
                      >
                        Continue to Payment
                      </NavLink>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-5 col-sm-12">
              {cartItem &&
                cartItem.map((item) => {
                  return (
                    <>
                      <div className="border-bottom py-4">
                        <div className="d-flex gap-15 align-items-center mb-2 ">
                          <div className="w-75 d-flex gap-10">
                            <div className="w-25 position-relative">
                              <span
                                style={{ top: "-10px", right: "2px" }}
                                className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                              >
                                {item.quantity}
                              </span>
                              <img
                                src={item.product.imageUrl}
                                alt=""
                                className="img-fluid"
                              />
                            </div>
                            <div>
                              <h5 className="item-name total-price">
                                {item.product.name}
                              </h5>
                            </div>
                          </div>

                          <div className="flex-grow-1">
                            <h5 className="total-price mx-">
                              {"₹ " + item.product.price}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              <div className="border-bottom py-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="total">Subtotal</p>
                  <p className="total-price">₹ {cartItems.totalCost}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Shipping</p>
                  <p className="mb-0 total-price">₹ {"299"}</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                <h4 className="total">Total</h4>
                <h5 className="total-price">₹ {cartItems.totalCost + 299}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
