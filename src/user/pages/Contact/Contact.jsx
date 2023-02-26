import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import "../User_Homepage/userhomepage.css";

function Contact() {
  return (
    <>
      <Meta title="Contact"></Meta>
      <BreadCrumb title="Contact" />
      <div className="contact-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1268.797493753177!2d93.71894304786431!3d25.912189880044743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3745e1923d8af635%3A0xf61c43f17ccc7ea2!2sHariram%20Balram%20Building!5e0!3m2!1sen!2sin!4v1677068217408!5m2!1sen!2sin"
                width="600"
                height="450"
                className="border-0 w-100"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-12 mt-5">
                <div className="contact-inner-wrapper d-flex justify-content-between ">
                    <div>
                        <h3 className="conact-title mb-4">Contact </h3>
                        <form action="" className="d-flex flex-column gap-15">
                            <div>
                                <input type="text" className="form-control" placeholder="Name" />
                            </div>
                            <div>
                                <input type="text" className="form-control" placeholder="Email" />
                            </div>
                            <div>
                                <input type="text" className="form-control" placeholder="Mobile" />
                            </div>
                            <div>
                                <button className="btn border-0 btn-primary">Submit</button>
                            </div>

                        </form>
                    </div>
                    
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
