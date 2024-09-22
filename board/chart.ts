import { getTemperature } from "./chromia";
import * as asciichart from "asciichart";

(async function main() {

  while (true) {
    const addr = "031b84c5567b126440995d3ed5aaba0565d71e1834604819ff9c17f5e9d5dd078f";
    const result = await getTemperature(addr) as { temperature: string }[];
    const resultLength = result.length;
    const chartArray = new Array(resultLength);
    for (let i = 0; i < resultLength; i++) {
      chartArray[i] = Number(result[i].temperature);
    }
    process.stdout.write("\x1B[2J\x1B[0f");
    process.stdout.write(asciichart.plot(chartArray));
    await setTimeout(() => {}, 10);
  }
})();
