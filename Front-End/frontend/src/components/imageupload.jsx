import React, { useState } from "react";

const ImageUploader = ({ base64Strings, setBase64Strings }) => {
  const handleImageChange = (e) => {
    const files = e.target.files;

    if (files.length > 0) {
      const readerArray = Array.from(files).map((file) => {
        const reader = new FileReader();

        return new Promise((resolve) => {
          reader.onloadend = () => {
            const base64String = reader.result;
            resolve(base64String);
          };

          reader.readAsDataURL(file);
        });
      });

      Promise.all(readerArray).then((base64Strings) => {
        setBase64Strings(base64Strings);
      });
    }
  };

  return (
    <div className="mb-4">
      <div className="flex flex-wrap">
        <input type="file" multiple onChange={handleImageChange} />
        <label className="block mb-1">Uploaded Images:</label>
        {base64Strings.length > 0 && base64Strings.map((base64String, index) => (
          <img key={index} src={base64String} alt={`Uploaded ${index}`} className="block w-20 h-20 object-cover m-1"/>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
