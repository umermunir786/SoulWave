// import { Dimensions, PixelRatio, StatusBar } from "react-native";
// const { width, height } = Dimensions.get("window");
// const WINDOW_WIDTH = Dimensions.get("window").width;
// const WINDOW_HEIGHT = Dimensions.get("window").height;
// const SCREEN_WIDTH = Dimensions.get("screen").width;
// const SCREEN_HEIGHT = Dimensions.get("screen").height;

// const wp = (p) => width * (p / 100);
// const hp = (p) => height * (p / 100);

// const widthBaseScale = SCREEN_WIDTH / 430;
// const heightBaseScale = SCREEN_HEIGHT / 932;
// const scale = Math.min(widthBaseScale, heightBaseScale);

// function normalize(size, based = "width") {
//   const newSize =
//     based === "height" ? size * heightBaseScale : size * widthBaseScale;
//   return Math.round(PixelRatio.roundToNearestPixel(newSize));
// }
// const widthPixel = (size) => {
//   return normalize(size, "width");
// };
// const heightPixel = (size) => {
//   return normalize(size, "height");
// };

// const responsiveFontSizeNew = (size) => {
//   const newSize = size * scale;
//   return newSize / PixelRatio.getFontScale();
// };

// const fontPixel = (size) => {
//   return heightPixel(size);
// };

// const heightOfStatusBar = StatusBar?.currentHeight;

// export {
//   WINDOW_HEIGHT,
//   WINDOW_WIDTH,
//   SCREEN_HEIGHT,
//   SCREEN_WIDTH,
//   wp,
//   hp,
//   widthPixel,
//   heightPixel,
//   fontPixel,
//   responsiveFontSizeNew,
//   heightOfStatusBar,
// };



import { Dimensions, PixelRatio, StatusBar, ScaledSize } from "react-native";

// Get initial dimensions
let { width: windowWidth, height: windowHeight }: ScaledSize = Dimensions.get("window");
let { width: screenWidth, height: screenHeight }: ScaledSize = Dimensions.get("screen");

// Base dimensions from design (adjust accordingly)
const BASE_WIDTH = 430;
const BASE_HEIGHT = 932;

// Dynamic percentage-based width and height
const wp = (percentage: number): number => (windowWidth * percentage) / 100;
const hp = (percentage: number): number => (windowHeight * percentage) / 100;

// Use a single scale factor to maintain consistency
const scale: number = Math.min(windowWidth / BASE_WIDTH, windowHeight / BASE_HEIGHT);

// Normalize font and small UI elements
const normalize = (size: number): number => Math.round(PixelRatio.roundToNearestPixel(size * scale));

// Font scaling with font scale adjustment
const responsiveFontSize = (size: number): number => normalize(size) / PixelRatio.getFontScale();

// Function to convert pixels to percentage
const pxToPercentage = (px: number, based: "width" | "height" = "width"): number => {
  return based === "width" ? (px / windowWidth) * 100 : (px / windowHeight) * 100;
};

// Separate functions for width and height percentage conversion
const widthPercent = (px: number): number => pxToPercentage(px, "width");
const heightPercent = (px: number): number => pxToPercentage(px, "height");

// Get status bar height dynamically
const heightOfStatusBar: number = StatusBar?.currentHeight || 0;

export {
  windowWidth,
  windowHeight,
  screenWidth,
  screenHeight,
  wp,
  hp,
  widthPercent,
  heightPercent,
  responsiveFontSize,
  heightOfStatusBar,
};