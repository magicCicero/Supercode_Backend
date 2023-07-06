export const overOneHundredKPopulation = (arr) => {
  console.log("Städte, mit über 100.000 Einwohner");
  let newArray = arr.filter(function (el) {
    return el.population > 100000;
  });
  console.log(newArray);
};
export const underOneHundredKPopulation = (arr) => {
  console.log("Städte, mit weniger als 100.000 Einwohner");
  let newArray = arr.filter(function (el) {
    return el.population < 100000;
  });
  console.log(newArray);
};
