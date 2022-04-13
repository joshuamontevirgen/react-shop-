import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
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
  const numItemsLoad = 20;
  const [isLoading, setLoading] = useState(true);

  //filter
  const [filteredList, setFilteredList] = useState([]);
  const [categoryfilter, setCategoryFilter] = useState([]);

  //all items
  const [items, setItems] = useState([]);
  const [isGrid, setGrid] = useState(true);

  //infinite scroll
  const [count, setCount] = useState({
    prev: 0,
    next: numItemsLoad,
  });
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState([]);
  //

  //infinite scroll
  const nextData = () => {
    if (currentPage.length >= filteredList.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setCurrentPage(
        currentPage.concat(
          filteredList.slice(
            count.prev + numItemsLoad,
            count.next + numItemsLoad
          )
        )
      );
    }, 1000);
    setCount((prevState) => ({
      prev: prevState.prev + numItemsLoad,
      next: prevState.next + numItemsLoad,
    }));
  };

  //get items
  useEffect(() => {
    async function fetchData() {
      const newItems = await fetch(API_URL + "/api/catalog", {
        method: "GET",
      }).then((data) => data.json());
      setItems(newItems);
      setFilteredList(newItems);

      setCurrentPage(newItems.slice(0, numItemsLoad));
      setLoading(false);
    }
    fetchData();
  }, []);

  //filter
  useEffect(() => {
    const filterList = () => {
      if (!categoryfilter.length) return items;
      let filtered = items.filter((item) => {
        var include = false;
        categoryfilter.forEach((filter) => {
          if (item.category === filter.value) include = true;
        });
        return include;
      });
      return filtered;
    };
    var list = filterList();
    setFilteredList(list);
    setCurrentPage(list.slice(0, numItemsLoad));
    setCount({
      prev: 0,
      next: numItemsLoad,
    });
  }, [categoryfilter]);

  const handleFilterChange = (selected) => {
    setCategoryFilter([...selected]);
  };

  return (
    <>
      <div className="filter">
        <div className="">
          <Filter onChange={handleFilterChange} />
        </div>
      </div>
      <div className="container-fluid content ">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="row col-12 m-0 p-1">
            <InfiniteScroll
              dataLength={currentPage.length}
              next={nextData}
              hasMore={hasMore}
              loader={
                <p style={{ textAlign: "center" }}>
                  <>Loading...</>
                </p>
              }
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <>End of list</>
                </p>
              }
            >
              <TransitionGroup
                component="ul"
                className="d-flex flex-wrap"
                style={{ listStyleType: "none" }}
              >
                {currentPage.map((item, index) => {
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
            </InfiniteScroll>
          </div>
        )}
      </div>
    </>
  );
};
