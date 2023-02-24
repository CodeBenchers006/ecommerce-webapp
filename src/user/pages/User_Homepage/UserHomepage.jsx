import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./userhomepage.css";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import ProductCard from "../../components/ProductCard";
import Meta from "../../components/Meta";

const baseURL = "http://localhost:8081/";

function UserHomepage() {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);

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
      <Meta title="Budget Basket" />
      <section className="home-wrapper-1 py-5 ">
        <div className="container-xxl">
          <div className="row">
            <div className="col-lg-6 py-2">
              <div className="main-banner position-relative">
                <img
                  src="https://fdn.gsmarena.com/imgroot/news/22/07/iphone-14-pro-max-dummy-front/-1200/gsmarena_000.jpg"
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                <div className="main-banner-content position-absolute">
                  <h6>SUPERCHARGED FOR PROS</h6>
                  <h2>Special Sale</h2>
                  <h5>iPhone 14 Pro</h5>
                  <p>From Rs 145999</p>
                  <Link to="">BUY NOW</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 py-2">
              <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
                <div className="small-banner position-relative">
                  <img
                    src="https://static.13.cl/7/sites/default/files/smart13/articulos/field-imagen/macbookair.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h6>SUPERCHARGED FOR PROS</h6>
                    <h2>Special Sale</h2>
                    <h5>iPhone 14 Pro</h5>
                    <p>From Rs 145999</p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    src="https://static.13.cl/7/sites/default/files/smart13/articulos/field-imagen/macbookair.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h6>SUPERCHARGED FOR PROS</h6>
                    <h2>Special Sale</h2>
                    <h5>iPhone 14 Pro</h5>
                    <p>From Rs 145999</p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    src="https://static.13.cl/7/sites/default/files/smart13/articulos/field-imagen/macbookair.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h6>SUPERCHARGED FOR PROS</h6>
                    <h2>Special Sale</h2>
                    <h5>iPhone 14 Pro</h5>
                    <p>From Rs 145999</p>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <img
                    src="https://static.13.cl/7/sites/default/files/smart13/articulos/field-imagen/macbookair.jpg"
                    className="img-fluid rounded-3"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h6>SUPERCHARGED FOR PROS</h6>
                    <h2>Special Sale</h2>
                    <h5>iPhone 14 Pro</h5>
                    <p>From Rs 145999</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="services d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-10">
                  <LocalShippingOutlinedIcon />
                  <div>
                    <h6>Free Shipping</h6>
                    <p className="mb-0">From all orders above 499</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <CardGiftcardOutlinedIcon />
                  <div>
                    <h6>Daily Offers and Surprises</h6>
                    <p className="mb-0">Save upto 25% off</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <SupportAgentOutlinedIcon />
                  <div>
                    <h6>Support 24/7</h6>
                    <p className="mb-0">Shop with an expert</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <CurrencyRupeeOutlinedIcon />
                  <div>
                    <h6>Affordable Prices</h6>
                    <p className="mb-0">Best quality in affordable price</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <CreditScoreOutlinedIcon />
                  <div>
                    <h6>Secure Payments</h6>
                    <p className="mb-0">100% Protected Payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-wrapper-3 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="categories wrapper justify-content-center text-center">
                {categories?.map((category) => {
                  return (
                    <button className="btn">
                      <div className="gap-30 align-items-center item">
                        <div>
                          <h6>{category.categoryName}</h6>
                          <p>{category.products.length} Items</p>
                        </div>
                        <div>
                          <img
                            src={category.imageUrl}
                            alt=""
                            width={200}
                            className="p-0"
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-wrapper-4 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3 className="section-heading">Featured Collection </h3>
            </div>
            <div className="d-flex product-items  wrapper ">
              {product.map((prod) => {
                return (
                  <ProductCard
                    item={prod}
                    styles={{ width: "20rem", height: "35rem" }}
                    card_style={{ width: "28%" }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserHomepage;
