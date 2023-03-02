import React, { useEffect, useState } from "react";
import Meta from "../../../components/Meta";
import "../checkout.css";
import { Link, NavLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import data from "../countries.json";
import { Stripe } from "stripe";
import axios from "axios";

function Payment(props) {
  const token = localStorage.getItem("user_token");

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

  const paymentDataBody = {
    stripeAPIToken:
      "pk_test_51MfPuCSANj0YohHT1l3DeZkPdWLDfhkUGG99hjeedwfsy5rKjDmQ7Z7NIccBQxfN9HyONynfAHtlpHQH0HARVmZ900XCgwFPTw",
    stripe: "",
    token: null,
    checkOutArrayBody: [],
  };

  const getAllItems = () => {
    for (let i = 0; i < cartItem.length; i++) {
      paymentDataBody.checkOutArrayBody.push({
        price: cartItem[i].product.price,
        quantity: cartItem[i].quantity,
        productId: cartItem[i].product.product_id,
        productName: cartItem[i].product.name,
      });
      //console.log(data)
    }

    console.log(paymentDataBody.checkOutArrayBody);
  };

  const stripe = window.Stripe(paymentDataBody.stripeAPIToken);

  const gotoCheckout = () => {
    getAllItems();

    console.log(paymentDataBody.checkOutArrayBody);
    axios
      .post(
        baseURL + "order/create-checkout-session",
        paymentDataBody.checkOutArrayBody,
        {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        {
          mode: "cors",
        }
      )
      .then((response) => {
        localStorage.setItem("sessionId", response.data.sessionId);
        console.log(response.data.sessionId);
        return response.data;
      })
      .then((session) => {
        return stripe.redirectToCheckout({
          sessionId: session.sessionId,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Meta title="Payment"></Meta>
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
                    <li className="breadcrumb-item active total ">Shipping</li>
                    &nbsp;
                    <li
                      className="breadcrumb-item active total text-dark"
                      aria-current="page"
                    >
                      Payment
                    </li>
                  </ol>
                </nav>

                <div className="w-100">
                  <div className="justify-content-between align-items-center border p-4 mb-5">
                    <div className="d-flex justify-content-between border-bottom w-100">
                      <div className="total-price">Payment Details</div>
                      <div>
                        <p className="total">
                          While making payment use card number 4242 4242 4242
                          4242 and enter random cvv(3 digit)
                        </p>
                      </div>
                      <div>change</div>
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
                      to="/home/checkout/payment"
                      className="button-ship"
                      onClick={gotoCheckout}
                    >
                      Make Payment
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

export default Payment;
