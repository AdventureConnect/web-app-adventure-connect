import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";

const UserPage = () => {
  const [userView, setUserView] = useState();

  // useEffect(() => {
  //     async function getUser() {
  //         try {
  //             // refactor line 10 to the correct endpoint for getting specific user information
  //             const data = await fetch(`http://localhost:8080/api/${props.currentUser}`, {
  //                 method: 'GET',
  //             })
  //             const json = await data.json();
  //             setUserView(json);
  //             return;
  //         }
  //         catch (err) {
  //             alert(`An error has occurred! ${err.message}`);
  //             return err;
  //         }
  //     };

  //     getUser();
  // }, []);

  // just for testing; will need to be replaced with actual image data pulled from mongodb later
  const images = [
    "https://www.ispo.com/sites/default/files/2017-10/big-deal_0_0.jpeg",
    "https://s3.amazonaws.com/images.gearjunkie.com/uploads/2022/06/GJ-Alex-Honnold-Podcast-Feature-1380x920.jpg",
    "https://image-cdn.essentiallysports.com/wp-content/uploads/image_2022-12-13_224049157.png?width=600",
    "https://s3.amazonaws.com/www.explorersweb.com/wp-content/uploads/2023/01/04180652/Screen-Shot-2023-01-04-at-12.06.21-PM.jpg",
  ];

  // const carousel = images.map((URL, index) => (
  //     <div className="slide">
  //       <img src={URL} key={index} />
  //     </div>
  // ))

  return (
    <div className="box">
      <Carousel images={images} />
      <div>
        <h3>Alex Honnold</h3>
        <p>
          5 miles awayJust All my hiking partners retired or have passed away.
          Looking for people willing to free solo with me. Contact me at
          alexhonnold@gmail.com
        </p>
      </div>
      <div>
        <label>Climbing</label>
        <label>Hiking</label>
      </div>
    </div>
  );
};

export default UserPage;
