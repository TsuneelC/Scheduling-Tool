var date = new Date();

const getDateTime = (h, m, s, ms) => {
  const timestamp = date.setHours(h, m, s, ms);
  const dateTime = new Date(timestamp).toISOString();
  return dateTime;
};
export const SCHEDULE_CARD_DATA = [
  {
    locationTimeslotID: 1,
    dateSlot: date.toISOString(),
    fromTimeSlot: getDateTime(8, 0, 0, 0),
    toTimeSlot: getDateTime(8, 30, 0, 0),
    maxCapacity: 100,
    capacityReached: true,
    isActive: true,
    clientLocationID: 11,
  },
  {
    locationTimeslotID: 2,
    dateSlot: date.toISOString(),
    fromTimeSlot: getDateTime(8, 30, 0, 0),
    toTimeSlot: getDateTime(9, 0, 0, 0),
    maxCapacity: 130,
    capacityReached: true,
    isActive: false,
    clientLocationID: 11,
  },
  {
    locationTimeslotID: 3,
    dateSlot: date.toISOString(),
    fromTimeSlot: getDateTime(9, 0, 0, 0),
    toTimeSlot: getDateTime(9, 30, 0, 0),
    maxCapacity: 10,
    capacityReached: true,
    isActive: false,
    clientLocationID: 11,
  },
  {
    locationTimeslotID: 4,
    dateSlot: date.toISOString(),
    fromTimeSlot: getDateTime(9, 30, 0, 0),
    toTimeSlot: getDateTime(10, 0, 0, 0),
    maxCapacity: 70,
    capacityReached: true,
    isActive: false,
    clientLocationID: 11,
  },
  {
    locationTimeslotID: 5,
    dateSlot: date.toISOString(),
    fromTimeSlot: getDateTime(10, 0, 0, 0),
    toTimeSlot: getDateTime(10, 30, 0, 0),
    maxCapacity: 70,
    capacityReached: true,
    isActive: false,
    clientLocationID: 11,
  },
  {
    locationTimeslotID: 6,
    dateSlot: date.toISOString(),
    fromTimeSlot: getDateTime(10, 30, 0, 0),
    toTimeSlot: getDateTime(11, 0, 0, 0),
    maxCapacity: 70,
    capacityReached: true,
    isActive: false,
    clientLocationID: 11,
  },
  {
    locationTimeslotID: 7,
    dateSlot: date.toISOString(),
    fromTimeSlot: getDateTime(11, 0, 0, 0),
    toTimeSlot: getDateTime(11, 30, 0, 0),
    maxCapacity: 70,
    capacityReached: true,
    isActive: false,
    clientLocationID: 11,
  },
];
