const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").toString();

const testInput = `
30373
25512
65332
33549
35390
`;

const treeHousePlotter = (inputData) => {
  const treeinput = inputData.trim();
  const treeGridData = treeinput.split(/\n/);

  // create a clean tree matrix to loop over
  const treeMatrix = [];
  for (const treeRow of treeGridData) {
    const splitRow = treeRow.split("");
    const cleanedRow = [];
    splitRow.forEach((tree) => {
      cleanedRow.push(Number(tree));
    });
    treeMatrix.push(cleanedRow);
  }
  console.log("TREE MATRIX:");
  console.log(treeMatrix);

  let visibleTrees = 0;
  // loop over the clean matrix and start solving
  for (let row = 1; row < treeMatrix.length - 1; row++) {
    for (let column = 1; column < treeMatrix[row].length - 1; column++) {

      let treeFound = false;

      // LOOKING UP
      if (treeMatrix[row - 1][column] < treeMatrix[row][column]) {
        if (row === 1) {
          // if the row above is the first row then it's visible
          if (treeFound === false) {
            visibleTrees++;
            treeFound = true;
          }
        } else if (row !== 1) {
          // otherwise we check to see if a tall tree is anywhere above it
          let columnCheckerUp = row;
          let foundTallerTreeUp = false;
          while (columnCheckerUp > 0) {
            if (
              treeMatrix[row - columnCheckerUp][column] >=
              treeMatrix[row][column]
            ) {
              foundTallerTreeUp = true;
            }
            columnCheckerUp--;
          }
          if (foundTallerTreeUp !== true) {
            if (treeFound === false) {
              visibleTrees++;
              treeFound = true;
            }
          }
        }
      }

      // LOOKING LEFT
      if (treeMatrix[row][column - 1] < treeMatrix[row][column]) {
        if (column === 1) {
          // if the row above is the first row then it's visible
          if (treeFound === false) {
            visibleTrees++;
            treeFound = true;
          }
        } else if (column !== 1) {
          // otherwise we check to see if a tall tree is anywhere above it
          let columnCheckerLeft = column;
          let foundTallerTreeLeft = false;
          while (columnCheckerLeft > 0) {
            if (
              treeMatrix[row][column - columnCheckerLeft] >=
              treeMatrix[row][column]
            ) {
              foundTallerTreeLeft = true;
            }
            columnCheckerLeft--;
          }
          if (foundTallerTreeLeft !== true) {
            if (treeFound === false) {
              visibleTrees++;
              treeFound = true;
            }
          }
        }
      }

      // LOOKING RIGHT
      if (treeMatrix[row][column + 1] < treeMatrix[row][column]) {
        if (column === treeMatrix[row].length - 2) {
          // if the row above is the first row then it's visible
          if (treeFound === false) {
            // console.log(`VISIBLE TREE:`, treeMatrix[row][column]);
            visibleTrees++;
            treeFound = true;
          }
        } else if (column !== treeMatrix[row].length - 2) {
          // otherwise we check to see if a tall tree is anywhere above it
          let columnCheckerRight = (treeMatrix[row].length - 1) - column;
          let foundTallerTreeRight = false;
          while (columnCheckerRight > 0) {
            if (
              treeMatrix[row][column + columnCheckerRight] >=
              treeMatrix[row][column]
            ) {
              foundTallerTreeRight = true;
            }
            columnCheckerRight--;
          }
          if (foundTallerTreeRight !== true) {
            if (treeFound === false) {
              visibleTrees++;
              treeFound = true;
            }
          }
        }
      }

      // LOOKING DOWN
      if (treeMatrix[row + 1][column] < treeMatrix[row][column]) {
        if (row === treeMatrix.length - 2) {
          // if this is the second last row, the tree below it exposes it
          if (treeFound === false) {
            visibleTrees++;
            treeFound = true;
          }
        } else if (row !== treeMatrix.length - 2) {
          // if it isn't check to see if a tree blocks it
          let columnCheckerDown = (treeMatrix.length - 1) - row;
          let foundTallerTreeDown = false;
          while (columnCheckerDown > 0) {
            if (
              treeMatrix[row + columnCheckerDown][column] >=
              treeMatrix[row][column]
            ) {
              foundTallerTreeDown = true;
            }
            columnCheckerDown--;
          }
          if (foundTallerTreeDown !== true) {
            if (treeFound === false) {
              visibleTrees++;
              treeFound = true;
            }
          }
        }
      }
      // end of conditionals
    }
  }
  const matrixHeight = treeMatrix.length * 2;
  const matrixWidth = treeMatrix[0].length * 2 - 4;
  console.log("VISIBLE TREES:", visibleTrees + matrixHeight + matrixWidth);
};

treeHousePlotter(input);
// 5, 5, 5, 3, 5
// [
//   [ 3,  0 ,  3 ,  7 , 3 ],
//   [ 2, (5), (5),  1 , 2 ],
//   [ 6, (5),  3 , (3), 2 ],
//   [ 3,  3 , (5),  4 , 9 ],
//   [ 3,  5 ,  3 ,  9 , 0 ]
// ]

// too high: 1774

/** Treetop Tree House Part 1!
 * INPUT: a grid of trees represented as a 2d matrix
 * + establish a counter
 * + loop through the input (just do it with two for loops to start)
 *   + see if you can start your count not on the outside or the first rows
 *     or columns
 *   + every time you find a bad tree, increment the counter
 * +
 * OUTPUT: the number of trees visible from outside the grid (we're
 *         trying to be sneaky!!)
 *
 * - 0 is the shortest, 9 is the tallest
 * - don't look diagonally
 * - all the trees on the outside are bad by default
 * - A tree is visible if all of the other trees between it and an
 *   edge of the grid are shorter than it.
 *
 * ISSUE: when looking in any direction, you need to check to see if
 *        the tree you're comparing against is an edge tree
 *        - if it is, just increment the counter if it's shorter
 *        - if it isn't you need to start a loop to check all trees
 *          above it
 */
