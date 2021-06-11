import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import "../common.css";
import "./style.css";
import { API } from "../Api/constants";
import Loader from "../Loader";

export const Page2 = ({ btnText }) => {
  const [productDetails, setProductDetails] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  let source = axios.CancelToken.source();

  useEffect(() => {
    const fetchProducts = () => {
      setTimeout(() => {
        axios
          .get(API.productCategoryInfo, {
            cancelToken: source.token,
          })
          .then((res) => {
            setProductDetails(res.data);
            if (res !== null) {
              setIsLoading(false);
            }
          })
          .catch((e) => {
            console.log(e.message);
          });
      }, 6000);
    };
    fetchProducts();
  }, [source.token]);

  let productCount =
    productDetails &&
    productDetails.map((i) => {
      return i.category;
    });
  const countUnique = (productCount) => {
    const counts = {};
    for (var i = 0; i < productCount.length; i++) {
      counts[productCount[i]] = 1 + (counts[productCount[i]] || 0);
    }
    return counts;
  };
  const series = Object.values(countUnique(productCount)).map((num) => {
    return num;
  });
  const options = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: Object.keys(countUnique(productCount)).map((num) => {
      return num;
    }),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <>
      <h3>Product Category Information Via Pie Chart</h3>
      {isLoading ? (
        <Loader />
      ) : (
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          width={480}
        />
      )}
      <div className="buttons">
        <Link to="/" className={`nav-btn${btnText.btn2.split(" ", 4)[3]}`}>
          {btnText.btn2}
        </Link>
      </div>
    </>
  );
};

export default Page2;
