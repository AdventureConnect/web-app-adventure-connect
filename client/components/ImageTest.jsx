import React, { useState } from 'react';
import { Button, Form } from 'react-form-elements';


function ImageUpload() {

  const showImg = async () => {
    try {
      fetch('http://localhost:8080/api/imageretrieve', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              },
      })
    }
    catch (err) {
      return err;
    }
  }

  return (
    <div>
      <form action='/api/imagetest' encType='multipart/form-data' method='post' >
        <input type='file' name='image1' accept='image/*'/>
        <Button type='submit' className='profile-order-button'>
          Save Changes
        </Button>
       </form>
       {/* {imageData === '' || imageData === null ? '' : <img width={100} height='auto' src={imageData}/>} */}
       <button onClick={showImg}>Show me an image</button>
    </div>
  );
}

export default ImageUpload;