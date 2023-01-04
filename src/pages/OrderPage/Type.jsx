import axios from "axios";
import React, { useEffect, useState } from "react";
import Products from "./Products";

const Type = ({ orderType }) => {
  const [items, setItmes] = useState([]);
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async (orderType) => {
    try {
      let response = await axios.get(`http://localhost:5000/${orderType}`);
      setItmes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const ItemComponents = orderType === "products" ? Products : null;

  const optionItems = items.map((item) => (
    <ItemComponents
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return <div>{optionItems}</div>;
};

export default Type;
