import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import classNames from "classnames";
import "./styles.css";

import { Container, Heading, Columns, Button } from "react-bulma-components";
import Moment from "react-moment";
import ViewZipcodes from "../Common/ViewZipcodes";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function LocationList(props) {
  const history = useHistory();
  const {
    clients,
    locations,
    selectedClientId,
    selectedClient,
    loadClients,
    loadLocations,
    setSelectedClient,
    setSelectedLocation,
    initAddClientLocationForm,
  } = props;
  const onClientChange = (id) => {
    setSelectedClient(id);
    loadLocations(id);
  };

  useEffect(() => {
    if (selectedClientId) {
      loadLocations(selectedClientId);
    }
  }, []);

  useEffect(() => {
    if (clients && clients.length === 0) {
      loadClients();
    }
  }, []);

  const navigateToDetails = (id, isActive) => {
    // if (isActive) {
    setSelectedLocation(id);
    history.push(`/location-details/${id}`);
    // }
  };

  const navigateToAddNewLocation = () => {
    initAddClientLocationForm();
    history.push(`/location/manage`);
  };

  return (
    <Container fluid style={{ paddingBottom:'65px' }}>

      
<nav className="breadcrumb block" aria-label="breadcrumbs" style={{ marginTop: "35px"}}>
              <ul>
                 
                  <li className="is-active"><a href="#" aria-current="page">Location List</a></li>
             </ul>
         </nav>
         
      <div className="align-self-center">
      <Heading style={{ marginTop: "35px",marginBottom:"10px",fontSize:"14px" }}>
          Contract
        </Heading>
      </div>

      
      <div className="select fs-12">
        <select
          onChange={(e) => onClientChange(e.target.value)}
          value={selectedClientId ? selectedClientId : clients[0]}
        >
          <option>Select Client</option>
          {clients.map((item) => (
            <option key={item.clientID} value={item.clientID}>
              {item.clientName}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: "35px" }}>
        <h2 className="title is-2 has-text-weight-bold" style={{ marginBottom: "35px" }}>
          {selectedClientId ? selectedClient?.clientName : ""}
        </h2>

        <div style={{  }}>
          {locations.map((location) => (
            <div
              onClick={() =>
                navigateToDetails(location.clientLocationID, location.isActive)
              }
              key={location.clientLocationID}
              className={classNames("location-card", {
                "disabled-location-card": !location.isActive,
              })}
            >
              <Columns>
                <Columns.Column size="one-quarter" className="align-self-center px-0 py-0 is-flex is-flex-direction-column">
                  <h4 className="title is-4 mb-1 truncate-mobile truncate has-text-weight-bold">
                    {location.locationName}
                  </h4>
                  <div className="font-14 truncate-mobile truncate">
                    {location.locationAddress}
                  </div>
                </Columns.Column>
                <Columns.Column size="one-quarter" className="align-self-center">
                  <div className="font-14 pl-4">
                    {location.isActive
                      ? "Active Schedule"
                      : "Not Active Schedule"}
                  </div>
                </Columns.Column>
                <Columns.Column size="one-quarter" className="align-self-center">
                  <div className="font-14 truncate">
                    <ViewZipcodes
                      items={location?.locationZipCode}
                      truncate={true}
                      limit={10}
                    />
                  </div>
                </Columns.Column>
                <Columns.Column size="one-quarter">
                  <div className="font-14">
                    Schedule:
                    <span className="ml-1">
                      <Moment format="MMMM DD, YYYY">
                        {location.fromScheduleDate}
                      </Moment>
                      <span className="ml-1 mr-1">-</span>
                      <Moment format="MMMM DD, YYYY">
                        {location.toScheduleDate}
                      </Moment>
                    </span>
                  </div>
                  <div className="font-14 truncate">{location.scheduleDays}</div>
                </Columns.Column>
              </Columns>
            </div>
          ))}
        </div>
      </div>
      <Button
        className="button is-info is-outlined is-fullwidth max-w-1600"
        onClick={navigateToAddNewLocation}
        disabled={!selectedClientId}
      >
        <FontAwesomeIcon icon={faPlus} />
        &nbsp;&nbsp; Add New Location
      </Button>
    </Container>
  );
}

export default LocationList;
