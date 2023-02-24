import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import "./cart.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link, NavLink } from "react-router-dom";

function Cart() {
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

  const cartItem = cartItems.cartItemDtoList;
  console.log(cartItem);

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
              {cartItem &&
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
                            <button className="btn btn-danger mx-4">
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
                })}
            </div>
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <NavLink className="button" to="/home/store">
                  Continue To Shopping
                </NavLink>
                <div className="d-flex align-items-end flex-column">
                  <h4>SubTotal : ₹ {cartItems.totalCost}</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <NavLink className="button" to="/home/store">
                  Checkout
                </NavLink>
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
