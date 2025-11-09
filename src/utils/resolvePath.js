import { resolve } from "node:path";
export const resolvePath = (directory, args) => {
  const target = args[0];
  if (args.length === 0 || target === "") {
    throw new Error("please provide argument");
  }
  return resolve(directory, target);
};
