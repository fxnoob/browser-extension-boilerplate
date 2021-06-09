import ReactDOM from "react-dom";
import App from "./App";
import Constants from "../../constants";
const mountId = Constants.contentScript.mountId;
const Element = document.createElement("div");
Element.setAttribute("id", mountId);
document.body.appendChild(Element);
const root = ReactDOM.createRoot(document.getElementById(mountId));
root.render(<App />);