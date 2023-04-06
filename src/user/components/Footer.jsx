import React from "react";
import "../pages/User_Homepage/userhomepage.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer className="py-3 d-flex justify-content-center">
        <button className="btn text-white" onClick={scrollToTop}>
          Back to Top
        </button>
      </footer>
      <footer className="py-3">
        <div className="container-xxl">
          <div className="row d-flex">
            <div className="col-4 text-white text-center">
              <h5>Get to Know Us</h5>
              <span>About us</span>
              <br />
              <span>Careers</span>
              <br />
              <span>Press Releases</span>
            </div>
            <div className="col-4 text-white text-center">
              <h5>Connect with Us</h5>
              <span>LinkedIn</span>
              <br />
              <span>Facebook</span>
              <br />
              <span>Instagram</span>
            </div>
            <div className="col-4 text-white text-center">
              <h5>Learn Full Stack Development</h5>
              <span>Backend Development</span>
              <br />
              <span>Frontend Development</span>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 d-flex justify-content-center mb-4 gap-30">
              <InstagramIcon style={{ color: "white" }} />
              <FacebookIcon style={{ color: "white" }} />
              <TwitterIcon style={{ color: "white" }} />
              <LinkedInIcon style={{ color: "white" }} />
            </div>
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}. Powered by CodeBenchers006
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
