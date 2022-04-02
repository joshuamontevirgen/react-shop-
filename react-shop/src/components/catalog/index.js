import React, { useEffect, useState } from "react";
import { Item as CatalogItem } from "./item";
import { API_URL } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faGrip as faGrid } from "@fortawesome/free-solid-svg-icons";
import { Filter } from "./filter";

//https://medium.com/@joncalumdiprose_40937/filtering-multiple-queries-with-react-useeffect-9b0de068876d
//https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
export const Index = () => {
  const [isLoading, setLoading] = useState(true);
  const [filteredList, setFilteredList] = useState([]);
  const [filters, setFilters] = useState([]);
  const [items, setItems] = useState([]);
  const [isGrid, setGrid] = useState(true);

  //get items
  useEffect(() => {
    async function fetchData() {
      const newItems = await fetch(API_URL + "/api/catalog", {
        method: "GET",
      }).then((data) => data.json());
      setItems(newItems);
      setFilteredList(newItems);
      setLoading(false);
    }
    fetchData();
  }, []);

  //filter
  useEffect(() => {
    setFilteredList(filterList());
  }, [filters]);

  function filterList() {
    if (!filters.length) return items;
    let filtered = items.filter((item) => {
      var include = false;
      filters.forEach((filter) => {
        if (item.category === filter.value) include = true;
      });
      return include;
    });
    return filtered;
  }

  const handleFilterChange = (selected) => {
    setFilters([...selected]);
  };

  return (
    <div>
      <div>
        <Filter onChange={handleFilterChange} />
      </div>
      <button className="btn " onClick={() => setGrid(!isGrid)}>
        <FontAwesomeIcon icon={isGrid ? faList : faGrid} />
      </button>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="row col-12 m-0 p-1">
          <ul className="d-flex flex-wrap" style={{ listStyleType: "none" }}>
            {filteredList.map((item, index) => {
              return (
                <li
                  key={item.id}
                  className={"m-1 p-1 " + (!isGrid && "col-12")}
                >
                  <CatalogItem item={item} isGrid={isGrid} />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
