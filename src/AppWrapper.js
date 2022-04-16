//App must be wrapped in provider since you are using useDispatch in it.
//Right now it's just a child. Provider sets the context so only its children can have access to it, not a parent.
//https://stackoverflow.com/questions/60329421/usedispatch-error-could-not-find-react-redux-context-value-please-ensure-the

//https://stackoverflow.com/questions/70220413/error-usehref-may-be-used-only-in-the-context-of-a-router-component-it-wor
import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
export default function AppWrapper() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
