import App from "./App.js";
import react from "react";
import Reactdom from "react-dom";
import { Provider } from "react-redux";
import store from "./store.js";

Reactdom.render(
  <Provider store={store}>
    <App/>
  </Provider>
  ,document.getElementById('root')
);
