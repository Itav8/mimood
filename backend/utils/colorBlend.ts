import { LEVELS } from "@prisma/client";

export const convertHexToRGB = (color: string) => {
  const r = parseInt(color.substr(1, 2), 16);
  const g = parseInt(color.substr(3, 2), 16);
  const b = parseInt(color.substr(5, 2), 16);
  return [r, g, b];
};

export const colorBlend = (userColor: Array<number>) => {
  const r = userColor[0];
  const g = userColor[1];
  const b = userColor[2];

  let opacity = 1;

  const colors = Object.keys(LEVELS).reduce((accum, key) => {
    const color = `rgb(${r}, ${g}, ${b}, ${opacity})`;
    opacity -= 0.25;
    accum[key] = color;
    return accum;
  }, {});

  return colors;
};
