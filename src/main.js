import { getUsername } from "./utils/getUsername.js";
import { welcome } from "./utils/welcome.js";
import { startCLI } from "./utils/startCLI.js";
import { goodBye } from "./utils/goodBye.js";

export const main = async () => {
  const username = getUsername();
  welcome(username);
  await startCLI();
  goodBye(username);
};
