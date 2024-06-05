import React, { useEffect } from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  fetchImageFailure,
  fetchImageRequest,
  fetchImageSuccess,
} from "../../feature/auth/authSlice";
import { config } from "../../config/env.config";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import Views from "../../assets/Views";

const Images = () => {
  const dispatch = useDispatch();
  let { image, loading } = useSelector((state) => state.User.User);

  useEffect(() => {
    dispatch(fetchImageFailure());
    axios
      .get(`${config.VITE_BACKEND}/uploads`, { withCredentials: true })
      .then((res) => {
        // console.log(res.data);
        dispatch(fetchImageSuccess(res.data.user));
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          fetchImageFailure(error.response.data.message || error.message)
        );
      });
  }, []);

  return (
    <div className="imagesContainer">
      {loading ? (
        <Loader />
      ) : (
        image &&
        image.map((img) => (
          <div className="imagesBox" key={img._id}>
            <img src={img?.upload} alt="" />
            <div className="about">
              <h2>{img?.title}</h2>
              <h5>{img?.description}</h5>
              <p>
                <Views /> &nbsp; : &nbsp;{img?.views || 0}
              </p>
            </div>
            <NavLink to={`/images/${img?._id}`}>
              <button>View</button>
            </NavLink>
          </div>
        ))
      )}
    </div>
  );
};

export default Images;
