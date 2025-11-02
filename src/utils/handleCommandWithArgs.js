import { actionMap } from "./actionMap.js";

export const handleCommandWithArgs = async (
  curDirectory,
  rl,
  command,
  args,
) => {
  if (command === ".exit") {
    rl.close();
    return;
  }
  try {
    return await actionMap[command]({ curDirectory, args });
  } catch (error) {
    console.log("\ninvalid input");
    return curDirectory;
  }
};
