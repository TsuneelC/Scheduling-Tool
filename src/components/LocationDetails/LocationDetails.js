import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import Moment from "react-moment";
import { Container, Heading, Columns, Button } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Calendar from "react-calendar";
import * as _ from "lodash";


import "./style.css";

import ScheduleCard from "../Common/ScheduleCard";
import { getTimeslot } from "../../services/date.service";
import ViewZipcodes from "../Common/ViewZipcodes";
import Modal from "../Common/Modal";
import Warning from "../Common/Warning";




function LocationDetails(props) {
  const history = useHistory();
  const currentDate = new Date();
  const {
    locations,
    vaccineTypes,
    locationTimeslots,
    selectedClientId,
    selectedLocationId,
    deactivateAllSlots,
    activateAllSlots,
  } = props;
  const [date, setDate] = useState(null);
  const [manufacturer, setManufacturer] = useState("");
  const { selectedLocation } = props;
  const { id } = useParams();
  const [isNewChanges, setIsNewChanges] = useState(false);
  const [isReactivate, setIsReactivate] = useState(false);

  const toggleTimeslotStatus = (id) => {
    props.toggleLocationTimeslotStatus(id);
    setIsNewChanges(true);
  };

  const showMetaData = () => {
    const activeItems = _.filter(locationTimeslots, { isActive: true });
    const vaccinations = _.sumBy(activeItems, "maxCapacity");
    return `${activeItems.length} timeslots, ${vaccinations} total vaccinations`;
  };

  useEffect(() => {
    if (
      vaccineTypes &&
      vaccineTypes.length > 0 &&
      selectedLocation.vaccineTypeID
    ) {
      const selectedVaccineType = vaccineTypes.find(
        (c) => c.vaccineTypeID === selectedLocation.vaccineTypeID
      );
      setManufacturer(selectedVaccineType?.vaccineTypeName);
    }
  }, [selectedLocation.vaccineTypeID, vaccineTypes]);

  useEffect(() => {
    if (locations && locations.length === 0) {
      props.loadLocations(selectedClientId);
    }
    props.loadVaccineTypes();
  }, []);

  useEffect(() => {
    if (selectedLocation && selectedLocation.fromScheduleDate) {
      const fromDate = new Date(selectedLocation.fromScheduleDate);
      const toDate = new Date(selectedLocation.toScheduleDate);
      if (currentDate > fromDate && currentDate < toDate) {
        setDate(currentDate);
      }
      /*To populate with fromDate */
      // else {
      //   setDate(fromDate);
      // }
    }
  }, [selectedLocation.fromScheduleDate]);

  useEffect(() => {
    if (date) {
      const data = {
        dateSlot: date.toISOString(),
        clientLocationID: +selectedLocationId,
      };
      props.getLocationTimeslotsRequest(data);
    }
  }, [selectedLocationId, date]);

  useEffect(() => {
    var Activatecounter = 0;
    var InActivatecounter = 0;
    locationTimeslots.find((res) => {
      if (res.isActive) {
        Activatecounter = Activatecounter + 1;
      } else {
        InActivatecounter = InActivatecounter + 1;
      }
    });
    if (Activatecounter > InActivatecounter) {
      setIsReactivate(true);
    } else {
      setIsReactivate(false);
    }
  }, []);

  const saveScheduleChange = () => {
    setIsNewChanges(false);
  };

  const checkChanges = () => {
    if (isNewChanges) {
      alert("Unsaved changes will be lost");
    }
  };
  const calenderCheck = (event) => {
    checkChanges();
    setDate(event);
  };
  const saveDateTimeSlots = () => {
    var payload = [
      {
        dateSlot: date.toISOString(),
        isActive: isReactivate,
        clientLocationID: selectedLocation.clientLocationID,
      },
    ];
    props.updateLocationTimeslotsRequest(payload);
  };

  const currentDeactivateAllSlots = () => {
    deactivateAllSlots();
    setIsReactivate(false);
  };
  const currentReactivateAllSlots = () => {
    activateAllSlots();
    setIsReactivate(true);
  };






  return (
    <Container style={{paddingBottom:'60px'}}>
      {selectedLocation && (
        <div>
           <div style={{paddingTop:'35px',height:'2.5rem'}}>
                <Link to="/location/manage">
                  <Button
                    className="button is-info is-outlined"
                    style={{ width: "196px",float:"right" }}
                    onClick={checkChanges}
                  >
                    Edit Location
                  </Button>
                </Link>
                 </div>

                
        {/*
          <div className="block" onClick={checkChanges}>
            <Link to="/landingPage" style={{ color: " #005ca6" }}>
              
            </Link>
          </div>
                */}

          
          <nav className="breadcrumb block" aria-label="breadcrumbs"  onClick={checkChanges}>
              <ul>
                  <li><a href="/landingPage">Location List</a></li>
                  <li className="is-active"><a href="#" aria-current="page">Location</a></li>
             </ul>
         </nav>

          
          <Columns>
          <Columns.Column size="half">
                    <div className="has-text-weight-semibold">
                    <Heading style={{ fontSize:"28px" }}>
                      {selectedLocation.locationName}
                      </Heading>
                    </div>
                  </Columns.Column>
           
                  
                </Columns>


         

         
        
          <Columns className="bubble">
            <Columns.Column className="">
          
          <div className="">
               <Heading style={{ fontSize:"16px" }}>
                    {selectedLocation.locationAddress}
                    </Heading>
                </div>
                <div className="">
                <h4 className="has-text-weight-semibold">
                  <Moment format="MMMM DD, YYYY">
                    {selectedLocation.fromScheduleDate}
                  </Moment>
                  <span className="ml-1 mr-1">-</span>
                  <Moment format="MMMM DD, YYYY">
                    {selectedLocation.toScheduleDate}
                  </Moment>
                  </h4>
                </div>
          
          </Columns.Column>
  
          <Columns.Column>
          <h4 className="has-text-weight-semibold">
                    <div>Status: </div>
                    <div>Manufacturer: </div>
                  </h4>
              </Columns.Column>
            </Columns>


            <Columns>
            <Columns.Column size="one-quarter" className="bubble-tb" style={{marginRight:'30px'}}>  
               <table className="table  is-fullwidth">
                   <tbody>
                      <tr>
                        <td>
                          <h2 className="has-text-weight-semibold">
                            Associated Zipcodes:
                          </h2>
                        </td>
                     </tr>
                  <tr>
                     <td>
                     {selectedLocation && selectedLocation.locationZipCode && (
                       <div className="font-14">
                         <ViewZipcodes
                            items={selectedLocation.locationZipCode}
                            truncate={false}
                         />
                       </div>
                        )}
                     </td>
                   </tr>
                 </tbody>
               </table>


             
            </Columns.Column>



           
                <Columns.Column className="bubble-tb">
                  <table className="table  is-fullwidth">
                   <tbody>
                      <tr>
                        <td>
                        <h2 className="has-text-weight-bold">
                    Vaccination Schedule: 
                   </h2>
                        </td>
                       <td>
                         <Warning></Warning>
                       </td>
                        
                     </tr>
                  <tr>
                     <td>
                     <strong>Operating Days:</strong>
                     </td>
                     <td className="gry">
                       {selectedLocation.daysOfOperation
                        ? selectedLocation.daysOfOperation?.join(", ")
                        : `undefined`}
                     </td>
                   </tr>
                   <tr>
                     <td>
                     <strong>Operating Hours:</strong>
                     </td>
                     <td className="gry">
                       <Moment format="hh:mm A">
                        {selectedLocation.fromScheduleDate}
                      </Moment>
                      <span className="ml-1 mr-1">-</span>
                      <Moment format="hh:mm A">
                        {selectedLocation.toScheduleDate}
                      </Moment>
                     </td>
                   </tr>
                   <tr>
                     <td>
                     <strong>Vaccination Pace:</strong>
                     </td>
                     <td className="gry">
                        {selectedLocation.lengthofVaccineInMins !== -1
                        ? `${selectedLocation.lengthofVaccineInMins} Minutes`
                        : "Whole Day"}
                     </td>
                   </tr>
                   <tr>
                     <td>
                     <strong>Vaccine Velocity:</strong>
                     </td>
                     <td className="gry">
                       {selectedLocation.vaccineVelocity} shots given per slot
                     </td>
                   </tr>


                 </tbody>
               </table>
             
                </Columns.Column>
               </Columns>
              
          
          
         

          <Columns className="bubble-tb">
            <Columns.Column className="is-one-quarter">
              <div className="block has-text-weight-semibold">
                <label>Manage Schedule:</label>
              </div>
             
              <div className="block font-14">
                <Calendar
                  onChange={calenderCheck}
                  value={date}
                  minDate={
                    currentDate > new Date(selectedLocation?.fromScheduleDate)
                      ? currentDate
                      : new Date(selectedLocation?.fromScheduleDate)
                  }
                  maxDate={new Date(selectedLocation?.toScheduleDate)}
                />
              </div>
              
              <div className="font-14" onClick={checkChanges}>
                <Link to="/schedule/all" className="prime-color">
                  View All Schedules
                </Link>
              </div> 
               </Columns.Column>

            <Columns.Column>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {/*
                  <Button className="button save-btn" onClick={saveDateTimeSlots}>
                  Save
                </Button>
                */}
                 
                  <button
                    className={
                      locationTimeslots.some((slots) => slots.isActive === true)
                        ? "button is-white font-14 activeBtn"
                        : "button is-white font-14 disableBtn"
                    }
                    onClick={currentDeactivateAllSlots}
                  >
                    Deactivate All
                  </button>
                  
                  <button
                    className={
                      locationTimeslots.some(
                        (slots) => slots.isActive === false
                      )
                        ? "button is-white font-14 activeBtn"
                        : "button is-white font-14 disableBtn"
                    }
                    onClick={currentReactivateAllSlots}
                  >
                    Reactivate All
                  </button>
                </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "14px",
                  marginTop:"10px",
                  marginBottom:"25px"
                }}
              >
                <div style={{marginBottom:'10px'}}>
                  <span>
                    <Moment format="MMMM DD, YYYY">
                      {date ? date : currentDate}
                    </Moment>
                  </span>
                  - {showMetaData()}
                </div>
                <Button
                  className="button is-info is-outlined"
                  onClick={saveScheduleChange}
                >
                  Save Schedule Changes
                </Button>
                
              </div>
              <Columns className="font-14">
                {locationTimeslots.map((item, index) => (
                  <Columns.Column
                    key={item.locationTimeslotID}
                    className="is-3"
                  >
                    <ScheduleCard
                      isActionButton={false}
                      primaryText={getTimeslot(
                        item.fromTimeSlot,
                        item.toTimeSlot
                      )}
                      secondaryText={`${item.maxCapacity} shots`}
                      maxCapacity={item.maxCapacity}
                      isActive={item.isActive}
                      locationTimeslotID={item.locationTimeslotID}
                      toggleStatus={(id) => toggleTimeslotStatus(id)}
                    ></ScheduleCard>
                  </Columns.Column>
                ))}
                <Columns.Column className="is-4">
                  <div className="button is-info is-outlined">&nbsp;&nbsp;<FontAwesomeIcon icon={faPlus} />
                  &nbsp;Add Custom Timeslot&nbsp;&nbsp;</div>
                </Columns.Column>
              </Columns>
            </Columns.Column>
            </Columns>   
        </div>
      )}
    </Container>
  );
}

export default LocationDetails;
