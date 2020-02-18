import React, { Component } from "react";
import "../../assets/styles/components/layout/HomePage.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class HomePage extends Component {
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };

  render() {
    return (
      <div style={{ height: "700px" }}>
        <div
          data-ride="carousel"
          className="carousel carousel-fade"
          id="carousel-example-captions"
        >
          <ol className="carousel-indicators">
            <li
              className="active"
              data-slide-to="0"
              data-target="#carousel-example-captions"
            ></li>
            <li
              data-slide-to="1"
              data-target="#carousel-example-captions"
              className=""
            ></li>
            <li
              data-slide-to="2"
              data-target="#carousel-example-captions"
              className=""
            ></li>
          </ol>
          <div role="listbox" className="carousel-inner">
            <div className="carousel-item active">
              <div className="carousel-caption">
                <h1>GO GEEKS</h1>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <div className="carousel-caption">
                <h3>The Geek Hub</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            <div className="carousel-item">
              <div className="carousel-caption">
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </div>
            </div>
          </div>
          <a
            data-slide="prev"
            role="button"
            href="#carousel-example-captions"
            className="left carousel-control-prev"
          >
            <span
              aria-hidden="true"
              className="carousel-control-prev-icon"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            data-slide="next"
            role="button"
            href="#carousel-example-captions"
            className="right carousel-control-next"
          >
            <span
              aria-hidden="true"
              className="carousel-control-next-icon"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>

        <div></div>
      </div>
    );
  }
}

HomePage.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { HomePage })(HomePage);
