import { useState, useEffect } from "react";
const URL = "https://fakestoreapi.com/products";

const InfinteScroll = () => {
  const [data, setData] = useState([]);
  async function fetchData(URL) {
    const res = await fetch(URL);
    const data = await res.json();
    setData((prev) => [...prev, ...data]);
  }

  useEffect(() => {
    fetchData(URL);
  }, []);

  function getDataOnScroll() {
    if (
      window?.innerHeight + document?.documentElement?.scrollTop >=
      document?.documentElement?.offsetHeight
    ) {
      fetchData(URL);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", getDataOnScroll);

    return () => {
      window.removeEventListener("scroll", getDataOnScroll);
    };
  }, []);

  return (
    <div>
      {data.map((item) => {
        return <img src={item?.image} alt={item?.title} width="200px" />;
      })}
    </div>
  );
};

export default InfinteScroll;
