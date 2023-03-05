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
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
      <header className="header-upper ">
        <Navbar collapseOnSelect expand="lg" variant="dark">
          <Container fluid="xxl">
            <Navbar.Brand href="/home" style={{width:"50%"}}>BudgetBasket</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="">
                <Nav.Link
                  href="#features"
                  className="d-flex align-items-center "
                  style={{ width: "100%", paddingLeft: "30px" }}
                >
                  <CompareArrowsIcon className="mx-3" />
                  <p className="mb-0">
                    Compare <br /> Products
                  </p>
                </Nav.Link>
                <Nav.Link
                  href="#features"
                  className="d-flex align-items-center"
                  style={{ width: "100%", paddingLeft: "30px" }}
                >
                  <FavoriteBorderIcon className="mx-3" />
                  <p className="mb-0">
                    Favourite <br /> Wishlist
                  </p>
                </Nav.Link>
                <Nav.Link
                  href="/home/cart"
                  className="d-flex align-items-center" style={{width:"100%",paddingLeft:"30px"}}
                >
                  <ShoppingCartIcon className="mx-3" />
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
                </Nav.Link>
                <Nav.Item
                  href="#features"
                  className="d-flex align-items-center mx-4" style={{width:"100%",paddingLeft:"30px"}}
                >
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
                </Nav.Item>

                <NavDropdown
                  title={<AccountCircleIcon />}
                  id="collasible-nav-dropdown"
                  className="mt-2" style={{width:"100%",paddingLeft:"30px"}}
                >
                  {isLoggedIn === true ? (
                    <NavDropdown.Item href="/" onClick={logOut}>
                      Logout
                    </NavDropdown.Item>
                  ) : (
                    <>
                      <NavDropdown.Item href="/">Sign In</NavDropdown.Item>
                      <NavDropdown.Item href="/register">
                        Register
                      </NavDropdown.Item>
                    </>
                  )}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
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
