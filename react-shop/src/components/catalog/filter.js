import React, { Component } from "react";
import { useEffect } from "react";
import Select from "react-select";

export const Filter = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  });
};
