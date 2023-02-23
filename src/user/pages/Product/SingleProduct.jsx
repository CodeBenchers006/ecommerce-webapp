import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./singlepage.css";
import ReactStars from "react-rating-stars-component";
import { Image } from "antd";
import Accordion from "react-bootstrap/Accordion";

function SingleProduct() {
  const { product_id } = useParams();
  

  const baseURL = "http://localhost:8081/";

  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const [orderedProduct, setOrderedProduct] = useState(true);

  useEffect(() => {
    fetch(baseURL + "product/" + product_id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProduct(data);

        fetch(baseURL + "category/" + data.categoryId)
          .then((res) => res.json())
          .then((cat) => {
            console.log(cat);
            setCategory(cat);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })

      .catch((err) => {
        console.log(err.message);
      });
  }, [product_id]);

  return (
    <>
      <Meta title={product.name} />
      <BreadCrumb title={product.name} />
      <div className="main-product-wrapper py-5 home-wrapper-2" id="#">
        <div className="container-xxl">
          <div className="row">
            <div className="col-lg-6 col-sm-12 col-md-6">
              <div className="main-product-image">
                <div>
                  <Image src={product.imageUrl} />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 col-md-6">
              <div className="main-product-details">
                <div className="border-bottom">
                  <h3 className="title">{product.name}</h3>
                </div>
                <div className="border-bottom py-3">
                  <p className="price">₹ {product.price}</p>
                  <div>
                    <a href="#review">Write a Review</a>
                  </div>
                </div>
                <div className="border-bottom py-3">
                  <div className="d-flex gap-10 align-items-center mt-2 mb-3">
                    <h3 className="product-heading">Category :</h3>
                    <p className="product-data">{category.categoryName}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center  mt-2 mb-3">
                    <h3 className="product-heading">Availability :</h3>
                    <p className="product-data">In Stock</p>
                  </div>
                  <div className="d-flex gap-10 flex-row  mt-2 mb-3">
                    <h3 className="product-heading mt-2">Quantity :</h3>
                    <div>
                      <input
                        className="form-control"
                        type="number"
                        name=""
                        min={1}
                        max={10}
                        defaultValue={1}
                        id=""
                        style={{ width: "70px" }}
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-10 align-items-center  mt-2 mb-3">
                    <button className="btn border-0 addcart">
                      Add to Cart
                    </button>
                    <button className="btn border-0 buynow">Buy Now</button>
                  </div>
                </div>
                <div>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header><strong>Shipping & Returns</strong></Accordion.Header>
                      <Accordion.Body>
                        Free shipping and returns available on all orders above INR 499. <br />
                        We ship all orders within <strong>5-10 business days!</strong>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="description-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h4>Description</h4>
              <div className="bg-white p-3">
                <p>{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="review" className="reviews-wrapper pb-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <h3>Reviews</h3>
              <div className="review-inner-wrapper">
                <div className="review-head d-flex justify-content-between align-items-end">
                  <div>
                    <h4 className="mb-2">Customer Reviews</h4>
                    <div className="d-flex gap-10 align-items-center">
                      <ReactStars
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                        isHalf={true}
                        value={4}
                        edit={false}
                      />
                      <p className="mb-0">Based on 2 reviews</p>
                    </div>
                  </div>
                  <div>
                    {orderedProduct && (
                      <div>
                        <a className="text-decoration-underline" href="">
                          Write a Review
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <div className="review-form py-4">
                  <h5>Write a Review</h5>
                  <form action="" className="d-flex flex-column gap-15">
                    <div>
                      <label htmlFor="" className="py-1">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>

                    <div>
                      <label htmlFor="" className="py-1">
                        Email
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="py-1">
                        Mobile
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Mobile"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="py-1">
                        Rating
                      </label>
                      <ReactStars
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                        isHalf={true}
                        value={0}
                        edit={true}
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="py-1">
                        Comment
                      </label>
                      <textarea
                        type="text"
                        className="form-control w-100"
                        placeholder="Comment"
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="btn border-0 btn-primary">
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
                <div className="reviews mt-3">
                  <div className="review">
                    <div className="d-flex gap-10 align-items-center">
                      <h6 className="mb-0">CodeBenchers006</h6>
                      <ReactStars
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                        isHalf={true}
                        value={4}
                        edit={false}
                      />
                    </div>
                    <p className="mt-3">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatum, soluta nulla. Dolore nemo aspernatur, rem
                      numquam voluptate, accusamus possimus animi ab facere a
                      ipsa officiis molestias, pariatur dolorem dicta quisquam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SingleProduct;
