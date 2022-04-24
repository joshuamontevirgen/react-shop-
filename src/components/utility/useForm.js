import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useOverlay } from "./loaderOverlay/useOverlay";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export function useForm() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);
  const [showLoader, hideLoader] = useOverlay();
  //https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp
  useEffect(() => {
    return () => {
      hideLoader();
      setFormData({});
    };
  }, []);

  const handleChange = (event) => {
    event?.target &&
      setFormData({
        name: event.target.name,
        value: event.target.value,
      });
  };

  const handleSubmit = async (e, submit) => {
    setSubmitting(true);
    showLoader();

    await new Promise((resolve) => setTimeout(resolve, 500)); //fake delay
    await submit(e);

    setSubmitting(false);
    hideLoader();
  };

  return [formData, submitting, handleSubmit, handleChange];
}
