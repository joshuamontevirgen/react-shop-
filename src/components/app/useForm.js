import React, { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

export function useForm() {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    event?.target &&
      setFormData({
        name: event.target.name,
        value: event.target.value,
      });
  };
  const handleSubmit = (e, submit) => {
    setSubmitting(true);
    submit(e);
    setSubmitting(false);
  };

  return [formData, submitting, handleSubmit, handleChange];
}
