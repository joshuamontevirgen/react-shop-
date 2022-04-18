import React, { useState, useEffect } from "react";
import { API_URL } from "../../../constants";
import { FilterItem } from "./FilterItem";
import { Link } from "react-router-dom";

export function useCategoryFilter() {
  const [isLoading, setLoading] = useState(true);
  const [filteredList, setFilteredList] = useState([]);
  const [parentCategoryList, setParentCategoryList] = useState([]);
  const [selectedParentCategory, setSelectedParentCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
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
    if (categoryFilter.subcategory && parentCategoryList.length > 0) {
      var parent = parentCategoryList.find(
        (c) => c.value === categoryFilter.category
      );
      setSelectedParentCategory(parent);
      setSelectedCategory(categoryFilter.subcategory);
      setFilteredList(
        items.filter((item) => {
          return item.category === categoryFilter.subcategory;
        })
      );
    } else if (categoryFilter.category && parentCategoryList.length > 0) {
      var list = items.filter((item) => {
        var parent = parentCategoryList.find(
          (c) => c.value === categoryFilter.category
        );
        setSelectedParentCategory(parent);
        setSelectedCategory(categoryFilter.category);
        var parentChildrenList = [parent, ...parent.children];

        return parentChildrenList.some((c) => c.value === item.category);
      });
      setFilteredList(list);
    } else {
      setSelectedCategory(null);
      setFilteredList(items);
    }
  }

  function getFilterPanelDiv() {
    return (
      !isLoading && (
        <div className="select-none">
          <strong className="">Category</strong>

          {parentCategoryList.map((item, index) => {
            return <FilterItem key={index} item={item} />;
          })}
        </div>
      )
    );
  }

  function getCategoriesHeaderDiv() {
    return (
      !isLoading &&
      selectedCategory && (
        <div className="relative mt-5 mb-20 w-full flex justify-center items-center select-none">
          <div className="flex flex-col w-full fixed justify-center items-center bg-white">
            <strong className="font-light text-7xl my-5">
              {selectedParentCategory.label}
            </strong>
            <div className="flex flex-row flex-wrap mb-8">
              <Link
                to={`/catalog/${selectedParentCategory.value}`}
                className={`btn hover:font-bold border rounded text-xl m-1 py-2 px-5 ${
                  selectedCategory === selectedParentCategory.value
                    ? "font-semibold bg-slate-500 text-white"
                    : "font-light"
                }`}
              >
                All
              </Link>
              {selectedParentCategory.children.map((item, index) => {
                return (
                  <Link
                    to={`/catalog/${selectedParentCategory.value}/${item.value}`}
                    className={`btn hover:font-semibold border rounded font-light text-xl m-1 py-2 px-5 ${
                      selectedCategory === item.value
                        ? "font-semibold bg-slate-500 text-white"
                        : "font-light"
                    }`}
                    key={item.value}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )
    );
  }

  return [filteredList, filterList, getFilterPanelDiv, getCategoriesHeaderDiv];
}
