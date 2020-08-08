import React from "react";
import "./styles.css";
import SwipeButton from "./react-swipe-button";
var swipesize = "60";
var oncomplete = function () {
  window.navigator && window.navigator.vibrate(200);
};
var reset = React.createRef();
var resetbutton = function () {
  reset.current && reset.current.reset();
};
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>
        Start editing to see some magic happen!{" "}
        <button onClick={resetbutton}>Reset</button>
      </h2>
      <div className="swipebuy">
        <SwipeButton
          size={swipesize}
          info="Swipe to buy"
          oncomplete={oncomplete}
          ref={reset}
        />
      </div>
    </div>
  );
}
