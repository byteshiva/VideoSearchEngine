import React, { useState } from "react";
import axios from "axios";

function App() {
  const [iframes, setIframes] = useState(undefined);

  const submitHandler = async (e) => {
    e.preventDefault();
    const searchStringArray = e.target.searchString.value.split(" ");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = { searchStringArray };
    try {
      const response = await axios.post(
        "/sendSearchStringArray",
        JSON.stringify(body),
        config
      );
      const iframes1 = response.data.map((eachUrl) => {
        let srcString = `//www.youtube.com/embed/${eachUrl}`;
        return (
          <iframe
            key={Math.random()}
            title={Math.random().toString()}
            src={srcString}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      });
      setIframes(iframes1);
      console.log('Please wait until all the videos are finished loading!')
    } catch (err) {
      console.log(err);
    }
    e.target.searchString.value = "";
  };
    
  
  
  return (
    <div className="App">
      <h1 style={{color:'white',textAlign:'center'}}>Search YouTube Video's</h1>
      <form onSubmit={(e) => submitHandler(e)}>
        <input type="text" required id="searchString" name="searchString" placeholder="Search" />
        <button type="Search">Search</button>
      </form>
      <div className="videos">
        {iframes === undefined ? <p></p> : iframes }
      </div>
    </div>
  );
}

export default App;
