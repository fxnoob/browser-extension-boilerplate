/* eslint-disable no-console */
import React from "react";
import ReactDOM from "react-dom";
import Index from "../components/Demo";
import { message } from "../services/chromeService";

message.sendMessage("/echo", {}, response => {
  console.log(" message from /echo", response);
});
const Element = document.createElement("div");
Element.setAttribute("id", "dfghbnjmERHJKFGHNMVBNMFBNMbmvvxnbdgf");
document.body.appendChild(Element);
ReactDOM.render(
  <Index />,
  document.getElementById("dfghbnjmERHJKFGHNMVBNMFBNMbmvvxnbdgf")
);
