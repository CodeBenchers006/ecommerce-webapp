import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import "./checkout.css";
import { Link, NavLink,useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import data from "./countries.json";
import Swal from "sweetalert2";

function Shipping(props) {
  const token = localStorage.getItem("user_token");
  const navigate = useNavigate();

  var isLoggedIn = false;
  if (token !== "null") {
    isLoggedIn = true;
  }
  if (token === null || token === "") {
    isLoggedIn = false;
  }
  const baseURL = "http://localhost:8081/";
  const [cartItems, setCartItems] = useState("");

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
    fetch(baseURL + "cart/items?token=" + token)
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

  const cartItem = cartItems.cartItemDtoList;

  return (
    <>
      <Meta title="Shipping"></Meta>
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
                    <li className="breadcrumb-item active total ">
                      Information
                    </li>
                    &nbsp;
                    <li className="breadcrumb-item active total text-dark">
                      Shipping
                    </li>
                    &nbsp;
                    <li
                      className="breadcrumb-item active total"
                      aria-current="page"
                    >
                      Payment
                    </li>
                  </ol>
                </nav>

                <div className="w-100">
                  <div className="justify-content-between align-items-center border p-4 mb-5">
                    <div className="d-flex justify-content-between border-bottom w-100">
                      <div className="total-price">Contact</div>
                      <div>
                        <p className="total">abc@gmail.com</p>
                      </div>
                      <div>change</div>
                    </div>
                    <div className="d-flex justify-content-between w-100 mt-4">
                      <div className="total-price">Ship To</div>
                      <div>
                        <p className="total">
                          C-15, BH Tower, Churches Colony, Dimapur. Nagaland.
                          797112
                        </p>
                      </div>
                      <div>change</div>
                    </div>
                  </div>
                </div>
                <h4>Shipping Method</h4>
                <div className="w-100">
                  <div className="justify-content-between align-items-center border p-4 mb-5">
                    <div className="d-flex justify-content-between align-items-center  w-100">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          checked
                        />
                        <div className="total-price">Standard</div>
                      </div>
                      <div className="total-price">₹ 299</div>
                    </div>
                  </div>
                </div>

                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center border-bottom pb-4">
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

export default Shipping;
