import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import "./Store.css";
import { NavLink, Link, useParams } from "react-router-dom";
import StoreByCategory from "./StoreByCategory";
import { useSelector } from "react-redux";



const baseURL = "http://localhost:8081/";

function Store() {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);


  const token = localStorage.getItem("user_token");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  

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

  useEffect(() => {
    fetch(baseURL + "product/listAll")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);


  

  return (
    <>
      <Meta title="Our Store"></Meta>
      <BreadCrumb title="Our Store" />
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <div className="filter-card mb-3">
                <h3 className="filter-title">Showing All Products</h3>
              </div>
              <div className="filter-card mb-3">
                <h3 className="filter-title">Filter By</h3>
                <div>
                  <h5 className="sub-title">Availability</h5>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                      checked
                    />
                    <label class="form-check-label" for="">
                      In Stock ({product.length})
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                    <label class="form-check-label" for="">
                      Out of Stock (0)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <StoreByCategory />
          </div>
        </div>
      </div>
    </>
  );
}

export default Store;
