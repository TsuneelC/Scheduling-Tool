import React, { useEffect, useState } from "react";
import { Columns } from "react-bulma-components";
import * as _ from "lodash";
import "./styles.css";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

function ManageZipCodes(props) {
  const { initialZips = [] } = props;
  const [selectedItems, setSelectedItems] = useState([]);
  const [zipText, setZipText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (_.isArray(initialZips)) {
      const initialData = initialZips.map((item) => {
        return { value: item };
      });
      setSelectedItems(initialData);
    }
  }, [initialZips]);

  const validateZipCode = (zip) => {
    const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
    return isValidZip;
  };

  const zipcodeExists = (zip) => {
    return _.some(selectedItems, { value: zip });
  };

  const addZipCode = (e) => {
    e.preventDefault();
    if (validateZipCode(zipText)) {
      if (!zipcodeExists(zipText)) {
        const newList = [
          ...selectedItems,
          {
            value: zipText,
          },
        ];
        setSelectedItems(newList);
        props.onZipListChange(newList);
        setError("");
        setZipText("");
      } else {
        setError("Zipcode is already added");
      }
    } else {
      setError("Enter valid Zipcode");
    }
  };

  const removeZipCode = (e, deletingItem) => {
    e.preventDefault();
    const filtered = [...selectedItems].filter(
      (item) => item.value !== deletingItem.value
    );
    setSelectedItems(filtered);
    props.onZipListChange(filtered);
  };

  return (
    <Columns>
      <Columns.Column>
        <div>
          <label className="bold"> Add ZipCodes: </label>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Search Zipcodes"
              value={zipText}
              onChange={(e) => setZipText(e.target.value)}
            />
          </div>
          <div className="control">
            <button
              className="button is-info is-outlined"
              onClick={(e) => addZipCode(e)}
            >
             &nbsp;&nbsp;&nbsp;Add&nbsp;
        <FontAwesomeIcon icon={faAngleDoubleRight} />
        &nbsp;&nbsp;&nbsp;
            </button>
          </div>
        </div>
        {error && <div className="error">{error}</div>}
      </Columns.Column>
      <Columns.Column>
        <label className="bold"> Associated ZipCodes:</label>
        <div>
          <Columns>
            {selectedItems.map((item, index) => (
              <Columns.Column key={index} className="">
                
                <div className="zipbox">
                  <span>{item.value}</span>
                  <span
                    className="remove-link"
                    onClick={(e) => removeZipCode(e, item)}
                  >
                    Remove
                  </span>
                </div>
              </Columns.Column>
            ))}
          </Columns>
        </div>
      </Columns.Column>
    </Columns>
  );
}

export default ManageZipCodes;
