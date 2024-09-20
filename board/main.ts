import five from "johnny-five";
import { addTemperature } from "./chromia";

const board = new five.Board();

// Termistor parameters
const beta = 3950;
const resistance = 10;

board.on("ready", function () {
  const sensor = new five.Sensor({
    pin: "A0",
    freq: 1000,
    threshold: 10,
  });
  sensor.on("change", async function () {
    // @ts-ignore
    const analogValue = this.scaleTo(0, 1023);
    const { celcius } = analogValueToTemperature(analogValue);
    console.log(celcius);
    await addTemperature(celcius);
  });
});

function analogValueToTemperature(val: number) {
  const celcius =
    beta /
      (Math.log(((1025.0 * resistance) / val - resistance) / resistance) +
        beta / 298.0) -
    273.0;
  const fahrenheit = 1.8 * celcius + 32.0;

  return {
    celcius,
    fahrenheit,
  };
}
