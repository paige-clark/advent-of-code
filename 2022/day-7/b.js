const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").toString();

const testInput = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
`;

const spaceSaver = (inputData) => {
  const input = inputData.trim();
  const commands = input.split(/\n/);

  let currentDirectory = "";
  let fileStructure = {
    "/": { parent: "/", total: 0, files: [], directories: [] },
  };

  // loop through all the commands
  for (const command of commands) {
    const splitCommand = command.split(" ");

    //////// $ commands ////////
    if (splitCommand[0] === "$") {
      // cd cases
      if (splitCommand[1] === "cd") {
        if (splitCommand[2] !== "..") {
          // PROBLEM: this should go one level nested in current directory
          currentDirectory = `${splitCommand[2] + currentDirectory}`;
        } else {
          // '..' should change the current directory to the parent directory
          // of the currrent directory
          currentDirectory = fileStructure[currentDirectory].parent;
        }
      }
      // ls cases
      if (splitCommand[1] === "ls") {
        // console.log("ls >", currentDirectory, fileStructure[currentDirectory]);
      }
    }

    //////// dir commands ////////
    if (splitCommand[0] === "dir") {
      // create a directory with the current directory as a parent
      if (!fileStructure[`${splitCommand[1] + currentDirectory}`]) {
        fileStructure[`${splitCommand[1] + currentDirectory}`] = {
          parent: currentDirectory,
          total: 0,
          files: [],
          directories: [],
        };
        fileStructure[currentDirectory].directories.push(
          `${splitCommand[1] + currentDirectory}`
        );
      }
    }

    //////// file creation commands ////////
    if (splitCommand[0] !== "$" && splitCommand[0] !== "dir") {
      const fileSize = Number(splitCommand[0]);
      fileStructure[currentDirectory].total += fileSize;
      fileStructure[currentDirectory].files.push(splitCommand[1]);
    }
  }

  function totalizer(directory) {
    let subTotal = 0;
    for (const subDirectory of fileStructure[directory].directories) {
      // console.log("SUBDIRECTORY:", subDirectory);
      if (
        fileStructure[subDirectory].parent === directory &&
        fileStructure[subDirectory].directories.length > 0
      ) {
        subTotal += totalizer(subDirectory);
        subTotal += fileStructure[subDirectory].total;
      } else {
        subTotal += fileStructure[subDirectory].total;
      }
    }
    subTotal += fileStructure[directory].total;
    return subTotal;
  }

  const goodNumbers = [];

  let returnTotal = 0;
  // console.log(fileStructure);

  for (const directory in fileStructure) {
    console.log(directory,fileStructure[directory]);
    returnTotal += fileStructure[directory].total;
  }

  console.log("TOTAL USED SPACE:", returnTotal);
  const availableSpace = 70000000 - returnTotal;
  console.log("AVAILABLE SPACE", availableSpace);
  const optimalFileSize = 30000000 - availableSpace;
  console.log('OPTIMAL FILE', optimalFileSize);

  for (const directory in fileStructure) {
    if (
      fileStructure[directory].directories.length === 0 &&
      fileStructure[directory].total >= optimalFileSize
    ) {
      console.log('THIS IS ONE BIG DIER');
      goodNumbers.push(fileStructure[directory].total);
    } else if (
      fileStructure[directory].directories.length > 0
    ) {
      let totalizerResults = totalizer(directory);
      if (totalizer(directory) >= 10822529) {
        goodNumbers.push(totalizer(directory));
      }
    }
  }
  
  console.log(goodNumbers.sort((a, b) => a - b));

};

// apparently this is the right answer: 13210366 maybe my way of totalling is wrong?
// 40000000
// 39635977

console.log(spaceSaver(input));

// file space available out of 70000000: 19177471
// space currently taken up: 50822529

/** No Space Left On Device Part 2
 * the answer was 13210366 but I seriously don't understand how- my
 * array of numbers didn't even have it in it: [ 11186552, 12102995, 18944471, 24548466, 37372554, 73518309 ]
 */
