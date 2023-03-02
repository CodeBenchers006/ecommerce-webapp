import React, { useEffect, useState } from "react";
import Meta from "../../../components/Meta";
import "../checkout.css";
import { Link, NavLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import data from "../countries.json";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";

function PaymentFailed() {
  const token = localStorage.getItem("user_token");

  const current = new Date();
  const currentdate = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const delivereddate = `${current.getDate() + 5}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const navigate = useNavigate();

  

  return (
    <>
      <Meta title="Payment"></Meta>
      <div className="checkout-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12  px-4">
              <div className="checkout-left-data">
                <h3 className="website-order-failed">
                  <CancelIcon fontSize="large" /> Payment Failed
                </h3>

                <div className="w-100">
                  <div className="justify-content-between align-items-center border p-4 mb-5">
                    <div className="d-flex justify-content-between border-bottom w-100">
                      <p>
                        <span
                          style={{
                            color: "orange",
                            fontSize: "25px",
                            fontWeight: "600",
                          }}
                        >
                          Hello,
                        </span>{" "}
                        <br />
                        Unfortunately, the payment for this order has failed.{" "}
                        <br />
                        An issuing bank will often decline an attempt to charge
                        a card if the name, expiry date, or post code you
                        entered doesn't match the bank's information. <br />
                        <br />
                        In order to proceed with your order and avoid
                        cancellation, we kindly ask you to change your payment
                        method to credit card within 5 days.* Please note that
                        BudgetBasket, in order to be able to ship orders as
                        quickly as possible, does generally not accept advance
                        payment methods.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center border-bottom pb-4">
                    <NavLink to="/home/checkout/payment" className="text-dark">
                      <ArrowBackIcon className="me-2" />
                      Update Payment Method
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

export default PaymentFailed;
