import Meta from "../../../components/Meta";
import "../checkout.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PaymentSuccess() {
  // const token = localStorage.getItem("user_token");
  // const sessionId = localStorage.getItem("sessionId");

  const current = new Date();
  const currentdate = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const delivereddate = `${current.getDate() + 5}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const baseURL = "http://localhost:8081/";

  const token = localStorage.getItem("user_token");
  const user = localStorage.getItem("user_name");

  const sessionId = localStorage.getItem("sessionId");
  const navigate = useNavigate();
  const [userAddress, setUserAddress] = useState("");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      Swal.fire({
        text: "Login to Continue",
        icon: "error",
        confirmButtonText: "Ok",
      });
      navigate("/");
    }
  });

  useEffect(() => {
    fetch(baseURL + "user/showUserAddress?token=" + token)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setUserAddress(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const createorder = () => {
    if (sessionId !== null) {
      axios
        .post(baseURL + "order/add?token=" + token + "&sessionId=" + sessionId)
        .then((response) => {
          console.log(response);
          localStorage.removeItem("sessionId");
          window.location.reload(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Session id is null");
    }
  };

  useEffect(() => {
    createorder();
  }, []);

  return (
    <>
      <Meta title="Payment"></Meta>
      <div className="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12  px-4">
              <div className="checkout-left-data">
                <h3 className="website-order">
                  <CheckCircleIcon fontSize="large" /> Order placed, thank you!
                </h3>

                <div className="w-100">
                  <div className="justify-content-between align-items-center border p-4 mb-5">
                    <div className="d-flex justify-content-between border-bottom w-100">
                      <div className="total-price">
                        Confirmation will be sent to your email
                      </div>
                      <div>
                        <p className="total">
                          {userAddress && userAddress.user.email}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between w-100 mt-4 border-bottom">
                      <div className="total-price">
                        <strong>Shipping To</strong>
                      </div>
                      <div>
                        <p className="total">
                          {user}, <br />
                          {userAddress.address}, {userAddress.city},{" "}
                          {userAddress.state}, {userAddress.country},
                          {userAddress.pin} <br />
                          {userAddress.contact}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between w-100 mt-4">
                      <div className="total-price">
                        <strong>Estimate Delivery Date</strong>
                      </div>
                      <div>
                        <p className="total">
                          <strong>
                            {currentdate} - {delivereddate}
                          </strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center border-bottom pb-4">
                    <NavLink to="/home/order" className="text-dark">
                      <ArrowBackIcon className="me-2" />
                      Return to view your recent Order
                    </NavLink>
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

export default PaymentSuccess;
