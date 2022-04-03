import React, { useEffect, useState, useRef } from "react";
import { Item as CatalogItem } from "./item";
import { API_URL } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faGrip as faGrid } from "@fortawesome/free-solid-svg-icons";
import { Filter } from "./filter";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./../../styles.css";

//https://medium.com/@joncalumdiprose_40937/filtering-multiple-queries-with-react-useeffect-9b0de068876d
//https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
//https://typeofnan.dev/how-to-animate-items-out-of-an-array-in-react/

//findDomMode is deprecated warning - https://github.com/reactjs/react-transition-group/issues/668

export const Index = () => {
  const [isLoading, setLoading] = useState(true);
  const [filteredList, setFilteredList] = useState([]);
  const [filters, setFilters] = useState([]);
  const [items, setItems] = useState([]);
  const [isGrid, setGrid] = useState(true);
  const nodeRef = useRef(null);

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
    const filterList = () => {
      if (!filters.length) return items;
      let filtered = items.filter((item) => {
        var include = false;
        filters.forEach((filter) => {
          if (item.category === filter.value) include = true;
        });
        return include;
      });
      return filtered;
    };
    setFilteredList(filterList());
  }, [filters]);

  const handleFilterChange = (selected) => {
    setFilters([...selected]);
  };

  return (
    <>
      <div className="container-fluid bg-primary">
        <div className="row pt-2 pb-2 bg-secondary">
          <div className="col-5">
            <Filter onChange={handleFilterChange} />
          </div>
          <button className="btn " onClick={() => setGrid(!isGrid)}>
            <FontAwesomeIcon icon={isGrid ? faList : faGrid} />
          </button>
        </div>
      </div>
      <div className="container-fluid">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="row col-12 m-0 p-1">
            <TransitionGroup
              component="ul"
              className="d-flex flex-wrap"
              style={{ listStyleType: "none" }}
            >
              {filteredList.map((item, index) => {
                return (
                  <CSSTransition
                    // nodeRef={nodeRef}
                    key={item.id}
                    timeout={250}
                    classNames="item"
                  >
                    <li className={"m-1 p-1 " + (!isGrid && "col-12")}>
                      <CatalogItem
                        item={item}
                        //  ref={nodeRef}
                        isGrid={isGrid}
                      />
                    </li>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </div>
        )}
      </div>
    </>
  );
};