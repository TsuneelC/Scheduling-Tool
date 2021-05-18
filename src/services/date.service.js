import * as moment from "moment";

export const timeToDate = (date = new Date(), time) => {
  const timeWithDate = new Date(`${date.toDateString()} ${time}`);
  const timeWithDateISO = timeWithDate.toISOString();
  return timeWithDateISO;
};

export const getTimeslot = (fromTime, toTime) => {
  const from = moment(new Date(fromTime)).format("hh:mm");
  const to = moment(new Date(toTime)).format("hh:mm");
  const result = `${from} - ${to}`;
  return result;
};
