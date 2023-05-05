const colors: any = {
  black: "#000000",
  white: "#ffffff", //                --white-100
  white2: "#f2f2f2",
  white3: "#eff3fa",
  generalCyan1: "#3ba5df",
  generalCyan2: "#4cc2e8",
  textMainBody: "#353945",
  highlight: "#63bcdf",
  valuesMiddleValue: "#e98927",
  dark: "#141414",
  gdBlue1: "#3a4b95", //#3a4b95
  generalDarkBlue1: "#1d2442",
  generalDarkBlue2: "#2d2442",
  generalDarkBlue3: "#2c42ac",
  generalDarkBlue4: "#2f68e3",
  generalLightBlue1: "#a1a9d0",
  generalLightBlue2: "#6e7d9c",
  generalLightScreenBg: "#e7e9f0",
  generalDarkScreenBg: "#141432",
  generalNotification1: "#3e5cee",
  generalPurple1: "#7a56f3",
  buttonsCtaPrimary: "#289bea",
  bwWhite100: "#fff",
  hfBlue3: "#1d1d42",
  gridsFilterOff: "rgba(166, 166, 190, 0.5)",
  gridsGridRef: "#8947ce",
  textDark2: "#4c5064",
  textDark3: "#060606",
  valuesPositivePrimary: "#0aab45",
  valuesPositiveLight: "#d9f3e3",
  valuesNegativePrimary: "#ab0100",
  valuesNegativeLight: "#f4d9d8",
  valuesNegativeDark: "#e92e2d",
  valuesPositiveDark: "#27cc64",
  valuesContract1: "#c9265d",
  valuesContract2: "#3ba5df",
  gridsCaptions: "#7c8fc1",
  gridsHover: "#203283",
  gridsHoverBg: "#a7b8fe",
  gridsDefaultText: "#434343",
  widgetsLightTitleBg1: "#f9fbff",
  widgetsLightTitleBg2: "#f9fbff",
  widgetsMiniTitle: "#4870c1",
  bwWhite40: "rgba(255, 255, 255, 0.4)",
  bwWhite80: "rgba(255, 255, 255, 0.8)",
  charts01: "#dcb26b",
  charts02: "#c5c152",
  charts03: "#54c895",
  charts04: "#5f73df",
  charts05: "#c75ac9",
  bwWhite10: "#4c5787",
  bwWhite5: "rgba(255, 255, 255, 0.05)",
  bwBlack100: "#000",
  bwBlack80: "rgba(0, 0, 0, 0.8)",
  widgetsLightOutsideContainer: "#dde0ea",
  widgetsDarkOutsideContainer: "rgba(0, 0, 0, 0.03)",
  negativeDark20: "rgba(233, 46, 45, 0.2)",
  widgetsDarkMiniTitle: "#bec9f5",
  black10: "rgba(0, 0, 0, 0.1)",
  tableHeader2: "#84858a",
  tableFooter: "#f6f8fc",

  /////////////////////////////////////////////////////////////////
  darkRed: "#ab0100", //              --values-negative-primary
  brightRed: "#e92e2d", //            --values-negative-second
  lightGrayistRed: "#f4d9d8", //      --values-negative-light

  orange: "#ceac73", //               --hfa-primary , --ceac-73
  brightOrange: "#e98927", //         --middle,

  strongCyan: "#27cc64", //           --values-positive-second
  darkCyan: "#0aab45", //             --values-positive-primary
  softCyan: "#4cc2e8", //             --766-ce-6
  lightGrayistCyan: "#d9f3e3", //     --values-positive-light

  darkGray1: "#141414", //            --dark
  darkGray2: "#060606", //            --text-dark-3

  brightBlue1: "#3ba5df", //          --3-ba-5-df
  brightBlue2: "#289bea", //          --cta-primary
  brightBlue3: "#3e5cee", //          --notif

  darkBlue1: "#1d2442", //            --hf-blue-2 // Very dark desaturated blue
  darkBlue2: "#2c42ac", //            --dark-2
  darkBlue3: "#1d1d42", //            --hf-blue-3

  softBlue1: "#5c74eb", //            --invalid-name
  softBlue2: "#63bcdf", //            --highlight
  softBlue3: "#7a56f3", //            --hfa-primary-3

  lightBlue1: "#79a0ff",
  paleBlue: "#f9fbff",

  moderateBlue1: "#3e6fd4", //        --000001
  moderateBlue2: "#4b72d3", //        --primary-blue-2

  desaturatedBlue: "#6a77b5",

  grayishBlue1: "#a1a9d0", //         --secondary
  grayishBlue2: "#a5a5bd", //         --filter-off: rgba(166, 166, 190, 0.5)
  grayishBlue3: "#97a1c3", //         --text-grids-captions
  grayishBlue4: "#9da7ce",
  grayishBlue: "#a8bcd6",

  lightGrayistBlue1: "#f9fafc", //    --f-9-fafc
  lightGrayistBlue2: "#e9e9ec", //    --backgrounds-bg-gray-light-1
  lightGrayistBlue3: "#e7e6ec", //    --bg-gray-3
  lightGrayistBlue4: "#f7f8fd",
  lightGrayistBlue5: "#e7e9f0",
  lightGrayistBlue6: "#d5dae6",
  darkGrayistBlue1: "#353945", //     --text
  darkGrayistBlue2: "#87859a", //     --text-gray-1
  darkGrayistBlue3: "#4c5064", //     --text-dark-2
  darkGrayistBlue4: "#7d849e",
  widgetsLightTitleBg: "#f3f7ff",
  grey1: "#9EA4B3",
  grey2: "#C5CBDB",
  grey3: "#E9ECF4",
  grey4: "#F7F8FC",
  grey5: "#F3F3F3",
  grey6: "#fcfcfc",
  grey7: "#F0F0F0",
  grey8: "#F7F7FC",
  blue1: "#1D2B3C",
  blue2: "#485563",
  blue3: "#8092A5",
  blue4: "#F0F5FC",
  green1: "#5DA702",
  green2: "#7BCB09",
  green3: "#A6EA44",
  green4: "#EDFFD2",
  green5: "#5ba702",
  green6: "#20CC81",
  indigo1: "#171E3A",
  indigo2: "#333D66",
  indigo3: "#6779A9",
  indigo4: "#ECEDF7",
  indigo5: "#CED3E1",
  supportRed: "#F5523C",
  supportBlue: "#1974FE",
  supportGreen: "#32C284",
  supportOrange: "#F4B63E",
  // white: '#ffffff',
  appBackground: "#FAFBFC",
  blueViolet: "#8A2BE2",
  transparent: "transparent",
  alienArmpit: "#7BCB09",
  greenCyan: "#32c284",
  bayOfMany: "#333D66",
};

export default colors;
