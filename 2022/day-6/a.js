const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").toString();

const testSignal = `
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw
`;

const signalTuner = (inputData) => {
  const signal = inputData.trim();
  let counter = 0;
  for (let i = 0; i < signal.length; i++) {
    let uniqueObj = {};
    uniqueObj[signal[i]] = true;
    uniqueObj[signal[i + 1]] = true;
    uniqueObj[signal[i + 2]] = true;
    uniqueObj[signal[i + 3]] = true;

    const numOfKeys = Object.keys(uniqueObj).length;
    if (numOfKeys !== 4) {
      counter++;
    } else if (numOfKeys === 4) {
      counter += 4;
      break;
    }
  }
  return counter;
};

console.log(signalTuner(input));

/** Tuning Trouble Part 1!
 * INPUT: a string of random characters
 *
 * + establish an empty holder array
 * + loop through each character in the signal string
 *   + as you loop through it add a key to an object
 *   + count the keys, if they're 4, you're good
 *   + iterate a counter depending on success or failure
 *
 * OUTPUT: the amount of characters that need to be processed
 *         to find a set of 4 unique characters
 */
