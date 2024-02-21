import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export const ChickenSelect = () => {
  const loadMore = () => {};

  return (
    <InfiniteScroll
      dataLength={items.length} //This is important field to render the next data
      next={loadMore}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <></>
    </InfiniteScroll>
  );
};
