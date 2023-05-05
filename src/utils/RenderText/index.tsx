import React, { ReactNode } from "react";
//import { isObject } from "lodash";
//import { FormattedMessage } from "react-intl";
import {
  isDefined,
  isNotDefined,
  isNotDefinedOrEmpty,
} from "../helper";
import { has, isNumber, isObject, isString } from "lodash";
import { FormattedMessage } from "react-intl";
import { Box } from "@mui/material";

interface RenderTextProps {
  value: any; // string | number | object;
}

const RenderText = ({ value }: RenderTextProps) => {
  //console.log("RenderText value", value);
  if (isNotDefined(value)) {
    return <Box />;
  }

  if (isNumber(value)) return <Box>{value}</Box>;

  if (isString(value)) return <Box>{value}</Box>;

  if (isObject(value) && has(value, "defaultMessage")) {
    return <FormattedMessage {...value} />;
  }

  if (isObject(value) && has(value, "label")) {
    // @ts-ignore
    return value.label;
  }

  //return isObject(value) ? <FormattedMessage {...value} /> : value;

  return <Box />;
};

export default RenderText;
