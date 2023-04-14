import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../pages/User_Homepage/userhomepage.css";

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
import { useSelector } from "react-redux";

const baseURL = "http://localhost:8081/";

function Header() {
 
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();


  const user = localStorage.getItem("user_name");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const CartItems = useSelector((state) => state.auth.cartItems);
  // console.log(CartItems);

  // console.log(isAuthenticated);


  //const cartItem = cartItems && cartItems.cartItemDtoList;
  const len = CartItems?.length;

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
      <header className="header-upper sticky-top">
        <Navbar collapseOnSelect expand="lg" variant="dark">
          <Container fluid="xxl">
            <Navbar.Brand href="/home" style={{ width: "50%" }}>
              BudgetBasket
            </Navbar.Brand>
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
                <NavLink
                  to="/home/cart"
                  className="d-flex align-items-center nav-link"
                  style={{ width: "100%", paddingLeft: "30px" }}
                >
                  <ShoppingCartIcon className="mx-3" />
                  {!isAuthenticated ? (
                    <div className="d-flex flex-column">
                      <span className="badge bg-white text-dark">0</span>
                      <p className="mb-0">₹ 0</p>
                    </div>
                  ) : (
                    <div className="d-flex flex-column">
                      <span className="badge bg-white text-dark">{len}</span>
                    </div>
                  )}
                </NavLink>
                <Nav.Item
                  href="#features"
                  className="d-flex align-items-center mx-4"
                  style={{ width: "100%", paddingLeft: "30px" }}
                >
                  {isAuthenticated && user !== null ? (
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
                  className="mt-2"
                  style={{ width: "100%", paddingLeft: "30px" }}
                >
                  {isAuthenticated ? (
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
      <header className="header-bottom py-3  ">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-15">
                <div style={{ width: "100%" }}>
                  <Dropdown>
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                      <SegmentIcon className="" />
                      <span
                        className="px-3 d-inline-block"
                        style={{ width: "100%" }}
                      >
                        Show Categories
                      </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="bg-black ">
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
                    <NavLink to="/home/order" className="px-2">
                      Orders
                    </NavLink>
                    <NavLink to="/home/contact" className="px-2">
                      Contact
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
