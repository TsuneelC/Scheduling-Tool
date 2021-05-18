import React, { useState, useEffect } from "react";
import { Columns } from "react-bulma-components";

import SelectorPill from "../SelectorPill";

function SelectorPillList(props) {
  const [dataItems, setDataItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValues, setSelectedValues] = useState([]);
  const { items, multiple } = props;
  useEffect(() => {
    const data = items.map((item) => {
      return {
        ...item,
        selected: false,
      };
    });
    setDataItems([...data]);
  }, [items]);

  const onPillSelect = (pillItem, index) => {
    if (!multiple) {
      const currentValue = pillItem.value;
      setDataItems(
        dataItems.map((item) => {
          const isCurrent = currentValue == item.value;
          return {
            ...item,
            selected: isCurrent,
          };
        })
      );
      setSelectedValue(currentValue);
      props.onPillSelect(currentValue);
    } else {
      const currentValue = pillItem.value;
      const updatedItems = dataItems.map((item) => {
        const isCurrent = currentValue == item.value;
        return {
          ...item,
          selected: isCurrent ? !item.selected : item.selected,
        };
      });
      setDataItems(updatedItems);
      const selectedItems = updatedItems
        .filter((item) => item.selected == true)
        .map((item) => item.value);
      setSelectedValues(selectedItems);
      props.onPillSelect(selectedItems);
    }
  };
  return (
    
    <div className="is-flex">
      {dataItems.map((item, index) => (
        <div className="is-flex-direction-row mr-3" key={index} onClick={() => onPillSelect(item, index)}>
          <SelectorPill
          
            title={item.display}
            selected={item.selected}
            // selected={selected[index]}
            // onClick={() => onPillSelect(index)}
          ></SelectorPill>
        </div>
      ))}
    </div>
    
  );
}

export default SelectorPillList;
