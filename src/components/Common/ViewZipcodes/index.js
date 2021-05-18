import React from "react";
import "./style.css";

function ViewZipcodes(props) {
  const { items = [], truncate = false, limit = 10 } = props;
  if (truncate && items?.length > limit) {
    let truncatedItems = [...items].slice(0, limit);
    return <span>{[...truncatedItems, "more"]?.join(", ")}</span>;
  }
  return <span>{items?.join(", ")}</span>;
}

export default ViewZipcodes;
