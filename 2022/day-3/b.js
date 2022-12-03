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

// found this helper function here: https://typeofnan.dev/how-to-split-an-array-into-a-group-of-arrays-in-javascript/
// it breaks the elves in to groups
function createGroups(arr, numGroups) {
  const perGroup = Math.ceil(arr.length / numGroups);
  return new Array(numGroups)
    .fill("")
    .map((_, i) => arr.slice(i * perGroup, (i + 1) * perGroup));
}

function rucksackSorter(inputData) {
  // cleaning up data
  const input = inputData.trim();
  const rucksacks = input.split(/\n/);
  const groupedElves = createGroups(rucksacks, rucksacks.length / 3);

  const collectorArray = [];

  // loop through groups of elves
  for (let group of groupedElves) {
    const firstElfBag = group[0].split("");
    const secondElfBag = group[1];
    const thirdElfBag = group[2];

    // find their common elements
    for (let element of firstElfBag) {
      if (secondElfBag.includes(element) && thirdElfBag.includes(element)) {
        collectorArray.push(element);
        break;
      }
    }
  }
  // get their totals
  let collectionTotalizer = 0;
  collectorArray.forEach((element) => {
    const currentLetter = element;
    if (element.toUpperCase() === currentLetter) {
      collectionTotalizer += 26 + alphabetValues[element.toLowerCase()];
    } else {
      collectionTotalizer += alphabetValues[element];
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

/** Rucksack Reorganization: part 2
 * INPUT: a bunch of strings meant to represent a rucksack
 * - divide input for every group of three elves
 * - loop through these groups of three
 *   - find the common element among them
 *   - push the common element to an array
 * - loop through the holder array and get the total
 * OUTPUT: the total common elements per each group of three elves
 */
