import { homedir } from "node:os";
import { createInterface } from "node:readline/promises";

export const startCLI = async () => {
  console.log("You are currently in", homedir(), "\n");
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
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
