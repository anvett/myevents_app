import fs from "fs";
import path from "path";

export function getEventConfig(type, slug) {
  try {
    const filePath = path.join(
      process.cwd(),
      "src",
      "data",
      "events",
      type,
      slug,
      "eventConfig.json"
    );

    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    return null;
  }
}
