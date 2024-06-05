import React from "react";
import "./style.scss";
const Loader = () => {
  return (
    <div className="loaderContainer">
      <div class="newtons-cradle">
        <div class="newtons-cradle__dot"></div>
        <div class="newtons-cradle__dot"></div>
        <div class="newtons-cradle__dot"></div>
        <div class="newtons-cradle__dot"></div>
      </div>
    </div>
  );
};

export default Loader;
