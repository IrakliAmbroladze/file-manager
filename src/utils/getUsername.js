import { parseArgs } from "node:util";
export const getUsername = () => {
  const options = {
    username: {
      type: "string",
      short: "u",
    },
  };
  const { values } = parseArgs({ options });
  return values.username ?? "Anonymous";
};
