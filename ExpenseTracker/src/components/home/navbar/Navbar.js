import React, { useEffect, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useGlobal } from "../../context/Context";
import Logo from "../logo/Logo";

const Navbar = () => {
  const { setSignIn } = useGlobal();
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
  });
  return (
    <nav className={`nav ${show && "nav_bg"}`}>
      <Logo show={show} />
      <ul>
        <li>
          <Link
            to="/signin"
            onClick={() => setSignIn(true)}
            style={{ color: `${show ? "white" : "#333"}` }}
          >
            Log in
          </Link>
        </li>
        <li>
          {" "}
          <Link
            to="/signin"
            onClick={() => setSignIn(false)}
            style={{ color: `${show ? "white" : "#333"}` }}
          >
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
