import React, { useEffect, useState } from "react";
import Meta from "../../components/Meta";
import "./checkout.css";
import { NavLink, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import data from "./countries.json";
import Swal from "sweetalert2";
import axios from "axios";

function Checkout(props) {
  const token = localStorage.getItem("user_token");

  var isLoggedIn = false;
  if (token !== "null") {
    isLoggedIn = true;
  }
  if (token === null || token === "") {
    isLoggedIn = false;
  }
  // console.log(token)
  // console.log(isLoggedIn)

  const baseURL = "http://localhost:8081/";
  const [cartItems, setCartItems] = useState("");

  const [country, setCountry] = useState([]);
  const [state, setState] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState("");
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

  useEffect(() => {
    fetch(baseURL + "user/" + token)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserInfo(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const cartItem = cartItems.cartItemDtoList;
  // console.log(cartItem);

  const usernameArray = localStorage.getItem("user_name").split(" ");
  const [fname, setFname] = useState(usernameArray[0]);
  const [lname, setLname] = useState(usernameArray[1]);

  // console.log(state);
  // console.log(country);

  console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("A name was submitted: ");
    let info = {
      country: data[country].country,
      firstName: fname,
      lastName: lname,
      contact: contact,
      address: address,
      apartment: apartment,
      city: city,
      state: data[country].state[state].name,
      pin: pin,
    };

    await axios
      .post(
        baseURL + "user/usershippingaddress?token=" + token,
        info,
        {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        { mode: "cors" }
      )
      .then((res) => console.log(res.data), navigate("/home/checkout/shipping"))
      .catch((err) => console.log(err));

    console.log(info);
  };

  let curr = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

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
                  {userInfo.name} ({userInfo.email})
                </p>
                <h4 className="mb-3 total-price">Shipping Address</h4>
                <form
                  action=""
                  onSubmit={handleSubmit}
                  className="d-flex gap-15 justify-content-between flex-wrap"
                >
                  <div className="w-100">
                    <select
                      name="country"
                      id=""
                      className="form-control form-select"
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    >
                      <option value="" selected disabled>
                        Select Country
                      </option>
                      {data &&
                        data.map((x, index) => {
                          return <option value={index}>{x.country}</option>;
                        })}
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      name="firstName"
                      id=""
                      className="form-control"
                      placeholder="First Name"
                      value={fname}
                      disabled
                    />
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      name="lastName"
                      id=""
                      className="form-control"
                      placeholder="Last Name"
                      value={lname}
                      disabled
                      autoComplete="none"
                    />
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      name="contact"
                      id=""
                      className="form-control"
                      placeholder="Contact Number"
                      required
                      onChange={(e) => setContact(e.target.value)}
                      autoComplete="none"
                    />
                  </div>
                  <div className="w-100">
                    <input
                      type="text"
                      name="address"
                      id=""
                      className="form-control"
                      placeholder="Address"
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="w-100">
                    <input
                      type="text"
                      name="apartment"
                      id=""
                      className="form-control"
                      placeholder="Apartment/Landmark (optional)"
                      onChange={(e) => setApartment(e.target.value)}
                      autoComplete="none"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      name="city"
                      id=""
                      className="form-control"
                      placeholder="City"
                      required
                      onChange={(e) => setCity(e.target.value)}
                      autoComplete="none"
                    />
                  </div>
                  <div className="flex-grow-1">
                    <select
                      name="state"
                      id=""
                      className="form-control form-select"
                      onChange={(e) => setState(e.target.value)}
                      required
                      autoComplete="none"
                    >
                      <option value="" selected disabled>
                        State
                      </option>
                      {data[country] !== null
                        ? data[country] &&
                          data[country].state.map((x, index) => {
                            return <option value={index}>{x.name}</option>;
                          })
                        : console.log("not found")}
                    </select>
                  </div>
                  <div className="flex-grow-1">
                    <input
                      type="text"
                      name="pin"
                      id=""
                      className="form-control"
                      placeholder="Pin Code"
                      required
                      onChange={(e) => setPin(e.target.value)}
                      autoComplete="none"
                    />
                  </div>
                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center border-bottom pb-4">
                      <NavLink to="/home/cart" className="text-dark">
                        <ArrowBackIcon className="me-2" />
                        Return to Cart
                      </NavLink>
                      <button
                        to={"/home/checkout/shipping"}
                        className="button-ship"
                      >
                        Check Shipping Details
                      </button>
                      {/* <NavLink
                        to={"/home/checkout/shipping"}
                        className="button-ship"
                      >
                        Check Shipping Details
                      </NavLink> */}
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
                             {curr.format(item.product.price)}
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
                  <p className="total-price">{curr.format(cartItems.totalCost)}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-0 total">Shipping</p>
                  <p className="mb-0 total-price">{curr.format(99)}</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center border-bottom py-4">
                <h4 className="total">Total</h4>
                <h5 className="total-price">{curr.format(cartItems.totalCost + 99)}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
