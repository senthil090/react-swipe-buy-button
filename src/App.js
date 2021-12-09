import React, { useState } from "react";
import "./styles.css";
import SwipeButton from "./react-swipe-button";
var swipesize = "60";
var reset = React.createRef();

export default function App() {
  var isreset = useState(false);
  var oncomplete = function () {
    window.navigator &&
      window.navigator.vibrate &&
      window.navigator.vibrate(200);
    isreset[1](true);
  };
  var resetbutton = function () {
    reset.current && reset.current.reset();
    isreset[1](false);
  };
  
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen! </h2>
      <div className="swipebuy">
        <SwipeButton
          size={swipesize}
          info="Swipe to proceed"
          oncomplete={oncomplete}
          ref={reset}
        />
      </div>
      {isreset[0] && (
        <div className="resetbutton">
          <button onClick={resetbutton}>Reset </button>
        </div>
      )}
    </div>
  );
}
