import {
  isEmpty,
  isNull,
  isNumber,
  isUndefined,
  toNumber as lodashToNumber,
  trim,
} from "lodash";

export const isDefined = (value: any) => {
  return !isUndefined(value) && !isNull(value);
};

export const isNotDefined = (value: any) => {
  return isUndefined(value) || isNull(value);
};

export const isNotDefinedOrEmpty = (value: any) => {
  return isUndefined(value) || isNull(value) || isEmpty(value);
};

export const isDefinedAndNotEmpty = (value: any) => {
  return !isUndefined(value) && !isNull(value) && !isEmpty(value);
};

export const toNumber = (value: string | number | undefined) => {
  if (isNotDefined(value)) return null;

  return lodashToNumber(value);
};

export const toString = (value: string | number | undefined) => {
  if (isNotDefined(value)) return null;
  if (isNumber(value)) return `${value}`;

  return trim(value);
};

export const getIdOrNull = (value: any) => {
  if (isNotDefinedOrEmpty(value)) return null;
  return value.id;
};
