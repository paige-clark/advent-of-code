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
        console.log("ls >", currentDirectory, fileStructure[currentDirectory]);
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
      console.log("SUBDIRECTORY:", subDirectory);
      // if (fileStructure[subDirectory].parent === directory) {
      //   subTotal += fileStructure[subDirectory].total;
      // }
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

  let returnTotal = 0;

  for (const directory in fileStructure) {
    if (
      fileStructure[directory].directories.length === 0 &&
      fileStructure[directory].total <= 100000
    ) {
      returnTotal += fileStructure[directory].total;
    } else if (
      fileStructure[directory].directories.length > 0 &&
      fileStructure[directory].total <= 100000
    ) {
      let totalizerResults = totalizer(directory);
      console.log("TOTALIZER RESULTS", totalizer(directory));
      if (totalizer(directory) <= 100000) {
        returnTotal += totalizer(directory);
      }
    }
  }
  return returnTotal;
};

console.log(spaceSaver(input));

/** No Space Left On Device Part 1!
 * INPUT: a list of commands like terminal
 * + need a var to track current directory (cd commands)
 * + need an object to build this whole thing out
 * + loop through all commands
 *   + have if statements to parse through inputs
 *   +
 * OUTPUT: the total combined size of all directories
 *         with at most 100000 in file size
 *
 * CASES:
 * > $ commands
 *   + cd = check to see if directory exists, if no
 *          then create the directory and set the current
 *          directory to whatever is defined after
 *   + ls = just print the current directory
 * > dir commands
 *   + create a directory under the current directory
 * > if the [0] is not 'dir' or '$'
 *   + create a file where you are with the size of [0]
 *     and the name of [1]
 * 1 150 960 is too low
 * 22 426 479 is too high
 * 1 413 674 is wrong
 */
