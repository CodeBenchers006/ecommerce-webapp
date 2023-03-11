import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./singlepage.css";
import ReactStars from "react-rating-stars-component";
import { Image } from "antd";
import Accordion from "react-bootstrap/Accordion";
import Swal from "sweetalert2";
import axios from "axios";

function SingleProduct() {
  const { product_id } = useParams();

  const token = localStorage.getItem("user_token");

  var isLoggedIn = false;
  if (token !== "null") {
    isLoggedIn = true;
  }
  if (token === null || token === "") {
    isLoggedIn = false;
  }
  // console.log(token);
  // console.log(isLoggedIn);

  const baseURL = "http://localhost:8081/";

  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [order, setOrder] = useState("");

  const navigate = useNavigate();

  const [orderedProduct, setOrderedProduct] = useState(false);
  const [Inventory, setInventory] = useState("");

  useEffect(() => {
    fetch(baseURL + "order/listAll?token=" + token)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setOrder(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  let decision = false;

  for (let i = 0; i < order.length; i++) {
    let orderItem = order[i];
    //console.log(orderItem)
    for (let j = 0; j < orderItem.orderItems.length; j++) {
      let item = orderItem.orderItems[j];
      let p = item.product.product_id.toString();
      if (p === product_id) {
        // console.log(true)
        decision = true;
        break;
      }
    }
  }

  useEffect(() => {
    if (decision === true) {
      setOrderedProduct(decision);
    }
  });

  //console.log(orderedProduct)

  useEffect(() => {
    fetch(baseURL + "product/" + product_id)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setProduct(data);

        fetch(baseURL + "category/" + data.categoryId)
          .then((res) => res.json())
          .then((cat) => {
            //    console.log(cat);
            setCategory(cat);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .then(
        fetch(baseURL + "inventory/getByProduct/" + product_id)
          .then((res) => res.json())
          .then((data) => {
            //console.log(data);
            setInventory(data);
          })
          .catch((err) => {
            console.log(err);
          })
      )

      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const loginFailed = (message) => {
    Swal.fire({
      text: message,
      icon: "error",
      confirmButtonText: "Ok",
    });
    navigate("/");
  };

  const addToCart = async () => {
    const data = {
      productId: product_id,
      quantity: quantity,
    };

    if (token == null) {
      console.log("Login to Order");
      loginFailed("Please Login First");
    } else {
      console.log("valid user");
      Swal.fire({
        text: "Added to Cart",
        icon: "success",
        timer: 2000,
      });

      try {
        //console.log(data);
        const res = await axios.post(
          baseURL + "cart/add?token=" + token,
          data,
          {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          { mode: "cors" }
        );
        // console.log(res);
        // window.alert("aded to cart");
        refreshHeader();
      } catch (err) {}
    }
  };

  const buyNow = async () => {
    const data = {
      productId: product_id,
      quantity: quantity,
    };

    if (token == null) {
      console.log("Login to Order");
      loginFailed("Please Login First");
    } else {
      //console.log("valid user");

      try {
        //console.log(data);
        const res = await axios.post(
          baseURL + "cart/add?token=" + token,
          data,
          {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
          { mode: "cors" }
        );
        // console.log(res);
        // window.alert("aded to cart");

        navigate("/home/cart");

        refreshHeader();
      } catch (err) {}
    }
  };

  const refreshHeader = () => {
    window.location.reload(false);
  };

  //console.log(quantity);

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
                    {Inventory.totalItems >= 1 ? (
                      <p className="product-data">
                        In Stock {"(" + Inventory.totalItems + ")"}
                      </p>
                    ) : (
                      <p className="product-data">Out of Stock</p>
                    )}
                  </div>
                  <div className="d-flex gap-10 flex-row  mt-2 mb-3">
                    <h3 className="product-heading mt-2">Quantity :</h3>
                    <div>
                      <input
                        className="form-control"
                        type="number"
                        name=""
                        min={1}
                        max={Inventory.totalItems}
                        value={quantity}
                        id=""
                        style={{ width: "70px" }}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                  </div>
                  {Inventory.totalItems >= 1 &&
                  quantity <= Inventory.totalItems &&
                  quantity !== null ? (
                    <div className="d-flex gap-10 align-items-center  mt-2 mb-3">
                      <button
                        className="btn border-0 addcart"
                        onClick={addToCart}
                      >
                        Add to Cart
                      </button>
                      <button className="btn border-0 buynow" onClick={buyNow}>
                        Buy Now
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex gap-10 align-items-center  mt-2 mb-3">
                      <button
                        className="btn border-0 addcart btn-danger"
                        disabled
                      >
                        Add to Cart
                      </button>
                      <button
                        className="btn border-0 buynow btn-danger"
                        disabled
                      >
                        Buy Now
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <strong>Shipping & Returns</strong>
                      </Accordion.Header>
                      <Accordion.Body>
                        Free shipping and returns available on all orders above
                        INR 499. <br />
                        We ship all orders within{" "}
                        <strong>5-10 business days!</strong>
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
                {isLoggedIn ? (
                  orderedProduct ? (
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
                  ) : (
                    <p></p>
                  )
                ) : (
                  <div className="mt-2 ">
                    <h5
                      style={{
                        backgroundColor: "red",
                        padding: "10px",
                        textAlign: "center",
                        color: "white",
                      }}
                    >
                      Login to Review
                    </h5>
                    <div
                      className="review-form py-4"
                      style={{ opacity: "0.3", pointerEvents: "none" }}
                    >
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
                  </div>
                )}
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
