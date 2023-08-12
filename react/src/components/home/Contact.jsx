import React from "react";
import { logo } from "../../assets";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileScreen } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';



const Contact = () =>
{

  return (
    <div className="container mt-3">
      <h1 className="text-center lead">Thanks for using our service!</h1>
      <h2 className="text-center lead">If you have any wondering, please contact us by the following methods</h2>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Email id: StreamTrace@gmail.com</li>
        <li className="list-group-item">Address: 590 CMT8 Street, District 3, HCMC </li>
        <li className="list-group-item">Contact Number:   <p className="m-3 mb-0  "><FontAwesomeIcon icon={faMobileScreen} className="mr-2" />+012321888</p>
          <p className="m-3 mb-0 m "><FontAwesomeIcon icon={faPhone} className="mr-2" />+1113</p></li>

      </ul>
      <footer className="blockquote-footer text-center mt-4"><cite title="Source Title">Best Regards!</cite></footer>
    </div>
  );
};

export default Contact;
