import React, { Component } from "react";
import Moment from "react-moment";

class Credentials extends Component {
  render() {
    const { experience, education } = this.props;
    const expItems = experience.map(exp => (
      <li key={exp._id} className="list-group-item">
        <div className="row">
          <div className="col-md-6">
            <h4>{exp.organization}</h4>
          </div>
          <div className="offset-md-3 col-md-3">
            <p className="text-muted">
              <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
              {exp.to === null ? (
                " Present"
              ) : (
                <Moment format="YYYY/MM/DD">{exp.to}</Moment>
              )}
            </p>
          </div>

          <div className="col-md-6">
            <p>
              <strong>Position:</strong> {exp.title}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              {exp.location === "" ? null : (
                <span>
                  <strong>Location: </strong> {exp.location}
                </span>
              )}
            </p>
          </div>
          <div className="col-md-12">
            <p>
              {exp.description === "" ? null : (
                <span>
                  <strong>Description: </strong> {exp.description}
                </span>
              )}
            </p>
          </div>
        </div>
      </li>
    ));

    const eduItems = education.map(edu => (
      <li key={edu._id} className="list-group-item">
        <div className="row">
          <div className="col-md-6">
            <h4>{edu.name}</h4>
          </div>
          <div className="offset-md-3 col-md-3">
            <p className="text-muted">
              <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
              {edu.to === null ? (
                " Present"
              ) : (
                <Moment format="YYYY/MM/DD">{edu.to}</Moment>
              )}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Degree:</strong> {edu.degree}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Field Of Study:</strong> {edu.fieldOfStudy}
            </p>
          </div>
          <div className="col-md-12">
            <p>
              {edu.description === "" ? null : (
                <span>
                  <strong>Description: </strong> {edu.description}
                </span>
              )}
            </p>
          </div>
        </div>
      </li>
    ));

    return (
      <div className="credentials">
        <div className="row">
          <div className="offset-md-1 col-md-10">
            <h3 className="text-center">Experience</h3>
            {expItems.length > 0 ? (
              <ul className="list-group">{expItems}</ul>
            ) : (
              <p className="text-center">No Experience Listed</p>
            )}
          </div>
        </div>

        <div className="row">
          <div className="offset-md-1 col-md-10">
            <h3 className="text-center">Education</h3>
            {eduItems.length > 0 ? (
              <ul className="list-group">{eduItems}</ul>
            ) : (
              <p className="text-center">No Education Listed</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Credentials;
