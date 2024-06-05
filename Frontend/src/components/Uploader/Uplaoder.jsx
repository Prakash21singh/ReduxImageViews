import React, { useState } from "react";
import "./style.scss";

const Uploader = ({ width, height, text, name, onFileSelect }) => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");

  const handleFileChange = (event) => {
    const {
      target: { files },
    } = event;

    if (files && files[0]) {
      setImage(URL.createObjectURL(files[0]));
      setFileName(files[0].name);
      onFileSelect(files[0]);
    } else {
      setImage(null);
      setFileName("No selected file");
    }
  };

  return (
    <>
      <div
        onClick={() => document.querySelector(`input[name="${name}`).click()}
        className="uploaderContainer"
        style={{ width: width, height: height }}>
        <input
          name={name}
          type="file"
          placeholder="Avatar"
          className="uploadField"
          hidden
          accept="images/*"
          onChange={handleFileChange}
        />
        {image ? (
          <>
            <img src={image} style={{ width: 100 }} />
            <span
              onClick={(e) => {
                e.stopPropagation();
                setImage(null);
                setFileName("No selected file");
                // Optionally, trigger onFileSelect with null to indicate removal
                onFileSelect(null);
              }}>
              <p>Delete</p>
            </span>
          </>
        ) : (
          <>
            &nbsp;&nbsp;
            <p> &#43; Upload</p>
          </>
        )}
      </div>
    </>
  );
};

export default Uploader;
