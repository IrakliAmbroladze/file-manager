import { mkdir } from "node:fs/promises";

export const createDirectory = async (path) => {
  await mkdir(path, { recursive: true });
  console.log("A new folder has been created");
};
