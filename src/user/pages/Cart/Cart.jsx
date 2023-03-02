import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import "./cart.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";

function Cart() {
  const token = localStorage.getItem("user_token");

  var isLoggedIn = false;
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
        //console.log(data);
        setCartItems(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const cartItem = cartItems.cartItemDtoList;
  const len = cartItem?.length;
  console.log(cartItem);
  //console.log(len);

  const deleteItem = (cartid) => {
    console.log(cartid);

    axios
      .delete(
        baseURL + "cart/delete/" + cartid + "?token=" + token,
        {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        { mode: "cors" }
      )
      .then((res) => console.log(res))
      .then(window.location.reload(false));
  };

  return (
    <>
      <Meta title="Cart"></Meta>
      <BreadCrumb title="Cart" />
      <section className="cart-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="d-flex cart-header py-3 justify-content-between align-content-center">
                <h4 className="cart-col-1">Product</h4>
                <h4 className="cart-col-2">Price</h4>
                <h4 className="cart-col-3">Quantity</h4>
                <h4 className="cart-col-4">Total</h4>
              </div>

              {/* <div clas9sName="cart-col-1 d-flex align-items-center"></div>
                <div className="cart-col-2"></div>
                <div className="cart-col-3"></div>
                <div className="cart-col-4"></div> */}
              {len > 0 ? (
                cartItem.map((item) => {
                  return (
                    <>
                      <div className="d-flex cart-data py-3 justify-content-between align-items-center">
                        <div className="cart-col-1 d-flex align-items-center ">
                          <div className="w-25">
                            <img
                              src={item.product.imageUrl}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                          <div className="w-75 mx-3">
                            <h5>{item.product.name}</h5>
                          </div>
                        </div>
                        <div className="cart-col-2">
                          <h5 className="price">₹ {item.product.price}</h5>
                        </div>
                        <div className="cart-col-3 ">
                          <h5 className="quantity">
                            {item.quantity}
                            <button
                              className="btn btn-danger mx-4"
                              onClick={() => deleteItem(item.cartid)}
                            >
                              <DeleteForeverIcon />
                            </button>
                          </h5>
                        </div>
                        <div className="cart-col-4">
                          <h5 className="price">
                            ₹ {item.product.price * item.quantity}
                          </h5>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                <h5
                  style={{
                    backgroundColor: "yellow",
                    padding: "10px",
                    marginTop: "5px",
                  }}
                >
                  Cart is Empty!
                </h5>
              )}
            </div>
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <NavLink className="button" to={"/home/"}>
                  Continue To Shopping
                </NavLink>
                <div className="d-flex align-items-end flex-column">
                  <h4>SubTotal : ₹ {cartItems.totalCost}</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  {isLoggedIn === true ? (
                    <NavLink className="button" to={"/home/checkout"}>
                      Checkout
                    </NavLink>
                  ) : (
                    <NavLink className="button " to={"/home/checkout"} style={{pointerEvents:"none",opacity:"0.3"}}>
                      Checkout
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
