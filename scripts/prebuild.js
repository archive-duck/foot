import fs from "fs/promises";

const DIR = "content-scripts";
const GENERAL_SCRIPT = "content-scripts/general.ts";
const TEMP_DIR = "_temp";

const main = async () => {
  // copy DIR to temp TEMP_DIR
  await fs.cp(DIR, TEMP_DIR, { recursive: true });
  // get files list from DIR
  const files = await fs.readdir(DIR);
  // remove content in each file content from line "build_ignore: start" to line "build_ignore: end"
  for (const file of files) {
    const filePath = `${DIR}/${file}`;
    let content = await fs.readFile(filePath, "utf-8");
    const lines = content.split("\n");
    let ignore = false;
    let newContent = "";
    for (const line of lines) {
      if (line.includes("// build_ignore: start")) {
        ignore = true;
      }
      if (!ignore) {
        newContent += line + "\n";
      }
      if (line.includes("// build_ignore: end")) {
        ignore = false;
      }
    }
    await fs.writeFile(filePath, newContent);
  }
  // get general script content
  const generalScript = await fs.readFile(GENERAL_SCRIPT, "utf-8");
  // append general script content to each file
  for (const file of files) {
    const filePath = `${DIR}/${file}`;
    const content = await fs.readFile(filePath, "utf-8");
    await fs
      .writeFile(filePath, `${generalScript}\n\n${content}`)
      .then(() => console.log(`Injected ${GENERAL_SCRIPT} to ${file}`));
  }
  // remove GENERAL_SCRIPT
  await fs.rm(GENERAL_SCRIPT);
};

main();