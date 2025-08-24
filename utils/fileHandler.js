import fs from "fs";
import path from "path";

export const readJSON = (file) => {
  const filePath = path.join(process.cwd(), "data", file);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

export const writeJSON = (file, data) => {
  const filePath = path.join(process.cwd(), "data", file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};
