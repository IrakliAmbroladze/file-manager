import { main } from "./main.js";

try {
  await main();
} catch (error) {
  console.log("main error");
  if (error instanceof Error) {
    console.log(error.message);
  } else {
    console.log("Uknown error: ", error);
  }
}
