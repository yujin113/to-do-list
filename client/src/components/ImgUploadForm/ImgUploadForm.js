import React, { useState} from "react";
import axios from "axios";
 
function ImageUploader() {
  const [imageUrl, setImageUrl] = useState("https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/436/8142f53e51d2ec31bc0fa4bec241a919_crop.jpeg");

  const setFile = (e) => {
    if (e.target.files[0]) {
      const img = new FormData();
      img.append("file", e.target.files[0]);
      axios
        .post('/api/users/uploadfiles', img)
        .then((res) => {
          setImageUrl(res.data.filePath);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <>
      <input type="image" src={imageUrl} value=" " 
        style={{width: '80px', height: '80px', border: '2px solid'}} 
      />
      <input type="file" accept="image/*" name="img"
        style={{fontSize: '10px'}} onChange={(e) => setFile(e)} 
      />
    </>
  );
}
 
export default ImageUploader;