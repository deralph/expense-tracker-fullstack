import React from "react";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../components/context/Context";

const Logout = () => {
  const navigate = useNavigate();
  const { signout } = useGlobal();
  return (
    <p
      className="out"
      onClick={() => {
        signout().then(() => {
          console.log("user is out");
          navigate("/");
          window.location.reload();
        });
        // .catch((err) => {
        //   console.log(err.message);
        //   setmsg("unable to log user out");
        // });
      }}
    >
      Log Out
      <MdLogout style={{ marginLeft: "10px" }} />
    </p>
  );
};

export default Logout;
