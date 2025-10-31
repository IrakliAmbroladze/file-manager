import { parseArgs } from "node:util";
export const getUsername = () => {
  const options = {
    username: {
      type: "string",
      short: "u",
    },
  };
  console.log(parseArgs({ options }));
};
