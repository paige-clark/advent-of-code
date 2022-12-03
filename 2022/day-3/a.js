const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").toString();

const alphabetValues = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
};

function rucksackSorter(inputData) {
  // cleaning up data
  const input = inputData.trim();
  const rucksacks = input.split(/\n/);

  const collectorArray = [];

  for (let rucksack of rucksacks) {
    // find the middle and end of each rucksack
    const rucksackSplit = rucksack.length / 2;
    const rucksackBottom = rucksack.lengh;

    // slice each rucksack in two
    const compartmentOne = rucksack.slice(0, rucksackSplit).split("");
    const compartmentTwo = rucksack.slice(rucksackSplit, rucksackBottom);

    // find the common element
    for (let element of compartmentOne) {
      if (compartmentTwo.includes(element)) {
        collectorArray.push(element);
        break;
      }
    }
  }
  // find the total of the common elements
  let collectionTotalizer = 0;
  collectorArray.forEach((element) => {
    const currentLetter = element;
    if (element.toUpperCase() === currentLetter) {
      collectionTotalizer += (26 + alphabetValues[element.toLowerCase()]);
    } else {
      collectionTotalizer += alphabetValues[element]
    }
  });
  return collectionTotalizer;
}

const testInput = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;

console.log(rucksackSorter(input));

/** Rucksack Reorganization: part 1
 * INPUT: a bunch of strings meant to represent a rucksack
 *        with two compartments:
 *        - 1/2 of string is one compartment
 *        - 2/2 of string is other compartment
 * - clean up the input
 * - turn the input in to an array
 * - establish a collector array
 * - loop through each array
 *   - cut the array in to two parts
 *   - find the common element in both strings, push it to a collector array
 * - loop through the collector array and total all of its character's
 *   ascii values
 * OUTPUT: the total "priority value" aka the ascii values of all the common
 *         elements
 */
