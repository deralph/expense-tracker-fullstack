import React, { useContext, useEffect, useState } from "react";

const AppProvider = React.createContext();

const Context = ({ children }) => {
  const [currentuser, setcurrentuser] = useState("");

  const [form, setForm] = useState({
    productName: "",
    price: "",
    date: "",
    month: new Date().toLocaleDateString("en-us", { month: "long" }),
    productNo: "",
    category: "",
    description: "",
  });

  const [signIn, setSignIn] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const reduceFunction = (group) => {
    const percent = group.reduce((acc, real) => {
      const { productNo, price } = real;
      const productNum = parseInt(productNo);
      const productPrice = parseInt(price);
      const realTotal = productNum * productPrice;
      return acc + realTotal;
    }, 0);
    return percent;
  };

  return (
    <AppProvider.Provider
      value={{
        form,
        setForm,
        signIn,
        setSignIn,
        sidebar,
        setSidebar,
        reduceFunction,
      }}
    >
      {children}
    </AppProvider.Provider>
  );
};

export const useGlobal = () => useContext(AppProvider);

export default Context;