import React from "react";


function Payment() {
    const handleToken = (token, addresses) => {
        console.log({ token, addresses });
        alert("Cannot recognize your payment info. Please enter correct data to proceed further.");
      }
  return (
    <>
    <div>
        <h4>Payment</h4>
        
    </div>
    </>
  );
}

export default Payment;
