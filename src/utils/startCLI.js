import { homedir } from "node:os";
import { createInterface } from "node:readline/promises";

const COMPLITIONS =
  ".exit up cd ls cat add mkdir rn cp mv rm os hash compress decompress".split(
    " ",
  );
function completer(line) {
  const hits = COMPLITIONS.filter((c) => c.startsWith(line));
  return [hits.length ? hits : COMPLITIONS, line];
}

export const startCLI = async () => {
  console.log("You are currently in", homedir(), "\n");
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    completer,
  });
  rl.on("line", (line) => {
    if (line.trim() === ".exit") {
      rl.close();
    } else {
      console.log(`Received: ${line}`);
    }
  });

  return new Promise((resolve) => {
    rl.on("close", () => {
      resolve();
    });
  });
};
