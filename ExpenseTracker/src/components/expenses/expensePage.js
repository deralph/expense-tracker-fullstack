import React, { useCallback, useEffect, useState } from "react";
import { useGlobal } from "../context/Context";
import Sidebar from "../dashboard/Sidebar/Sidebar";
import Expenses from "./Expenses";
import { sets, getMonth } from "../../extras/quotesDB";
import "../categories/categories.css";
import Back from "../../extras/Back";
import Loader from "../loading/Loader";
import { RiEqualizerLine } from "react-icons/ri";
import useFetch from "../../extras/useFetch";
import "../dashboard/dashboardbody/dashboardBody.css";
import axios from "../../extras/axios";
import { useNavigate } from "react-router-dom";

const AllCategories = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [loading, setloading] = useState(true);
  const [problem, setProblem] = useState();

  const fetcher = useCallback(async () => {
    try {
      const { data } = await axios.get("expenses");
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
    console.log("in useEffect");
    setloading(true);
    fetcher();
    setloading(false);
  }, [fetcher]);
  const { sidebar, setSidebar, reduceFunction } = useGlobal();
  const [pro, setPro] = useState("");

  const [datas, setDatas] = useState(result);
  useEffect(
    () => setDatas(result.filter((type) => type.price * type.productNo > pro)),
    [pro, result]
  );

  const max = result
    .map(({ price, productNo }) => price * productNo)
    .reduce((then, now) => {
      return now > then ? now : then;
    }, 0);

  const monthOptions = ["all", ...getMonth(result)];
  const options = ["all", ...sets(result, "category")];

  const handleCategory = (opt, type) => {
    if (opt === "all") {
      setDatas(result);
    } else {
      setDatas(result.filter((sold) => sold[type] === opt));
    }
  };
  const handleMonth = (month, no) => {
    if (month === "all") {
      setDatas(result);
    } else {
      const data = result.filter((res) => {
        const num = res.date.split("-")[1];
        return num === no;
      });
      console.log(data);
      setDatas(data);
    }
  };

  if (problem) {
    return (
      <h1 style={{ display: "grid", placeContent: "center", height: "100vh" }}>
        SOMETHING WENT WRONG
      </h1>
    );
  }
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Back />
          <RiEqualizerLine
            className="dash-top1"
            onClick={() => setSidebar(!sidebar)}
            style={{ color: sidebar ? "#fff" : "#000" }}
          />
          <div className="dashboard">
            {" "}
            <Sidebar
              category={options}
              month={monthOptions}
              pro={pro}
              setPro={setPro}
              handleCategory={handleCategory}
              max={max}
              handleMonth={handleMonth}
            />
            <div className={sidebar ? "all-side overflow" : "all-side"}>
              <p className="total-p">Total : {reduceFunction(datas)}</p>
              <Expenses data={datas} type=" Expenses" />{" "}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AllCategories;
