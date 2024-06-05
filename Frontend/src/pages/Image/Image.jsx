import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { config } from "../../config/env.config";
import "./style.scss";
const Image = () => {
  let { imageId } = useParams();
  let [image, setImage] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post(
        `${config.VITE_BACKEND}/upload/${imageId}`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        setImage(res.data.image);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(image);
  return (
    <div className="imageContainer">
      <button
        onClick={() => {
          navigate(-1);
        }}>
        Go Back
      </button>

      <div className="container">
        <img src={image?.upload} alt="" />
        <h2>Title:{image?.title}</h2>
        <h3>Description:{image?.description}</h3>
      </div>
    </div>
  );
};

export default Image;
