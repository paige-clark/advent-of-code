const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").toString();
const testInput = `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`;

const seatCleaningCatastrophe = (inputData) => {
  // cleaning up data
  const input = inputData.trim();
  const cleaningPairs = input.split(/\n/);

  let counter = 0;

  for (let pair of cleaningPairs) {
    const splitPairs = pair.split(",");
    // first elf range
    const firstElfStart = Number(splitPairs[0].split("-")[0]);
    const firstElfEnd = Number(splitPairs[0].split("-")[1]);
    // second elf range
    const secondElfStart = Number(splitPairs[1].split("-")[0]);
    const secondElfEnd = Number(splitPairs[1].split("-")[1]);

    if (
      (firstElfStart >= secondElfStart && firstElfEnd <= secondElfEnd) ||
      (firstElfStart <= secondElfStart && firstElfEnd >= secondElfStart) ||
      (secondElfStart >= firstElfStart && secondElfEnd <= firstElfEnd) ||
      (secondElfStart <= firstElfStart && secondElfEnd >= firstElfStart)
    ) {
      counter++;
    }
  }
  return counter;
};

console.log(
  "The number of total overlaps:",
  seatCleaningCatastrophe(input)
);

/** Camp Cleanup part 2
 * INPUT: an array of seat ranges that pairs of elves will be cleaning
 * - 
 * OUTPUT: the number of pairs that need to be changed because
 *         their seat range contains any overlap at all
 */
