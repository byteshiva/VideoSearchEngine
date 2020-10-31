const express = require("express");
const router = express.Router();
const axios = require('axios');

router.post("/", async (req, res) => {
  const searchStringArray = req.body.searchStringArray;
  let searchString = "";
  if (searchStringArray.length === 0) {
    searchString += searchStringArray[0];
  } else {
    searchStringArray.map((eachElement, index) => {
      if (index === searchStringArray.length - 1) {
        searchString += eachElement;
      } else {
        searchString += eachElement + "%20";
      }
    });
  }
//   console.log(searchString);

  const endPoint1 =
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=40&q=" +
    searchString +
    "&key=AIzaSyC238iacEYlnq4l55V7F4jgPEjU7vi721k";
//   console.log(endPoint1);
  try {
    const response = await axios.get(endPoint1);
    const data = response.data;
    // console.log(data.items);
     //this is the array of the items
    let videoIds = data.items.map(eachItem => {
        if(eachItem.id.videoId !== null || eachItem.id.videoId !== undefined ){
            return eachItem.id.videoId;
        }
    });
    videoIds = videoIds.filter(each => each !== undefined);
    res.status(200).json(videoIds);

  } catch (err) {
    res.send("There was an error with the api");
  }

});

module.exports = router;
