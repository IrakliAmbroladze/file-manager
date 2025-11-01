import { homedir } from "node:os";
import { createInterface } from "node:readline/promises";
import { handleCommandWithArgs } from "./handleCommandWithArgs.js";
import { COMPLITIONS } from "./constants.js";

function completer(line) {
  const hits = COMPLITIONS.filter((c) => c.startsWith(line));
  return [hits.length ? hits : COMPLITIONS, line];
}

export const startCLI = async () => {
  let curDirectory = homedir();
  console.log("You are currently in", curDirectory, "\n");
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    completer,
  });
  rl.on("line", (line) => {
    const [command, ...args] = line.split(" ");
    curDirectory = handleCommandWithArgs(
      curDirectory,
      rl,
      command.trim(),
      args,
    );
    curDirectory && console.log("You are currently in", curDirectory, "\n");
  });

  return new Promise((resolve) => {
    rl.on("close", () => {
      resolve();
    });
  });
};
