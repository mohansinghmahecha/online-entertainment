import React from "react";
import Bookmark from "../bookmarkmovies/BookmarkMovie";
import TvSerialBookMark from "../tvserialbookmark/TvSerialBookMark";

export default function BookMarkHolder() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <div>
        <Bookmark />
      </div>
      <div className="mt-20">
        <TvSerialBookMark />
      </div>
    </div>
  );
}
