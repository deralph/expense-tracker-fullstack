import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useIcons } from "../../extras/quotesDB";
// import useFetch from "../../extras/useFetch";
import axios from "../../extras/axios";
import "./expenses.css";
import Loader from "../loading/Loader";

const SingleExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [loading, setloading] = useState(true);
  const [problem, setProblem] = useState();

  const fetcher = useCallback(async () => {
    try {
      console.log("finally in fetcher");
      const { data } = await axios.get(`expenses/${id}`);
      setResult(data.expenses);
      console.log("in");
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) navigate("/signin");
      setloading(false);
      setProblem(true);
    }
  }, [navigate]);
  useEffect(() => {
    console.log("finally in useEffect");
    setloading(true);
    fetcher();
    setloading(false);
  }, [fetcher]);

  console.log(result);
  const { _id, category, price, productName, productNo, date, description } =
    result;

  const icon = useIcons().find((icon) => icon.title === category);
  const { Icon: Red, color } = icon;
  if (problem) {
    return (
      <h1 style={{ display: "grid", placeContent: "center", height: "100vh" }}>
        SOMETHING WENT WRONG
      </h1>
    );
  }

  return (
    <div className="single-main">
      {loading ? (
        <Loader />
      ) : (
        <section className="single-exp">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "40px",
            }}
          >
            <Red className="caticon" style={{ background: `${color}` }} />
          </div>

          <p>
            <span className="single-span">Name : </span>{" "}
            <span>{productName}</span>
          </p>
          <p>
            <span className="single-span">Price : </span> <span>{price}</span>
          </p>
          <p>
            <span className="single-span">Numbar : </span>{" "}
            <span>{productNo}</span>
          </p>
          <p>
            <span className="single-span">Price : </span>{" "}
            <span>{price * productNo}</span>
          </p>
          {description && (
            <p>
              <span className="single-span">Description : </span>{" "}
              <span>{description}</span>
            </p>
          )}
          <p>
            <span className="single-span">Date : </span>{" "}
            <span>{date.slice(0, 10)}</span>
          </p>
          <p>
            {/* <span className="single-span">Month : </span> <span>{month}</span> */}
          </p>
        </section>
      )}
    </div>
  );
};

export default SingleExpense;
