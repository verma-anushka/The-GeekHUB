import React, { Component } from "react";
import "../../assets/styles/components/layout/HomePage.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import GroupsFolder from "../../assets/images/groups-folders.png";

class HomePage extends Component {
  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  };

  render() {
    return (
      <div>
        <div style={{ height: "680px" }}>
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
                <div className="carousel-caption carousel-caption-1">
                  <h1 style={{ color: "#222" }}>THE GEEKHUB</h1>
                  <p style={{ color: "#222" }}>
                    Welcome to The GeekHub! Meet your fellow geeks.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <div className="carousel-caption carousel-caption-2">
                  <h1 style={{ color: "#222" }}>THE GEEKHUB</h1>
                  <p style={{ color: "#222" }}>
                    SignUp now and find you fellow geeks.
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <div className="carousel-caption carousel-caption-3">
                  <h1 style={{ color: "#222" }}>THE GEEKHUB</h1>
                  <p style={{ color: "#222" }}>
                    Showcase your skills and talents to potential employers.
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
        </div>
        <div className="line-wrap">
          <div className="account-ring-wrap orbit-animation ring-animation">
            <div className="account-ring-inner">
              <div className="account-ring big-ring bounceInLarge">
                <span className="animation-account-icon animation-image-readonly">
                  <img
                    alt=""
                    src="https://d672eyudr6aq1.cloudfront.net/img/sprout-social-marketing-site/agency/icon-permissions-read-only.svg"
                    className="animation-image-readonly-img"
                  />
                </span>

                <span className="animation-account-icon animation-image-readonly2">
                  <img
                    alt=""
                    src="https://d672eyudr6aq1.cloudfront.net/img/sprout-social-marketing-site/agency/icon-permissions-read-only.svg"
                    className="animation-image-readonly2-img"
                  />
                </span>

                <span className="animation-account-icon animation-image-noaccess">
                  <img
                    alt=""
                    src="https://d672eyudr6aq1.cloudfront.net/img/sprout-social-marketing-site/agency/icon-permissions-no-access.svg"
                    className="animation-image-noaccess-img"
                  />
                </span>

                <span className="animation-account-icon animation-image-noaccess2">
                  <img
                    alt=""
                    src="https://d672eyudr6aq1.cloudfront.net/img/sprout-social-marketing-site/agency/icon-permissions-no-access.svg"
                    className="animation-image-noaccess2-img"
                  />
                </span>
              </div>

              <div className="account-ring middle-ring bounceInMedium">
                <span className="animation-account-icon animation-image-manager">
                  <img
                    alt=""
                    src="https://d672eyudr6aq1.cloudfront.net/img/sprout-social-marketing-site/agency/icon-permissions-manager.svg"
                    className="animation-image-manager-img"
                  />
                </span>

                <span className="animation-account-icon animation-image-manager2">
                  <img
                    alt=""
                    src="https://d672eyudr6aq1.cloudfront.net/img/sprout-social-marketing-site/agency/icon-permissions-manager.svg"
                    className="animation-image-manager2-img"
                  />
                </span>

                <span className="animation-account-icon animation-image-manager3">
                  <img
                    alt=""
                    src="https://d672eyudr6aq1.cloudfront.net/img/sprout-social-marketing-site/agency/icon-permissions-manager.svg"
                    className="animation-image-manager3-img"
                  />
                </span>
              </div>

              <div className="account-ring small-ring bounceInSmall  ">
                <span className="animation-account-icon animation-image-admin">
                  <img
                    alt=""
                    src="https://d672eyudr6aq1.cloudfront.net/img/sprout-social-marketing-site/agency/icon-permissions-admin.svg"
                    className="animation-image-admin-img"
                  />
                </span>

                <span className="animation-account-icon animation-image-admin2">
                  <img
                    alt=""
                    src="https://d672eyudr6aq1.cloudfront.net/img/sprout-social-marketing-site/agency/icon-permissions-admin.svg"
                    className="animation-image-admin2-img"
                  />
                </span>
              </div>
            </div>
            <img
              alt=""
              src={GroupsFolder}
              // src="https://d672eyudr6aq1.cloudfront.net/img/sprout-social-marketing-site/agency/groups-folders.png"
              className="folder-img"
            />
          </div>
        </div>
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
