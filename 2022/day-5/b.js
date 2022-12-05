const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").toString();

// [T]     [D]         [L]
// [R]     [S] [G]     [P]         [H]
// [G]     [H] [W]     [R] [L]     [P]
// [W]     [G] [F] [H] [S] [M]     [L]
// [Q]     [V] [B] [J] [H] [N] [R] [N]
// [M] [R] [R] [P] [M] [T] [H] [Q] [C]
// [F] [F] [Z] [H] [S] [Z] [T] [D] [S]
// [P] [H] [P] [Q] [P] [M] [P] [F] [D]
//  1   2   3   4   5   6   7   8   9

const crates = [
  ["P", "F", "M", "Q", "W", "G", "R", "T"],
  ["H", "F", "R"],
  ["P", "Z", "R", "V", "G", "H", "S", "D"],
  ["Q", "H", "P", "B", "F", "W", "G"],
  ["P", "S", "M", "J", "H"],
  ["M", "Z", "T", "H", "S", "R", "P", "L"],
  ["P", "Y", "H", "N", "M", "L"],
  ["F", "D", "Q", "R"],
  ["D", "S", "C", "N", "L", "P", "H"],
];

// [D]
// [N] [C]
// [Z] [M] [P]
//  1   2   3

// move 1 from 2 to 1
// move 3 from 1 to 3
// move 2 from 2 to 1
// move 1 from 1 to 2

const testCrates = [["Z", "N"], ["M", "C", "D"], ["P"]];

const testCommands = `
move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

const crateSorter = (inputData, crates) => {
  const input = inputData.trim();
  const commands = input.split(/\n/);

  for (let command of commands) {
    const currentCommands = command.split(" ");

    let numOfCratesToMove = Number(currentCommands[1]);
    const pileToMoveFrom = Number(currentCommands[3]);
    const pileToMoveTo = Number(currentCommands[5]);

    const currentPile = crates[pileToMoveFrom - 1];
    const stackToMove = currentPile.splice(
      currentPile.length - numOfCratesToMove,
      numOfCratesToMove
    );
    crates[pileToMoveTo - 1].push(...stackToMove);
  }
  
  let output = [];
  for (let crate of crates) {
    output.push(crate[crate.length - 1]);
  }
  return output.join("");
};

console.log(crateSorter(input, crates));

/** Supply Stacks Part 2!
 * INPUT: A list of commands and an array of arrays
 * + Loop through the commands
 *  + While looping through the commands, cut up the moves in to
 *    their correct numbers
 *  + This time, rather than moving the crates one at a time, slice the piles
 *    and move chunks
 *    + The tricky thing here seems to be, how to get full slice and how to
 *      remove the slice from the pile it's coming from
 * + Once done, read the last crate in each line, or just print the crates, whatever
 * OUTPUT: The crate at the top of each stack
 */
