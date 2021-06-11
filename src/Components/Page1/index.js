import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../Api/constants";
import "../common.css";
import Loader from "../Loader";

export const Page1 = ({ btnText }) => {
  const [userDetails, setUserDetails] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let source = axios.CancelToken.source();

  useEffect(() => {
    const fetchUser = () => {
      setTimeout(() => {
        axios
          .get(API.userInfo, {
            cancelToken: source.token
          })
          .then((res) => {
            setUserDetails(res.data);
            if(res !== null) {
            setIsLoading(false);
            };
          })
          .catch((e) => {
            console.log(e.message);
          });
      }, 6000);
    };
    fetchUser();
  }, [source.token]);

  return (
    <>
      <h4>User Details</h4>
      {isLoading ? <Loader /> : userDetails &&
        userDetails.map((i, id) => {
          return (
            <div style={{overflowX:"auto"}} key={id}>
            <table
              style={{
                width: "80%",
                border: "solid 1px #000",
                borderCollapse: "collapse",
                tableLayout: "fixed",
                margin: "0 auto",
                wordWrap: "break-word"
              }}
            >
              <tbody>
                <tr >
                  <td
                    style={{
                      border: "solid 1px #000",
                      padding: "10px",
                      textAlign: "left"
                    }}
                  >
                    {i.name}
                  </td>
                  <td
                    style={{
                      border: "solid 1px #000",
                      padding: "10px",
                      textAlign: "left"
                    }}
                  >
                    {i.phone}
                  </td>
                  <td
                    style={{
                      border: "solid 1px #000",
                      padding: "10px",
                      textAlign: "left"
                    }}
                  >
                    {i.username}
                  </td>
                  <td
                    style={{
                      border: "solid 1px #000",
                      padding: "10px",
                      textAlign: "left"
                    }}
                  >
                    {i.email}
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          );
        })}
      <div className="buttons">
        <Link to="/info" className={`nav-btn${btnText.btn1.split(" ", 4)[3]}`} onClick={() => source.cancel("Request got Cancelled")}>
          {btnText.btn1}
        </Link>
      </div>
    </>
  );
};
export default Page1;
