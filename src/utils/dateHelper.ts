import {
  format as dateFnsFormat,
  formatDistance as dateFnsFormatDistance,
  formatISO,
  formatRelative,
  isDate,
  parseISO,
  subDays,
} from "date-fns";
import { isNotDefined } from "./helper";
import { isString } from "lodash";

export const dateFromISO = (data?: string) => {
  if (isNotDefined(data)) return null;

  if (isString(data)) return parseISO(data);

  return data;
};
export const dateToISO = (value?: any) => {
  const format = "yyyy-MM-dd";
  return formatDate({ value, format });
  /*
  //console.log("dateToISO value", value);
  if (isNotDefined(value)) return null;

  //console.log("dateToJson isDate", isDate(value));
  if (isDate(value)) return formatISO(value);

  //console.log("dateToJson isString", isString(value));
  if (isString(value)) return formatISO(parseISO(value));
  return value;
  */
};

export const formatDate = ({
  value,
  format = "yyyy-MM-dd",
}: {
  value: any;
  format?: any;
}) => {
  if (isNotDefined(value)) return null;

  //const format = "yyyy-MM-dd";
  if (isDate(value)) return dateFnsFormat(value, format);

  if (isString(value)) return dateFnsFormat(parseISO(value), format);

  return value;
};

export const formatDistance = (data?: string) => {
  if (isNotDefined(data)) return null;
  return dateFnsFormatDistance(dateFromISO(data) || new Date(), new Date(), {
    addSuffix: true,
  });
};
