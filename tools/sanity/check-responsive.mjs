import fs from "node:fs";
import path from "node:path";

const indexPath = path.join(process.cwd(), "app", "src", "main", "assets", "www", "index.html");
const html = fs.readFileSync(indexPath, "utf8");

const requiredMedia = [
  "@media(min-width:480px)",
  "@media(min-width:768px)",
  "@media(min-width:1024px)",
  "@media(min-width:1280px)",
  "@media(max-width:767px) and (orientation:landscape)"
];

for (const marker of requiredMedia) {
  if (!html.includes(marker)) {
    throw new Error(`Responsive rule missing: ${marker}`);
  }
}

const requiredIds = ["#hdr", "#main", "#grid", "#bnav", "#admob", "#gs", "#lp", "#ld"];
for (const id of requiredIds) {
  if (!html.includes(id)) {
    throw new Error(`Core layout selector missing: ${id}`);
  }
}

console.log("Sanity OK: responsive CSS + core layout selectors found.");

