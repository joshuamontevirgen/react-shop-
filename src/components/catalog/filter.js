import React, { useState, useEffect } from "react";
import Select from "react-select";
import { API_URL } from "../../constants";

export const Filter = ({ onChange }) => {
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const newItems = await fetch(API_URL + "/api/itemcategory", {
        method: "GET",
      }).then((data) => data.json());
      setCategories(newItems);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    !isLoading && (
      <div>
        <strong className="">Category</strong>
        <Select
          onChange={onChange}
          options={categories}
          isMulti={true}
        ></Select>
      </div>
    )
  );
};
