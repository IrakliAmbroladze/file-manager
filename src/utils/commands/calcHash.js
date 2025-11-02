import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";

export const calculateHash = async (filePath) => {
  return new Promise((resolve, reject) => {
    const hash = createHash("sha256");
    const fileStream = createReadStream(filePath);

    fileStream.on("error", reject);
    hash.on("error", reject);

    fileStream.on("end", () => {
      const digest = hash.digest("hex");
      console.log(digest);
      resolve(digest);
    });

    fileStream.pipe(hash);
  });
};
