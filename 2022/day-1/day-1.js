/**
 * INPUT: a string of numbers, each space signifies a group of numbers
 * - establish a highest array value
 * - split the input string in to an array of arrays
 *  - loop through the array of arrays, totalling each array
 *    - check to see if that array total is higher than the highest
 *      - if it is, replace the number
 *      - if not, go to the next one
 * OUPUT: the total of the group with the highest value
 */

// uses fs to read the data for the challenge
const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").toString();

function getMostCalories(input) {
  // establishes an empty array to collect calorie totals
  let highestCalories = [];
  // splits the test data string
  const splitUpInput = input.split(/\n\n/gi);
  // loops through all the inputs which are currently in an array
  for (elfLoad in splitUpInput) {
    const tempLoad = splitUpInput[elfLoad].split(/\n/gi).toString().split(",");
    // calculates the caloric total per elf
    let loadSum = tempLoad.reduce((accumulator, currentVal) => {
      return Number(accumulator) + Number(currentVal);
    }, 0);
    highestCalories.push(loadSum);
  }
  highestCalories.sort((a, b) => b - a);
  return highestCalories[0] + highestCalories[1] + highestCalories[2];
}

console.log(getMostCalories(input));

/**
 * THOUGHTS:
 * Zach mentioned to look in to solving this sort of problem with
 * a min-max heap:
 * https://en.wikipedia.org/wiki/Min-max_heap
 * 
 * Generally had to look for guidance with this solution but I mainly
 * was stuck with breaking the data down in to the shape that I wanted.
 */