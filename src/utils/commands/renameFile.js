import { resolve } from "node:path";
import { rename, access } from "node:fs/promises";

export const renameFile = async (dir, oldFileName, newFileName) => {
  if (!(oldFileName && newFileName)) {
    throw new Error("please provide name");
  }
  const oldPath = resolve(dir, oldFileName);

  const newPath = resolve(dir, newFileName);
  try {
    await access(oldPath);
  } catch (e) {
    throw new Error("file does not exist");
  }
  try {
    await access(newPath);
    throw new Error("file with the same name already exists");
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }
  await rename(oldPath, newPath);
};
