import React, { useState, useEffect } from "react";
import classNames from "classnames";

import "./style.css";

function ScheduleCard(props) {
  const {
    primaryText,
    secondaryText,
    isActive,
    locationTimeslotID,
    toggleStatus,
    maxCapacity,
  } = props;

  const [editMode, setEditMode] = useState(false);
  const [slots, setSlots] = useState(null);

  useEffect(() => {
    setSlots(maxCapacity);
  }, [maxCapacity]);

  const toggleEdit = () => {
    if (isActive) {
      setEditMode(!editMode);
    }
  };

  return (
    <div
      className={classNames("schedule-card", {
        "isActive-schedule-card": isActive,
      })}
    >
      <div onClick={() => toggleStatus(locationTimeslotID)}>{primaryText}</div>
      <div>
        {editMode ? (
          <input
            type="number"
            className="input is-small"
            value={slots}
            onChange={(e) => setSlots(e.target.value)}
          />
        ) : (
          <span onClick={toggleEdit}>{secondaryText}</span>
        )}
      </div>
    </div>
  );
}

export default ScheduleCard;
