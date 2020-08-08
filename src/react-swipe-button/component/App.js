import React, { useState, useImperativeHandle, forwardRef } from "react";
import "./App.css";

export default forwardRef(function App(props, states) {
  var completeState = useState(false);
  var initobj = {
    minleft: 0
  };
  var oncomplete = function () {
    completeState[1] && completeState[1](true);
    props.oncomplete && props.oncomplete();
  };
  var reset = function () {
    completeState[1](false);
  };
  useImperativeHandle(states, function () {
    return {
      reset: reset
    };
  });
  props.reset = reset;
  var applytext = function (event, value) {
    var _parent = event.target.parentElement;
    var _text = _parent.querySelector(".react-swipe-button-info");
    _text.style.left = value / 2 + 50 + "%";
    _text.style.opacity = 1 - value / 100;
  };
  var getpercent = function (value) {
    return (value * 100) / initobj.maxwidth;
  };
  var applythumb = function (event, reset) {
    var element = event.target;
    if (reset) {
      element.style.left = initobj.minleft + "px";
      applytext(event, 0);
    } else {
      var diff = initobj.currentleft - initobj.startleft;
      var _stylediff = initobj.minleft < diff ? diff : initobj.minleft;
      _stylediff =
        initobj.maxwidth > _stylediff ? _stylediff : initobj.maxwidth;
      var percentage = getpercent(_stylediff);
      element.style.left = _stylediff + "px";
      applytext(event, percentage);
      if (initobj.maxwidth === _stylediff) {
        oncomplete();
      }
    }
  };
  var gettarget = (event) => {
    var len = event.changedTouches.length;
    for (var i = 0; i < len; i++) {
      var element = event.changedTouches[i];
      return element.target === event.currentTarget ? element : null;
    }
  };
  var touchstart = (event) => {
    var touchevent = gettarget(event);
    initobj.startleft = touchevent.clientX;
    var _parent = touchevent.target.parentElement;
    var _pwidth = _parent.offsetWidth;
    var _width = touchevent.target.offsetWidth;
    initobj.maxwidth = _pwidth - _width - 4;
    event.stopPropagation();
  };
  var touchmove = (event) => {
    var touchevent = gettarget(event);
    initobj.currentleft = touchevent.clientX;
    applythumb(touchevent);
    event.stopPropagation();
  };
  var touchend = (event) => {
    var touchevent = gettarget(event);
    applythumb(touchevent, true);
    event.stopPropagation();
  };
  return (
    <div
      className={
        completeState[0]
          ? "react-swipe-button react-swipe-completed"
          : "react-swipe-button"
      }
    >
      <div
        className="react-swipe-button-track"
        style={{ height: props.size + "px" }}
      >
        <div
          style={{ width: props.size + "px", height: props.size + "px" }}
          className="react-swipe-button-thumb"
          onTouchStart={touchstart}
          onTouchMove={touchmove}
          onTouchEnd={touchend}
        ></div>
        <div className="react-swipe-button-info react-swipe-info-animation">
          {props.info}
        </div>
      </div>
    </div>
  );
});
