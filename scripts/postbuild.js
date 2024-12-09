import fs from "fs/promises";

const DIR = "content-scripts";
const TEMP_DIR = "_temp";

const main = async () => {
  // replace DIR with TEMP_DIR
  await fs.rm(DIR, { recursive: true });
  await fs.rename(TEMP_DIR, DIR);
};

main();