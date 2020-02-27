// import React, { Component } from "react";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import classnames from "classnames";
// // import Header from "./Header";
// // import About from "./About";
// // import Credentials from "./Credentials";
// // import GithubProjects from "./projects/github/ProjectList";
// // import MediumPosts from "./projects/medium/PostList";
// // import Spinner from "../../Spinner";
// import { getProfileByHandle } from "../../store/actions/profile";
// import "../../assets/styles/components/layout/CurrentUser.scss";

// class CurrentUser extends Component {
//   state = {
//     show: false
//   };
//   //   componentDidMount() {
//   //     if (this.props.match.params.handle) {
//   //       this.props.getProfileByHandle(this.props.match.params.handle);
//   //     }
//   //   }

//   //   componentWillReceiveProps(nextProps) {
//   //     if (nextProps.profile.profile === null && this.props.profile.loading) {
//   //       this.props.history.push("/profiles");
//   //     }
//   //   }

//   render() {
//     const { profile, loading } = this.props.profile;
//     let content;
//     console.log(profile);

//     // if (profile === null || loading) {
//     //   content = <div></div>;
//     // } else {
//     content = (
//       <div className="main-container">
//         <div
//           className={classnames("left-sidebar", {
//             minimize: !this.state.show
//           })}
//         >
//           <div className="inner">
//             <div className="user-profile">
//               <div className="user-background"></div>
//               <div className="user-image">
//                 <img src="https://gravatar.com/avatar/de84db04b0c7b43efdc840391ffe56ff" />
//               </div>
//               <div className="user-info">
//                 <p className="user-name">Daniela Desira</p>
//                 <p className="user-title">Front End Developer</p>
//                 <p className="user-location">
//                   <i className="icon ion-md-locate"></i> Malta
//                 </p>
//               </div>
//             </div>
//             <div className="main-menu"></div>
//             <div className="social-links">
//               <a href="#">
//                 <i className="icon ion-logo-facebook"></i>
//               </a>
//               <a href="#">
//                 <i className="icon ion-logo-twitter"></i>
//               </a>
//               <a href="#">
//                 <i className="icon ion-logo-instagram"></i>
//               </a>
//             </div>
//           </div>
//           <button
//             type="button"
//             onClick={() => {
//               // Toggle feature
//               this.setState(prevState => ({
//                 show: !prevState.show
//               }));
//             }}
//             className="toggle-button"
//           >
//             <i className="icon ion-md-arrow-dropleft"></i>
//           </button>
//         </div>
//         <div className="main-content"></div>
//       </div>
//     );
//     // }

//     return <div>{content}</div>;
//   }
// }

// CurrentUser.propTypes = {
//   getProfileByHandle: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired
// };

// const mapStateToProps = state => {
//   return {
//     profile: state.profile
//   };
// };

// export default connect(mapStateToProps, { getProfileByHandle })(CurrentUser);
