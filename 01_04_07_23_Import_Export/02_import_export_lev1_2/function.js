export const readData = (array) => {
  console.log(array);
};
export const firstElmFromArray = (array) => {
  console.log("Erstes Element");
  console.log(array[0]);
};

export const allElmExceptLastFromArray = (array) => {
  console.log("Alles außer Letztes");
  console.log(array.slice(0, -1));
};
export const lastElmFromArray = (array) => {
  console.log("Letztes Element");
  console.log(array.slice(-1));
};
export const allElmExceptFirstFromArray = (array) => {
  console.log("Alles außer Erstes");
  console.log(array.slice(1));
};
export const deleteElementFromArray = (array) => {
  console.log("Lösche Element");
  console.log(array.splice(2, 3));
};
export const deleteDuplicates = (array) => {
  console.log("Lösche Duplikate");
  let uniqueChars = array.filter((elm, index) => {
    return array.indexOf(elm) === index;
  });
  console.log(uniqueChars);
};
export const sumNumbersArray = (array) => {
  console.log("Bilde Summe aus Zahlen");

  let sum = array.reduce(function (a, b) {
    return a + b;
  });
  console.log(sum);
};
