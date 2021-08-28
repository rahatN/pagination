import React from "react";
import { useEffect, useState } from "react";
import paginate from "./utils";

export const useFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const url = "https://api.github.com/users/john-smilga/followers?per_page=100";

  const getProducts = async () => {
    const response = await fetch(url);
    const data = await response.json();

    setData(paginate(data));
    console.log(data);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return { data, loading };
};
