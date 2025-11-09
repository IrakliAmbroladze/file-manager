import { open } from "node:fs/promises";

export const createEmptyFile = async (filename) => {
  const file = await open(filename, "wx");
  await file.close();
  console.log("A new file has been created");
};
