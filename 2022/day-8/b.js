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

  let highestScenicScore = 0;
  let visibleTrees = 0;

  // loop over the clean matrix and start solving
  for (let row = 1; row < treeMatrix.length - 1; row++) {
    for (let column = 1; column < treeMatrix[row].length - 1; column++) {
      let treeFound = false;
      let thisTreeScore = 0;
      let thisTreeScoreObj = {
        up: 0,
        left: 0,
        right: 0,
        down: 0,
      };

      // LOOKING UP
      if (treeMatrix[row - 1][column] < treeMatrix[row][column]) {
        if (row === 1) {
          thisTreeScoreObj.up++;
        } else if (row !== 1) {
          let columnCheckerUp = 1;
          let maxCount = row;
          let foundTallerTreeUp = false;
          while (columnCheckerUp !== maxCount) {
            if (
              treeMatrix[row - columnCheckerUp][column] >=
              treeMatrix[row][column]
            ) {
              foundTallerTreeUp = true;
              thisTreeScoreObj.up = columnCheckerUp;
              maxCount = columnCheckerUp;
            } else {
              columnCheckerUp++;
            }
          }
          if (foundTallerTreeUp !== true) {
            thisTreeScoreObj.up = columnCheckerUp;
          }
        }
      } else if (treeMatrix[row - 1][column] >= treeMatrix[row][column]) {
        thisTreeScoreObj.up++;
      }

      // LOOKING LEFT
      if (treeMatrix[row][column - 1] < treeMatrix[row][column]) {
        if (column === 1) {
          thisTreeScoreObj.left++;
        } else if (column !== 1) {
          let columnCheckerLeft = 1;
          let maxCountLeft = column;
          let foundTallerTreeLeft = false;
          while (columnCheckerLeft !== maxCountLeft) {
            if (
              treeMatrix[row][column - columnCheckerLeft] >=
              treeMatrix[row][column]
            ) {
              foundTallerTreeLeft = true;
              thisTreeScoreObj.left = columnCheckerLeft;
              maxCountLeft = columnCheckerLeft;
            } else {
              columnCheckerLeft++;
            }
          }
          if (foundTallerTreeLeft !== true) {
            thisTreeScoreObj.left = columnCheckerLeft;
          }
        }
      } else if (treeMatrix[row][column - 1] >= treeMatrix[row][column]) {
        thisTreeScoreObj.left++;
      }

      // LOOKING RIGHT
      if (treeMatrix[row][column + 1] < treeMatrix[row][column]) {
        if (column === treeMatrix[row].length - 2) {
          thisTreeScoreObj.right++;
        } else if (column !== treeMatrix[row].length - 2) {
          let columnCheckerRight = 1;
          let maxCountRight = treeMatrix[row].length - 1 - column;
          let foundTallerTreeRight = false;
          while (columnCheckerRight !== maxCountRight) {
            if (
              treeMatrix[row][column + columnCheckerRight] >=
              treeMatrix[row][column]
            ) {
              foundTallerTreeRight = true;
              thisTreeScoreObj.right = columnCheckerRight;
              maxCountRight = columnCheckerRight;
            } else {
              columnCheckerRight++;
            }
          }
          if (foundTallerTreeRight !== true) {
            thisTreeScoreObj.right = columnCheckerRight;
          }
        }
      } else if (treeMatrix[row][column + 1] >= treeMatrix[row][column]) {
        thisTreeScoreObj.right++;
      }

      // LOOKING DOWN
      if (treeMatrix[row + 1][column] < treeMatrix[row][column]) {
        if (row === treeMatrix.length - 2) {
          thisTreeScoreObj.down++;
        } else if (row !== treeMatrix.length - 2) {
          let columnCheckerDown = 1;
          let maxCountDown = treeMatrix.length - 1 - row;
          let foundTallerTreeDown = false;
          while (columnCheckerDown !== maxCountDown) {
            if (
              treeMatrix[row + columnCheckerDown][column] >=
              treeMatrix[row][column]
            ) {
              foundTallerTreeDown = true;
              thisTreeScoreObj.down = columnCheckerDown;
              maxCountDown = columnCheckerDown;
            } else {
              columnCheckerDown++;
            }
          }
          if (foundTallerTreeDown !== true) {
            thisTreeScoreObj.down = columnCheckerDown;
          }
        }
      } else if (treeMatrix[row + 1][column] >= treeMatrix[row][column]) {
        thisTreeScoreObj.down++;
      }

      thisTreeScore =
        thisTreeScoreObj.up *
        thisTreeScoreObj.down *
        thisTreeScoreObj.left *
        thisTreeScoreObj.right;

      if (thisTreeScore > highestScenicScore) {
        highestScenicScore = thisTreeScore;
      }
      console.log(thisTreeScoreObj);
      // end of conditionals
    }
  }
  console.log(highestScenicScore);
};

treeHousePlotter(input);

/** Treetop Tree House Part 1!
 * INPUT: a grid of trees represented as a 2d matrix
 * + take the solution from part 1, but modify it so it calcs
 *   scenic score
 *    + this means modifying the part that casts out to count
 *      OUT from the current tree and add scenic score until
 *      you hit a tree of equal or higher height.
 * OUTPUT: the highest scenic score a tree can have
 */
