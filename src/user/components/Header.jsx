import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../pages/User_Homepage/userhomepage.css";
import SearchIcon from "@mui/icons-material/Search";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Dropdown from "react-bootstrap/Dropdown";
import SegmentIcon from "@mui/icons-material/Segment";

const baseURL = "http://localhost:8081/";

function Header() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("user_token");
  const user = localStorage.getItem("user_name");

  var isLoggedIn = false;
  if (token !== "null") {
    isLoggedIn = true;
  }
  if (token === null || token === "") {
    isLoggedIn = false;
  }

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

  const cartItem = cartItems && cartItems.cartItemDtoList;
  const len = cartItem?.length;

  useEffect(() => {
    fetch(baseURL + "category/list")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setCategories(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const logOut = () => {
    console.log("Logging out");
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <header className="header-top-strip">
        <div className="container-xxl">
          <div className="row pt-2">
            <div className="col-6">
              <p className="text-white">
                Free Shipping Over Rs 499 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white">
                Hotline:{" "}
                <a className="text-white" href="tel:+91 7005165294">
                  +91-7005165294
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link to={"/home"} className="text-white">
                  BudgetBasket.
                </Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group ">
                <input
                  class="form-control me-2 "
                  type="search"
                  placeholder="Search Product"
                  aria-label="Search"
                />
                <button class="btn btn-success" type="submit">
                  <SearchIcon />
                </button>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to=""
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <CompareArrowsIcon />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to=""
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <FavoriteBorderIcon />
                    <p className="mb-0">
                      Favourite <br /> Wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to={"/home/cart"}
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <ShoppingCartIcon />
                    {isLoggedIn === false ? (
                      <div className="d-flex flex-column">
                        <span className="badge bg-white text-dark">0</span>
                        <p className="mb-0">₹ 0</p>
                      </div>
                    ) : (
                      <div className="d-flex flex-column">
                        <span className="badge bg-white text-dark">{len}</span>
                        <p className="mb-0">₹ {cartItems.totalCost}</p>
                      </div>
                    )}
                  </Link>
                </div>
                {user !== null ? (
                  <div className="">
                    <p style={{ margin: "auto", color: "white" }}>
                      Welcome, <br />
                      {user}
                    </p>
                  </div>
                ) : (
                  <div className="">
                    <p style={{ margin: "auto", color: "white" }}></p>
                  </div>
                )}
                <div>
                  {/* <Link
                    to=""
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <AccountCircleIcon />
                    <p className="mb-0">
                      Login <br /> Account
                    </p>
                  </Link> */}
                  <Dropdown>
                    <Dropdown.Toggle
                      className="bg-dark border-0"
                      id="dropdown-basic"
                    >
                      <AccountCircleIcon />
                    </Dropdown.Toggle>

                    {isLoggedIn === true ? (
                      <Dropdown.Menu>
                        <Dropdown.Item href="#" onClick={logOut}>
                          Log Out
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    ) : (
                      <Dropdown.Menu>
                        <Dropdown.Item href="/">Sign In</Dropdown.Item>
                        <Dropdown.Item href="/register">Register</Dropdown.Item>
                      </Dropdown.Menu>
                    )}
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-15">
                <div>
                  <Dropdown>
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                      <SegmentIcon className="" />
                      <span className="px-3 d-inline-block">
                        Show Categories
                      </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="bg-black w-100">
                      {categories.map((category) => {
                        return (
                          <Dropdown.Item
                            href={"/home/store/" + category.id}
                            className="text-white"
                          >
                            {category.categoryName}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to={"/home"} className="px-2">
                      Home
                    </NavLink>
                    <NavLink to="/home/store" className="px-2">
                      Store
                    </NavLink>
                    <NavLink to="/home/contact" className="px-2">
                      Contact
                    </NavLink>
                    <NavLink to="/home/order" className="px-2">
                      Orders
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
