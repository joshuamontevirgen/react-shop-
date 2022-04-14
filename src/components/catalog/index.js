import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { Item as CatalogItem } from "./item";
import { API_URL } from "../../constants";
import { useCategoryFilter } from "./filter/useCategoryFilter";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./../../styles.css";

//https://medium.com/@joncalumdiprose_40937/filtering-multiple-queries-with-react-useeffect-9b0de068876d
//https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
//https://typeofnan.dev/how-to-animate-items-out-of-an-array-in-react/

//findDomMode is deprecated warning - https://github.com/reactjs/react-transition-group/issues/668

export const Index = () => {
  const numItemsLoad = 20;
  const [isLoading, setLoading] = useState(true);

  const [filteredList, filterList, getFilterPanelDiv] = useCategoryFilter();
  //#region url filter
  const params = useParams();
  useEffect(() => {
    filterList(items, params);
  }, [params]);
  //#endregion url filter

  //#region infinitescroll
  const [count, setCount] = useState({
    prev: 0,
    next: numItemsLoad,
  });
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState([]);
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
    }, 500);
    setCount((prevState) => ({
      prev: prevState.prev + numItemsLoad,
      next: prevState.next + numItemsLoad,
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setHasMore(true);
    setCount({
      prev: 0,
      next: numItemsLoad,
    });
    setCurrentPage(filteredList.slice(0, numItemsLoad));
    setLoading(false);
  }, [filteredList]);
  //#endregion infinitescroll

  //#region getitems
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const newItems = await fetch(API_URL + "/api/catalog", {
        method: "GET",
      }).then((data) => data.json());
      setItems(newItems);
      params && filterList(newItems, params);
    }
    fetchData();
  }, []);
  //#endregion getitems

  return (
    <>
      <div className="fixed w-48 pl-5 pt-5 ">
        <div className="">{getFilterPanelDiv()}</div>
      </div>
      <div className=" content ">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="w-full">
            <InfiniteScroll
              dataLength={currentPage.length}
              next={nextData}
              hasMore={hasMore}
              loader={
                <div>
                  <svg
                    className="animate-spin h-5 w-5 mr-3 "
                    viewBox="0 0 24 24"
                  ></svg>
                  Loading...
                </div>
              }
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <>End of list</>
                </p>
              }
            >
              <TransitionGroup
                component="ul"
                className="flex flex-wrap flex-row"
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
                      <li className={"m-1 p-1 w-44 "}>
                        <CatalogItem item={item} />
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
