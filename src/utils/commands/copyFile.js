import { access, constants, stat } from "node:fs/promises";
import { resolve, basename } from "node:path";
import fs from "node:fs";
export const copyFileWithStreamAPI = async (
  dir,
  sourceFileName,
  destinationDir,
) => {
  if (!sourceFileName) {
    throw new Error("Please provide file name");
  }
  if (!destinationDir) {
    throw new Error("Please provide destination folder path");
  }

  const source = resolve(dir, sourceFileName);
  const destPath = resolve(dir, destinationDir);
  try {
    await access(source, constants.R_OK);
  } catch {
    throw new Error("file does not exist");
  }

  let destination;
  try {
    const statInfo = await stat(destPath);
    if (statInfo.isDirectory()) {
      destination = resolve(destPath, basename(source));
      console.log("dest is", destination);
    } else {
      destination = destPath;
    }
  } catch (err) {
    destination = destPath;
  }
  return new Promise((resolve, reject) => {
    const readableStream = fs.createReadStream(source);
    const writableStream = fs.createWriteStream(destination);

    readableStream.pipe(writableStream);

    writableStream.on("finish", () => {
      console.log("file copied successfully");
      resolve();
    });

    readableStream.on("error", (err) => {
      console.error("Error reading file: ", err);
      reject(err);
    });

    writableStream.on("error", (err) => {
      console.error("Error writing file: ", err);
      reject(err);
    });
  });
};
