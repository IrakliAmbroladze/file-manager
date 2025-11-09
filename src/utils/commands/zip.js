import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

const pipe = promisify(pipeline);

export const compressFile = async (source, destination) => {
  const brotli = createBrotliCompress();
  const input = createReadStream(source);
  const output = createWriteStream(destination);

  await pipe(input, brotli, output);

  console.log(`File compressed successfully: ${destination}`);
};

export const decompressFile = async (source, destination) => {
  const brotli = createBrotliDecompress();
  const input = createReadStream(source);
  const output = createWriteStream(destination);

  await pipe(input, brotli, output);

  console.log(`File decompressed successfully: ${destination}`);
};
