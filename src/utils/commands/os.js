import os from "node:os";

export const printOSInfo = (args) => {
  const flag = args[0];

  switch (flag) {
    case "--EOL":
      console.log(JSON.stringify(os.EOL));
      break;

    case "--cpus":
      const cpus = os.cpus();
      console.log(`Total CPUs: ${cpus.length}`);
      console.table(
        cpus.map((cpu) => ({
          Model: cpu.model,
          "Clock rate (GHz)": (cpu.speed / 1000).toFixed(2),
        })),
      );
      break;

    case "--homedir":
      console.log(os.homedir());
      break;

    case "--username":
      console.log(os.userInfo().username);
      break;

    case "--architecture":
      console.log(os.arch());
      break;

    default:
      console.log(
        "Invalid input. Use one of flags: --EOL, --cpus, --homedir, --username, --architecture",
      );
  }
};
