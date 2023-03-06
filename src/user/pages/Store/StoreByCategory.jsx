import React, { useEffect, useState } from "react";
import ShortTextOutlinedIcon from "@mui/icons-material/ShortTextOutlined";
import DensitySmallIcon from "@mui/icons-material/DensitySmall";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ProductCard from "../../components/ProductCard";
import { useParams } from "react-router-dom";
import "./Store.css";

function StoreByCategory(props) {
  const [product, setProduct] = useState([]);

  const baseURL = "http://localhost:8081/";

  const [grid, setGrid] = useState(4);

  const id = props.cat;
  var status = typeof id;

  const loadAllProducts = () => {
    fetch(baseURL + "product/listAll")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const loadProduct = () => {
    fetch(baseURL + "product/category/" + id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    if (status === "undefined") {
      loadAllProducts();
    } else {
      loadProduct();
    }
  }, []);

  return (
    <>
      <div className="col-9">
        <div className="filter-sort-grid">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-10">
              <p className="mb-0 d-block">Sort By:</p>
              <select name="" id="" className="form-control form-select">
                <option value="manual">Featured</option>
                <option value="best-selling">Best Selling</option>
                <option value="price-ascending">Price, low to high</option>
                <option value="price-descending">Price, high to low</option>
              </select>
            </div>
            <div className="d-flex align-items-center gap-10">
              <p className="totalproducts mb-0">{product.length} products</p>
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
        <div className="product-list pb-5 my-2 wrapper">
          <div className="d-flex flex-wrap gap-10">
            <div className="row">
              {product &&
                product.map((prod) => {
                  return (
                    <ProductCard
                      grid={grid}
                      item={prod}
                      styles={{ height: "100%" }}
                      card_style={{ marginBottom: "15px" }}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StoreByCategory;
