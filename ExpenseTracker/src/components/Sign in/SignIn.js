import React from "react";
import Register from "./Register";
import "./Signin.css";
import { useGlobal } from "../context/Context";
import Login from "./Login";

const SignIn = () => {
  const { signIn } = useGlobal();
  return (
    <section className="signin">
      <div className="semi-bg" />
      {signIn ? <Login /> : <Register />}
    </section>
  );
};

export default SignIn;
