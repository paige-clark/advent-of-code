const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").toString();

const elfStrategy = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const myStrategy = {
  rock: "X",
  paper: "Y",
  scissors: "Z",
};

const scoring = {
  lose: 0,
  draw: 3,
  win: 6,
  [myStrategy.rock]: 1,
  [myStrategy.paper]: 2,
  [myStrategy.scissors]: 3,
};

const scoreCalculator = (inputData) => {
  // cleaning up data
  const input = inputData.trim();
  const matches = input.split(/\n/);

  // score collector
  let scoreCollector = 0;

  for (const match of matches) {
    let currentMatch = match.split(" ");
    let elfPlay = currentMatch[0];
    let myPlay = currentMatch[1];

    if (
      // tie game
      (elfPlay === "A" && myPlay === myStrategy.rock) ||
      (elfPlay === "B" && myPlay === myStrategy.paper) ||
      (elfPlay === "C" && myPlay == myStrategy.scissors)
    ) {
      scoreCollector += scoring.draw;
      scoreCollector += scoring[myPlay];
    } else if (
      // win game
      (elfPlay === "A" && myPlay === myStrategy.paper) ||
      (elfPlay === "B" && myPlay === myStrategy.scissors) ||
      (elfPlay === "C" && myPlay == myStrategy.rock)
    ) {
      scoreCollector += scoring.win;
      scoreCollector += scoring[myPlay];
    } else if (
      // lose game
      (elfPlay === "A" && myPlay === myStrategy.scissors) ||
      (elfPlay === "B" && myPlay === myStrategy.rock) ||
      (elfPlay === "C" && myPlay == myStrategy.paper)
    ) {
      scoreCollector += scoring[myPlay];
    }

    console.log("ELF PLAY:", elfPlay);
    console.log(" MY PLAY:", myPlay);
    console.log("----");
  }
  return scoreCollector;
};

const testMatches = `
A Y
B X
C Z
`;

console.log("score should be 15:", scoreCalculator(input));

/*
 * Rock paper scissors!
 *
 * INPUT: A list of data showing what the elf will play and what I should play, if the
 *        elf isn't tricking me..
 * - first get the data structure looking the way you want it to
 * - establish score collector var
 * - loop through the data and collect the score for each round
 *  - maybe use a switch statement to compare all the cases?
 * OUTPUT: The score if everything goes according to my strategy guide
 */
