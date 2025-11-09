import { unlink, access, constants } from "node:fs/promises";

export const deleteFile = async (filePath) => {
  try {
    await access(filePath, constants.R_OK);
  } catch (e) {
    throw new Error("file does not exist");
  }
  try {
    await unlink(filePath);
    console.log("File deleted");
  } catch (err) {
    throw new Error("Failed to delete file");
  }
};
