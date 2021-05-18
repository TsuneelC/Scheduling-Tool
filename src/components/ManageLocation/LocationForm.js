import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./styles.css";

import { Container, Heading, Columns, Button } from "react-bulma-components";

// import SelectorPill from "../Common/SelectorPill";
import SelectorPillList from "../Common/SelectorPillList";
import { timeToDate } from "../../services/date.service";

import { DAYS } from "../../mock/Days";
import { TIMESLOT_DURATIONS } from "../../mock/TimeslotDuration";
import ManageZipCodes from "../ManageZipCodes";
import { populateEditLocationForm } from "../../services/location.service";

const schema = yup.object().shape({
  locationName: yup.string().required("Location Name is required"),
  vaccineTypeID: yup.string().required("Vaccine Manufacturer is required"),
  address: yup.string().required("Address is required"),
  zip: yup
    .string()
    .required("Zip Code is required")
    .matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, "Invalid Zip Code"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  activeFromDates: yup.date().required("From Date is required"),
  activeToDates: yup.date().required("To Date is required"),
  fromTimeSlot: yup.string().required("From Time is required"),
  toTimeSlot: yup.string().required("To Time is required"),
  maxCapacity: yup
    .string()
    .required("Maximum Vaccination Capacity is required"),
});

function LocationForm(props) {
  const history = useHistory();
  const {
    editMode,
    selectedLocation,
    vaccineTypes,
    selectedClientId,
    saveClientLocation,
    saveLocationTimeslots,
    selectedLocationId,
  } = props;
  const preLoadedValues = editMode
    ? populateEditLocationForm(selectedLocation)
    : {};
  const { register, handleSubmit, errors, getValues } = useForm({
    defaultValues: preLoadedValues,
    resolver: yupResolver(schema),
  });

  const [daysOfOperation, setDaysOfOperation] = useState([]);
  const [lengthofVaccineInMins, setLengthofVaccineInMins] = useState("");
  const [selectedZipcodes, setSelectedZipcodes] = useState([]);

  const onZipListChange = (data) => {
    const zipCodes = data.map((i) => i.value);
    setSelectedZipcodes(zipCodes);
  };

  const onSubmit = (data) => {
    const locationPayload = {
      clientLocationID: 0,
      locationName: data.locationName,
      locationAddress: `${data.address} ${data.city} ${data.state} ${data.zip}`,
      clientID: parseInt(data.selectedClientId),
      vaccineTypeID: parseInt(data.vaccineTypeID),
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
      isActive: true,
      locationZipCode: selectedZipcodes,
      activeFromDates: data.activeFromDates.toISOString(),
      activeToDates: data.activeToDates.toISOString(),
      scheduleDays: "MON",
    };
    saveClientLocation(locationPayload);

    const timeslotPayload = {
      clientLocationID: 0,
      locationTimeslotID: 0,
      fromDateSlot: data.activeFromDates.toISOString(),
      toDateSlot: data.activeToDates.toISOString(),
      fromTimeSlot: timeToDate(data.activeFromDates, data.fromTimeSlot),
      toTimeSlot: timeToDate(data.activeToDates, data.toTimeSlot),
      lengthofVaccineInMins: lengthofVaccineInMins,
      daysOfOperation: daysOfOperation,
      maxCapacity: data.maxCapacity,
      capacityReached: true,
      isActive: true,
    };
    saveLocationTimeslots(timeslotPayload);
  };

  const cancel = () => {
    if (editMode) {
      history.push(`/location-details/${selectedLocationId}`);
    } else {
      history.push(`/landingPage`);
    }
  };

  const onDaysChange = (selectedData) => {
    setDaysOfOperation(selectedData);
  };

  const onDurationChange = (selectedData) => {
    setLengthofVaccineInMins(selectedData);
  };





  return (
    <Container style={{marginTop:'65px',marginBottom:'65px',paddingBottom:'65px'}}>

    
<nav className="breadcrumb block" aria-label="breadcrumbs" style={{ marginBottom: "35px"}}>
              <ul>
                  <li><a href="/landingPage">Location List</a></li>
                  <li className="is-active"><a href="#" aria-current="page">Create New Location</a></li>
             </ul>
         </nav>


      <Columns className="bubble-mang">
        <Heading size={3} style={{ marginBottom:'50px' }}>
        {editMode ? "Edit" : "Add New"} Location
        </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Columns>
          <Columns.Column>
            <div className="control">
              <label className="bold">Location Name: </label>
              <input
                className="input mt-2"
                type="text"
                placeholder="Location Name"
                name="locationName"
                ref={register}
              />
              <div className="error">{errors["locationName"]?.message}</div>
            </div>
          </Columns.Column>
          <Columns.Column>
            <div className="control">
              <label className="bold">Address:</label>
              <input
                className="input mt-2"
                type="text"
                placeholder="Address"
                name="address"
                ref={register}
              />
              <div className="error">{errors["address"]?.message}</div>
            </div>
          </Columns.Column>
          <Columns.Column>
          <div className="control">
                  <label className="bold">City:</label>
                  <input
                    className="input mt-2"
                    type="text"
                    placeholder="City"
                    name="city"
                    ref={register}
                  />
                  <div className="error">{errors["city"]?.message}</div>
                </div>
          </Columns.Column>
        </Columns>

        

        <Columns>

          


          <Columns.Column>
            <Columns>
             <Columns.Column>
                <div className="control">
                  <label className="bold">State:</label>
                  <input
                    className="input mt-2"
                    type="text"
                    placeholder="State"
                    name="state"
                    ref={register}
                  />
                  <div className="error">{errors["state"]?.message}</div>
                </div>
              </Columns.Column>
              <Columns.Column>
                <div className="control">
                  <label className="bold">Zip Code:</label>
                  <input
                    className="input mt-2"
                    type="text"
                    placeholder="Zip Code"
                    name="zip"
                    ref={register}
                  />
                  <div className="error">{errors["zip"]?.message}</div>
                </div>
              </Columns.Column>
            </Columns>
          </Columns.Column>

          <Columns.Column>
            <Columns>
              <Columns.Column>
                <div className="control">
                  <label className="bold">Scheduled Dates:</label>
                  <input
                    className="input mt-2"
                    type="date"
                    placeholder="From"
                    name="activeFromDates"
                    ref={register}
                  />
                  <div className="error">
                    {errors["activeFromDates"]?.message}
                  </div>
                </div>
              </Columns.Column>
              <Columns.Column>
                <div className="control">
                  <label style={{ visibility: "hidden" }}>
                    Scheduled Dates:
                  </label>
                  <input
                    className="input mt-2"
                    type="date"
                    placeholder="To"
                    name="activeToDates"
                    ref={register}
                  />
                  <div className="error">
                    {errors["activeToDates"]?.message}
                  </div>
                </div>
              </Columns.Column>
            </Columns>
          </Columns.Column>

          
          
        </Columns>

        <Columns>
          <Columns.Column>
            <div>
              <label className="bold">Vaccine Manufacturer:</label>
            </div>
            
            <div className="control mt-2">
              <div className="select">
                <select name="vaccineTypeID" ref={register}>
                  <option>Select Vaccine Manufacturer</option>
                  {vaccineTypes.map((item) => (
                    <option key={item.vaccineTypeID} value={item.vaccineTypeID}>
                      {item.vaccineTypeName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Columns.Column>
         
        </Columns>
        <ManageZipCodes
          initialZips={selectedLocation?.locationZipCode}
          onZipListChange={onZipListChange}
        />

        <Columns>
          <Columns.Column>
            <Heading size={4} style={{ marginBottom:'20px',marginTop:'45px' }}>
              Vaccination Schedule Parameters:
            </Heading>
              <div>
             <label className="bold">Days of Operation:</label>
              </div>
              <SelectorPillList
         
             multiple={true}
             items={DAYS}
             onPillSelect={onDaysChange}>
            </SelectorPillList>
          </Columns.Column>



          <Columns.Column>
            
                <div className="control mt57">
                  <label className="bold">Hours of Operation:</label>
                  <input
                    className="input mt-2"
                    type="time"
                    placeholder="From"
                    name="fromTimeSlot"
                    ref={register}
                  />
                  <div className="error">{errors["fromTimeSlot"]?.message}</div>
                </div>
                
              </Columns.Column>
              <Columns.Column>
                <div className="control mt57">
                  <label style={{ visibility: "hidden",fontWeight:"bold"}} className="bold">
                    Hours of Operation:
                  </label>
                  <input
                    className="input mt-2"
                    type="time"
                    placeholder="To"
                    name="toTimeSlot"
                    ref={register}
                  />
                  <div className="error">{errors["toTimeSlot"]?.message}</div>
                </div>
              </Columns.Column>
            

          
        </Columns>
        
        
      <Columns>
         <Columns.Column>
          <div>
           <label className="bold">Vaccination Pace:</label>
            <br/>
            <label>
          length of vaccine timeslots</label>
          </div>
           <SelectorPillList
            multiple={false}
            items={TIMESLOT_DURATIONS}
            onPillSelect={onDurationChange}>
           </SelectorPillList>
         </Columns.Column>

          <Columns.Column>
            <div className="control">
              <label className="bold">
                Vaccination Velocity:</label>
                <br/>
                <label>
                number of vaccines given per timeslot:
                </label>
              
              <input
                className="input mt-2"
                type="number"
                placeholder="Number of Vaccines"
                name="maxCapacity"
                ref={register}
              />
              <div className="error">{errors["maxCapacity"]?.message}</div>
            </div>
          </Columns.Column>
         
        </Columns>

        <Button
          className="button is-info w-275"
          style={{ marginRight: "10px",marginTop:'60px' }}
          type="submit"
        >
          Confirm
        </Button>

        <Button className="button f-right is-info is-outlined w-275" 
         style={{ marginTop:'60px' }}       
                onClick={cancel}>
       Cancel 
        </Button>
      </form>
      </Columns>
    </Container>
  );
}

export default LocationForm;
