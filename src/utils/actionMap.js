import { dirname, resolve, join } from "node:path";
import { homedir } from "node:os";
import { access, constants, readdir, stat } from "node:fs/promises";
import { read } from "./commands/cat.js";
import { createEmptyFile } from "./commands/create.js";
import { resolvePath } from "./resolvePath.js";
import { customError } from "./customError.js";
import { createDirectory } from "./commands/createDirectory.js";
import { renameFile } from "./commands/renameFile.js";
import { copyFileWithStreamAPI } from "./commands/copyFile.js";
import { deleteFile } from "./commands/deleteFile.js";
import { compressFile, decompressFile } from "./commands/zip.js";
import { calculateHash } from "./commands/calcHash.js";
import { printOSInfo } from "./commands/os.js";

export const actionMap = {
  up: ({ curDirectory }) => {
    return curDirectory === homedir() ? curDirectory : dirname(curDirectory);
  },
  cd: async ({ curDirectory, args }) => {
    const target = args[0];
    if (args.length === 0 || target === "") {
      console.log("Operation failed: please provide destination path");
      return curDirectory;
    }
    if (target === "/") return homedir();

    const resolved = resolve(curDirectory, target);
    try {
      await access(resolved, constants.R_OK | constants.W_OK);
    } catch (error) {
      console.log("\nOperation failed");
      return curDirectory;
    }
    return resolved;
  },
  ls: async ({ curDirectory }) => {
    try {
      const files = await readdir(curDirectory);
      const result = [];

      for (const file of files) {
        const filePath = join(curDirectory, file);
        const stats = await stat(filePath);

        result.push({
          Name: file,
          Type: stats.isDirectory() ? "directory" : "file",
        });
      }

      console.table(result);
    } catch (error) {
      customError(error);
    } finally {
      return curDirectory;
    }
  },
  cat: async ({ curDirectory, args }) => {
    try {
      const resolved = resolvePath(curDirectory, args);
      await access(resolved, constants.R_OK | constants.W_OK);
      await read(resolved);
    } catch (error) {
      customError(error);
    } finally {
      return curDirectory;
    }
  },
  add: async ({ curDirectory, args }) => {
    try {
      const resolved = resolvePath(curDirectory, args);
      await createEmptyFile(resolved);
    } catch (error) {
      customError(error);
    } finally {
      return curDirectory;
    }
  },
  mkdir: async ({ curDirectory, args }) => {
    try {
      const resolved = resolvePath(curDirectory, args);
      await createDirectory(resolved);
    } catch (error) {
      customError(error);
    } finally {
      return curDirectory;
    }
  },
  rn: async ({ curDirectory, args }) => {
    try {
      await renameFile(curDirectory, args[0], args[1]);
    } catch (error) {
      customError(error);
    } finally {
      return curDirectory;
    }
  },
  cp: async ({ curDirectory, args }) => {
    try {
      await copyFileWithStreamAPI(curDirectory, args[0], args[1]);
    } catch (error) {
      customError(error);
    } finally {
      return curDirectory;
    }
  },
  mv: async ({ curDirectory, args }) => {
    try {
      const copied = await actionMap.cp({ curDirectory, args });
      if (!copied) throw new Error("Copy failed. Move aborted.");
      await actionMap.rm({ curDirectory, args });
    } catch (error) {
      customError(error);
    } finally {
      return curDirectory;
    }
  },
  rm: async ({ curDirectory, args }) => {
    try {
      const resolved = resolvePath(curDirectory, args);
      await deleteFile(resolved);
    } catch (error) {
      customError(error);
    } finally {
      return curDirectory;
    }
  },
  hash: async ({ curDirectory, args }) => {
    try {
      const resolved = resolvePath(curDirectory, args);
      await calculateHash(resolved);
    } catch (error) {
      customError(error);
    } finally {
      return curDirectory;
    }
  },
  os: async ({ curDirectory, args }) => {
    try {
      printOSInfo(args);
    } catch (error) {
      customError(error);
    } finally {
      return curDirectory;
    }
  },
  compress: async ({ curDirectory, args }) => {
    try {
      if (args.length < 2) {
        throw new Error(
          "please provide both of path to source and destination",
        );
      }

      const source = resolve(curDirectory, args[0]);
      const destination = resolve(curDirectory, args[1] + ".br");
      await compressFile(source, destination);
    } catch (error) {
      customError(error);
    } finally {
      return curDirectory;
    }
  },
  decompress: async ({ curDirectory, args }) => {
    try {
      if (args.length < 2) {
        throw new Error(
          "please provide both of path to source and destination",
        );
      }

      const source = resolve(curDirectory, args[0]);
      const destination = resolve(curDirectory, args[1]);
      await decompressFile(source, destination);
    } catch (error) {
      customError(error);
    } finally {
      return curDirectory;
    }
  },
};
