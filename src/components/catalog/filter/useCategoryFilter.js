import React, { useState, useEffect } from "react";
import { API_URL } from "../../../constants";
import { FilterItem } from "./FilterItem";

export function useCategoryFilter() {
  const [isLoading, setLoading] = useState(true);
  const [filteredList, setFilteredList] = useState([]);
  const [parentCategoryList, setParentCategoryList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const newItems = await fetch(API_URL + "/api/itemcategory", {
        method: "GET",
      }).then((data) => data.json());
      setParentCategoryList(newItems);
      setLoading(false);
    }
    fetchData();
  }, []);
  function filterList(items, categoryFilter) {
    if (categoryFilter.subcategory) {
      setFilteredList(
        items.filter((item) => {
          return item.category === categoryFilter.subcategory;
        })
      );
    } else if (categoryFilter.category) {
      var list = items.filter((item) => {
        var parent = parentCategoryList.find(
          (c) => c.value === categoryFilter.category
        );
        var parentChildrenList = [parent, ...parent.children];

        return parentChildrenList.some((c) => c.value === item.category);
      });
      setFilteredList(list);
    } else {
      setFilteredList(items);
    }
  }

  function getFilterPanelDiv() {
    return (
      !isLoading && (
        <div className="">
          <strong className="">Category</strong>

          {parentCategoryList.map((item, index) => {
            return <FilterItem key={index} item={item} />;
          })}
        </div>
      )
    );
  }

  return [filteredList, filterList, getFilterPanelDiv];
}
