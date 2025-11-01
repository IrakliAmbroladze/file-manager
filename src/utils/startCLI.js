import { homedir } from "node:os";

export const startCLI = async () => {
  console.log("You are currently in", homedir(), "\n");
};
