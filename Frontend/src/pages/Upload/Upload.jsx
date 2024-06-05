import React, { useState } from "react";
import "./style.scss";
import InputField from "../../components/input/InputField";
import Uplaoder from "../../components/Uploader/Uplaoder";
import Button from "../../components/Button/Button";
import axios from "axios";
import { config } from "../../config/env.config";
import Loader from "../../components/Loader/Loader";

const Upload = () => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [file, setFile] = useState("");
  let [error, setError] = useState("");
  let [confirm, setConfirm] = useState("");
  let [loading, setLoading] = useState(false);
  function handleUpload(e) {
    e.preventDefault();
    if (!title) {
      setError("Title is required!!");
      return;
    }
    if (!description) {
      setError("Description is required!!");
      return;
    }
    if (!file) {
      setError("Image is required!!");
      return;
    }
    setError("");
    setLoading(true);
    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", file);
    axios
      .post(`${config.VITE_BACKEND}/upload`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setConfirm(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        setError(error.reponse.data.message || error.message);
      })
      .finally(() => {
        setTitle("");
        setDescription("");
        setFile("");
        setTimeout(() => {
          setConfirm("");
          setError("");
        }, 3000);
        setLoading(false);
      });
  }

  return (
    <div className="uploadContainer">
      {loading && <Loader />}
      <h2>Upload images here</h2>
      <form onSubmit={handleUpload}>
        <InputField
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
          placeholder={"Title of your image"}
          type={"text"}
        />
        <InputField
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
          placeholder={"Description of your image"}
          type={"text"}
        />
        <Uplaoder
          height={120}
          name={"upload"}
          onFileSelect={(e) => {
            console.log(e);
            setFile(e);
          }}
          width={"300px"}
        />
        {error ? <div className="errorMsg">{error}</div> : ""}
        {confirm ? <div className="confirmMsg">{confirm}</div> : ""}
        <Button text={"Upload Now"} padding={"15px"} type={"submit"} />
      </form>
    </div>
  );
};

export default Upload;
