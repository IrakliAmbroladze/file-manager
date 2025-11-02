import { access, constants } from "node:fs/promises";
import { resolve } from "node:path";
import fs from "node:fs";
export const copyFileWithStreamAPI = async (
  dir,
  sourcePath,
  destinationPath,
) => {
  if (!sourcePath || !destinationPath) {
    throw new Error("Please provide paths");
  }
  const source = resolve(dir, sourcePath);
  const destination = resolve(dir, destinationPath);

  try {
    await access(source, constants.R_OK);
  } catch {
    throw new Error("file does not exist");
  }

  try {
    await access(destination, constants.F_OK);
    throw new Error("file with the same name already exists");
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
  return new Promise((resolve, reject) => {
    const readableStream = fs.createReadStream(source, { encoding: "utf-8" });
    const writableStream = fs.createWriteStream(destination);

    readableStream.pipe(writableStream);

    writableStream.on("finish", () => {
      console.log("file copied successfully");
      resolve();
    });

    readableStream.on("error", (err) => {
      console.error("Error reading file: ", err);
      reject();
    });

    writableStream.on("error", (err) => {
      console.error("Error writing file: ", err);
      reject();
    });
  });
};
