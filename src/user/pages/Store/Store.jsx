import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import "./Store.css";
import { NavLink } from "react-router-dom";
import ShortTextOutlinedIcon from "@mui/icons-material/ShortTextOutlined";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ProductCard from "../../components/ProductCard";

const baseURL = "http://localhost:8081/";

function Store() {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);

  const [grid, setGrid] = useState(4);

 

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
                <h3 className="filter-title">Shop By Categories</h3>
                <div>
                  <ul className="ps-0">
                    {categories.map((category) => {
                      return (
                        <li>
                          <NavLink to={"/home/store/" + category.categoryName}>
                            {category.categoryName}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
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
            <div className="col-9">
              <div className="filter-sort-grid">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-10">
                    <p className="mb-0 d-block">Sort By:</p>
                    <select name="" id="" className="form-control form-select">
                      <option value="manual">Featured</option>
                      <option value="best-selling">Best Selling</option>
                      <option value="price-ascending">
                        Price, low to high
                      </option>
                      <option value="price-descending">
                        Price, high to low
                      </option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center gap-10">
                    <p className="totalproducts mb-0">
                      {product.length} products
                    </p>
                    <div className="d-flex align-items-center  grid">
                      <button
                        className="btn p-0"
                        onClick={() => {
                          setGrid(4);
                        }}
                      >
                        <DensitySmallIcon className="icon mx-2" />
                      </button>
                      <button
                        className="btn p-0"
                        onClick={() => {
                          setGrid(6);
                        }}
                      >
                        <ShortTextOutlinedIcon className="icon mx-2" />
                      </button>
                      <button
                        className="btn p-0"
                        onClick={() => {
                          setGrid(12);
                        }}
                      >
                        <ListAltOutlinedIcon className="icon mx-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-list pb-5 my-2">
                <div className="d-flex flex-wrap gap-10">
                <div className="row">
                {product.map((prod=>{
                  return(
                    <ProductCard grid={grid} item={prod} />
                  )
                }))}
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Store;
