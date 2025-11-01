import { actionMap } from "./actionMap.js";

export const handleCommandWithArgs = (curDirectory, rl, command, args) => {
  if (command === ".exit") {
    rl.close();
    return;
  }
  if (!Object.keys(actionMap).includes(command)) {
    console.log("invalid input");
    return curDirectory;
  }
  const action = actionMap[command];
  return action(curDirectory);
};
