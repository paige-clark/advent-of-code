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
    
    // create 14 keys in uniqueObj
    uniqueObj[signal[i]] = true;
    uniqueObj[signal[i + 1]] = true;
    uniqueObj[signal[i + 2]] = true;
    uniqueObj[signal[i + 3]] = true;
    uniqueObj[signal[i + 4]] = true;
    uniqueObj[signal[i + 5]] = true;
    uniqueObj[signal[i + 6]] = true;
    uniqueObj[signal[i + 7]] = true;
    uniqueObj[signal[i + 8]] = true;
    uniqueObj[signal[i + 9]] = true;
    uniqueObj[signal[i + 10]] = true;
    uniqueObj[signal[i + 11]] = true;
    uniqueObj[signal[i + 12]] = true;
    uniqueObj[signal[i + 13]] = true;

    const numOfKeys = Object.keys(uniqueObj).length;
    if (numOfKeys !== 14) {
      counter++;
    } else if (numOfKeys === 14) {
      counter += 14;
      break;
    }
  }
  return counter;
};

console.log(signalTuner(input));

/** Tuning Trouble Part 2!
 * INPUT: a string of random characters
 *
 * + same as before but 14 not 4
 *
 * OUTPUT: the amount of characters that need to be processed
 *         to find a set of 4 unique characters
 */
