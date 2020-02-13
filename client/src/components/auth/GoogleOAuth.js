import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { googleOAuth } from "../../store/actions/auth";
// import axios from "axios";

class GoogleOAuth extends Component {
  responseGoogle = response => {
    // console.log(response);
    // const user = {
    //   email: this.state.email
    // };

    this.props.googleOAuth({ idToken: response.tokenId }, this.props.history);
    // axios({
    //   method: "POST",
    //   url: `${process.env.REACT_APP_API}/google-login`,
    //   data: { idToken: response.tokenId }
    // })
    //   .then(response => {
    //     console.log("GOOGLE SIGNIN SUCCESS", response);
    //     // inform parent component
    //     informParent(response);
    //   })
    //   .catch(error => {
    //     console.log("GOOGLE SIGNIN ERROR", error.response);
    //   });
  };
  render() {
    return (
      <div className="pb-3">
        <GoogleLogin
          // clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
          clientId="442853635832-l520hhe92m6ofue2k1t5pbtt0m9ibpfq.apps.googleusercontent.com"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          render={renderProps => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="btn btn-danger btn-lg"
            >
              <i className="fab fa-google pr-2"></i> Login with Google
            </button>
          )}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    );
  }
}
// const Google = ({ informParent = f => f }) => {
//     const responseGoogle = response => {
//         console.log(response.tokenId);
//         axios({
//             method: 'POST',
//             url: `${process.env.REACT_APP_API}/google-login`,
//             data: { idToken: response.tokenId }
//         })
//             .then(response => {
//                 console.log('GOOGLE SIGNIN SUCCESS', response);
//                 // inform parent component
//                 informParent(response);
//             })
//             .catch(error => {
//                 console.log('GOOGLE SIGNIN ERROR', error.response);
//             });
//     };
//     return (
//         <div className="pb-3">
//             <GoogleLogin
//                 // clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
//                 clientId="442853635832-l520hhe92m6ofue2k1t5pbtt0m9ibpfq.apps.googleusercontent.com"
//                 onSuccess={responseGoogle}
//                 onFailure={responseGoogle}
//                 render={renderProps => (
//                     <button
//                         onClick={renderProps.onClick}
//                         disabled={renderProps.disabled}
//                         className="btn btn-danger btn-lg btn-block"
//                     >
//                         <i className="fab fa-google pr-2"></i> Login with Google
//                     </button>
//                 )}
//                 cookiePolicy={'single_host_origin'}
//             />
//         </div>
//     );
// };
GoogleOAuth.propTypes = {
  errors: PropTypes.object.isRequired,
  googleOAuth: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  // isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { googleOAuth })(
  withRouter(GoogleOAuth)
);
