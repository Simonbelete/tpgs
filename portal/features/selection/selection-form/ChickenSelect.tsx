import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLazyGetChickensRankingQuery } from "../services";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import buildPage from "@/util/buildPage";

export const ChickenSelect = () => {
  const [pageModel, setPageModel] = useState({
    pageSize: 10,
    page: 0,
  });

  const selection = useSelector((state: RootState) => state.selection);

  const [trigger, data] = useLazyGetChickensRankingQuery();

  const hasMore =
    pageModel.page <= Math.floor((data.data?.count || 0) / pageModel.pageSize);

  const loadMore = () => {
    trigger(buildPage(pageModel));
    setPageModel({ ...pageModel, page: pageModel.page + 1 });
  };

  useEffect(() => {
    trigger(buildPage(pageModel));
  }, []);

  return (
    <InfiniteScroll
      dataLength={data.data?.count || 0} //This is important field to render the next data
      next={loadMore}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      height={400}
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
