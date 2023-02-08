import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
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
  useEffect(() => {
    fetch(baseURL + "category/list")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCategories(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

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
                <Link to="" className="text-white">
                  BudgetBasket.
                </Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group ">
                <input
                  class="form-control me-2"
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
                    to=""
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <ShoppingCartIcon />
                    <div className="d-flex flex-column">
                      <span className="badge bg-white text-dark">0</span>
                      <p className="mb-0">Rs. 15444</p>
                    </div>
                  </Link>
                </div>
                <div>
                  <Link
                    to=""
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <AccountCircleIcon />
                    <p className="mb-0">
                      Login <br /> Account
                    </p>
                  </Link>
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
                            href={"/"+category.categoryName}
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
                    <NavLink to="" className="px-2">
                      Home
                    </NavLink>
                    <NavLink to="" className="px-2">
                      Product
                    </NavLink>
                    <NavLink to="" className="px-2">
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
