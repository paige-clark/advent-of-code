const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").toString();

const scoring = {
  lose: 0,
  draw: 3,
  win: 6,
  rock: 1,
  paper: 2,
  scissors: 3,
};

const moveDecider = (elfPlay, condition) => {
  if (condition === "draw") {
    if (elfPlay === "A") {
      return "rock";
    }
    if (elfPlay === "B") {
      return "paper";
    }
    if (elfPlay === "C") {
      return "scissors";
    }
  }
  if (condition === "win") {
    if (elfPlay === "A") {
      return "paper";
    }
    if (elfPlay === "B") {
      return "scissors";
    }
    if (elfPlay === "C") {
      return "rock";
    }
  }
  if (condition === "lose") {
    if (elfPlay === "A") {
      return "scissors";
    }
    if (elfPlay === "B") {
      return "rock";
    }
    if (elfPlay === "C") {
      return "paper";
    }
  }
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
      myPlay === "Y"
    ) {
      scoreCollector += scoring.draw;
      scoreCollector += scoring[moveDecider(elfPlay, "draw")];
    } else if (
      // win game
      myPlay == "Z"
    ) {
      scoreCollector += scoring.win;
      scoreCollector += scoring[moveDecider(elfPlay, "win")];
    } else if (
      // lose game
      myPlay === "X"
    ) {
      scoreCollector += scoring[moveDecider(elfPlay, "lose")];
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

console.log("score should be 12:", scoreCalculator(input));

/*
 * Rock paper scissors part 2!
 *
 * Alter it so that:
 * X means you lose
 * Y means to draw
 * Z means you win
 */
