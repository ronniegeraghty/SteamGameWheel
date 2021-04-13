const getColor = (index: number, numberOfSegments: number): string => {
  const HIGHEST_DEC_FOR_HEX_COLOR = 1530;
  let normalizedNum = Math.round(
    (HIGHEST_DEC_FOR_HEX_COLOR * index) / numberOfSegments
  );
  let hexColor = "000000";
  let red = 0;
  let green = 0;
  let blue = 0;
  if (normalizedNum < 255 * 1) {
    red = 255;
    green = normalizedNum;
  } else if (normalizedNum < 255 * 2) {
    green = 255;
    red = 255 - (normalizedNum - 255);
  } else if (normalizedNum < 255 * 3) {
    red = 0;
    green = 255;
    blue = normalizedNum - 510;
  } else if (normalizedNum < 255 * 4) {
    red = 0;
    green = 255 - (normalizedNum - 255 * 3);
    blue = 255;
  } else if (normalizedNum < 255 * 5) {
    red = normalizedNum - 255 * 4;
    blue = 255;
  } else {
    red = 255;
    blue = 255 - (normalizedNum - 255 * 5);
  }
  hexColor =
    "#" + decToColorHex(red) + decToColorHex(green) + decToColorHex(blue);
  // console.log(
  //   `INDEX:${index}\nNORMALIZED_NUM:${normalizedNum}\nHEX_COLOR:${hexColor}`
  // );
  return hexColor;
};
const decToColorHex = (dec: number) => {
  if (dec > 255) {
    console.log("Dec outside of possible hex colors");
    return "00";
  }
  let hexString = dec.toString(16);
  let dif = 2 - hexString.length;
  for (var i = 0; i < dif; i++) {
    hexString = "0" + hexString;
  }
  return hexString;
};
export default getColor;
