import { arrayCars } from "./data.js";
import { arrayNumbers } from "./data.js";

function sortCars() {
  console.log(arrayCars.sort());
}
function sortNumbers() {
  console.log(arrayNumbers.sort());
}

export { sortCars, sortNumbers };
