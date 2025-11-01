import { dirname } from "node:path";
import { homedir } from "node:os";

export const actionMap = {
  up: (directory) => {
    return directory === homedir() ? directory : dirname(directory);
  },
  cd: (directory) => {
    console.log("test");
    return directory === homedir() ? directory : dirname(directory);
  },
  ls: (directory) => {
    console.log("test");
    return directory === homedir() ? directory : dirname(directory);
  },
  cat: (directory) => {
    console.log("test");
    return directory === homedir() ? directory : dirname(directory);
  },
  add: (directory) => {
    console.log("test");
    return directory === homedir() ? directory : dirname(directory);
  },
  mkdir: (directory) => {
    console.log("test");
    return directory === homedir() ? directory : dirname(directory);
  },
  rn: (directory) => {
    console.log("test");
    return directory === homedir() ? directory : dirname(directory);
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
