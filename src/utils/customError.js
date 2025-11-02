export const customError = (error) => {
  if (error instanceof Error) {
    console.log("Operation failed: ", error.message);
  } else {
    console.log("Uknown error: ", error);
  }
};
