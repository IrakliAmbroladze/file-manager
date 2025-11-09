import { createReadStream } from "node:fs";

export const read = async (filePath) => {
  return new Promise((resolve, reject) => {
    const readableStream = createReadStream(filePath, { encoding: "utf-8" });

    readableStream.pipe(process.stdout);

    readableStream.on("end", () => {
      process.stdout.write("\n");
      resolve();
    });
    readableStream.on("error", (err) => reject(err));
  });
};
