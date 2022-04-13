//App must be wrapped in provider since you are using useDispatch in it.
//Right now it's just a child. Provider sets the context so only its children can have access to it, not a parent.
//https://stackoverflow.com/questions/60329421/usedispatch-error-could-not-find-react-redux-context-value-please-ensure-the
import React from "react";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App";

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
