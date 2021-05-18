import * as moment from "moment";

export const populateEditLocationForm = (selectedLocation) => {
  const preLoadedValues = {
    locationName: selectedLocation.locationName,
    address: selectedLocation.address,
    vaccineTypeID: selectedLocation.vaccineTypeID,
    zip: selectedLocation.zip,
    city: selectedLocation.city,
    state: selectedLocation.state,
    activeFromDates: moment(new Date(selectedLocation.activeFromDates)).format(
      "YYYY-MM-DD"
    ),
    activeToDates: moment(new Date(selectedLocation.activeToDates)).format(
      "YYYY-MM-DD"
    ),
    fromTimeSlot: moment(new Date(selectedLocation.activeFromDates)).format(
      "HH:mm"
    ),
    toTimeSlot: moment(new Date(selectedLocation.activeToDates)).format(
      "HH:mm"
    ),
    maxCapacity: selectedLocation.maxCapacity,
  };
  return preLoadedValues;
};
