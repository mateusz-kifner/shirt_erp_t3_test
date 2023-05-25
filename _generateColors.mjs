import tinycolor from "tinycolor2";

// @ts-ignore
function generateColors(h, steps, name = "_") {
  console.log(`"${name}": {`);
  for (let i = 1; i <= steps + 1; i++) {
    const newColor = tinycolor({
      h,
      s: 1,
      v: i / (steps + 1),
    });

    console.log(`"${name} ${i}":"${newColor.toHexString()}",`);
  }

  for (let i = 1; i <= steps; i++) {
    const newColor = tinycolor({
      h,
      s: 1 - i / (steps + 1),
      v: 1,
    });

    console.log(`"${name} ${i + steps + 1}":"${newColor.toHexString()}",`);
  }
  console.log("},");
}

generateColors(0, 5, "Red");
generateColors(30, 5, "Orange");
generateColors(60, 5, "Yellow");
generateColors(100, 5, "Lime");
generateColors(120, 5, "Green");
generateColors(140, 5, "Mint");
generateColors(180, 5, "Cyan");
generateColors(200, 5, "Blue");
generateColors(220, 5, "Blue2");
generateColors(240, 5, "Deep Blue");
generateColors(260, 5, "Violet");
generateColors(300, 5, "Pink");
generateColors(340, 5, "Deep Pink");

export default generateColors;
