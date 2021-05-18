import React from "react";
import classNames from "classnames";
import "./style.css";

function SelectorPill(props) {
  const { title, selected } = props;
  return (
    <div
      className={classNames("selector-pill", {
        "active-selector-pill": selected,
      })}
    >
      {title}
    </div>
  );
}

export default SelectorPill;
