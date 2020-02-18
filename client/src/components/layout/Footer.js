import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/components/layout/Footer.scss";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-cta pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 offset-xl-1 col-md-4 offset-md-1 mb-30">
              <div className="single-cta">
                <i className="fas fa-map-marker-alt"></i>
                <div className="cta-text">
                  <h4>Find us</h4>
                  <span>gogeeks</span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-4 mb-30">
              <div className="single-cta">
                <i className="fas fa-phone"></i>
                <div className="cta-text">
                  <h4>Call us</h4>
                  <span>+91 9876543210</span>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-3 mb-30">
              <div className="single-cta">
                <i className="far fa-envelope-open"></i>
                <div className="cta-text">
                  <h4>Mail us</h4>
                  <span>gogeeks@info.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="footer-content pt-5 pb-5">
          <div className="row">
            <div className="col-xl-4 col-lg-4 mb-50">
              <div className="footer-widget">
                <div className="footer-logo">
                  <Link to="/" className="navbar-brand nav-link">
                    <img
                      src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/logo.svg"
                      alt=""
                    />
                  </Link>
                  <div className="footer-widget-heading">
                    <h3>About</h3>
                  </div>
                </div>
                <div className="footer-text">
                  <p>
                    Lorem ipsum dolor sit amet, consec tetur adipisicing elit,
                    sed do eiusmod tempor incididuntut consec tetur adipisicing
                    elit,Lorem ipsum dolor sit amet.
                  </p>
                </div>
                <div className="footer-social-icon">
                  <span>Follow us</span>
                  <a href="#">
                    <i className="fab fa-facebook-f facebook-bg"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter twitter-bg"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-google-plus-g google-bg"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Useful Links</h3>
                </div>
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">about</a>
                  </li>
                  <li>
                    <a href="#">services</a>
                  </li>
                  <li>
                    <a href="#">portfolio</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                  <li>
                    <a href="#">About us</a>
                  </li>
                  <li>
                    <a href="#">Our Services</a>
                  </li>
                  <li>
                    <a href="#">Expert Team</a>
                  </li>
                  <li>
                    <a href="#">Contact us</a>
                  </li>
                  <li>
                    <a href="#">Latest News</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
              <div className="footer-widget">
                <div className="footer-widget-heading">
                  <h3>Subscribe</h3>
                </div>
                <div className="subscribe-form">
                  <form action="#">
                    <input type="text" placeholder="Email Address" />
                    <button>
                      <i className="fab fa-telegram-plane"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
       */}
      </div>
      <section className="footer-social-section flex-rw">
        <span className="footer-social-overlap footer-social-icons-wrapper">
          <a
            href=""
            className="generic-anchor"
            target="_blank"
            rel="noopener noreferrer"
            title="Pinterest"
            itemProp="significantLink"
          >
            <i className="fab fa-pinterest"></i>
          </a>
          <a
            href=""
            className="generic-anchor"
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
            itemProp="significantLink"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href=""
            className="generic-anchor"
            target="_blank"
            title="Twitter"
            rel="noopener noreferrer"
            itemProp="significantLink"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href=""
            className="generic-anchor"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            itemProp="significantLink"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href=""
            className="generic-anchor"
            target="_blank"
            rel="noopener noreferrer"
            title="Youtube"
            itemProp="significantLink"
          >
            <i className="fab fa-youtube"></i>
          </a>
          <a
            href=""
            className="generic-anchor"
            target="_blank"
            rel="noopener noreferrer"
            title="Google Plus"
            itemProp="significantLink"
          >
            <i className="fab fa-google-plus"></i>
          </a>
        </span>
      </section>
      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-4 text-center text-lg-left">
              <div className="copyright-text">
                <p>
                  Copyright &copy; 2020 | All Right Reserved{" "}
                  <a href="https://github.com/verma-anushka">Anushka Verma</a>
                </p>
              </div>
            </div>
            <div className="col-xl-6 offset-xl-2 col-lg-6 offset-lg-2 d-none d-lg-block text-right">
              <div className="footer-menu">
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">Terms</a>
                  </li>
                  <li>
                    <a href="#">Privacy</a>
                  </li>
                  <li>
                    <a href="#">Policy</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
