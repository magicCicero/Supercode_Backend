import {
  readData,
  firstElmFromArray,
  allElmExceptLastFromArray,
  lastElmFromArray,
  allElmExceptFirstFromArray,
  deleteElementFromArray,
  deleteDuplicates,
  sumNumbersArray,
} from "./function.js";
import { names, numbers } from "./data.js";

readData(names);
readData(numbers);
firstElmFromArray(names);
firstElmFromArray(numbers);
allElmExceptLastFromArray(names);
allElmExceptLastFromArray(numbers);
lastElmFromArray(names);
lastElmFromArray(numbers);
allElmExceptFirstFromArray(names);
allElmExceptFirstFromArray(numbers);
deleteElementFromArray(names);
deleteElementFromArray(numbers);
deleteDuplicates(numbers);
sumNumbersArray(numbers);
