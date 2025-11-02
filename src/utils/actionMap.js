import { dirname, resolve } from "node:path";
import { homedir } from "node:os";
import { access, constants, readdir } from "node:fs/promises";
import { read } from "./commands/cat.js";
import { createEmptyFile } from "./commands/create.js";
import { resolvePath } from "./resolvePath.js";
import { customError } from "./customError.js";
import { createDirectory } from "./commands/createDirectory.js";
import { renameFile } from "./commands/renameFile.js";

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
      for (const file of files) console.log(file);
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
  cp: (directory) => {
    console.log("test");
    return directory === homedir() ? directory : dirname(directory);
  },
  mv: (directory) => {
    console.log("test");
    return directory === homedir() ? directory : dirname(directory);
  },
  rm: (directory) => {
    console.log("test");
    return directory === homedir() ? directory : dirname(directory);
  },
  os: (directory) => {
    console.log("test");
    return directory === homedir() ? directory : dirname(directory);
  },
  hash: (directory) => {
    console.log("test");
    return directory === homedir() ? directory : dirname(directory);
  },
  compress: (directory) => {
    console.log("test");
    return directory === homedir() ? directory : dirname(directory);
  },
  decompress: (directory) => {
    console.log("test");
    return directory === homedir() ? directory : dirname(directory);
  },
};
