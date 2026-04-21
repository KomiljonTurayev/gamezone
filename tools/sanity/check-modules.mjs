import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const www = path.join(root, "app", "src", "main", "assets", "www");
const scriptPath = path.join(www, "script.js");
const i18nPath = path.join(www, "translations.json");

const script = fs.readFileSync(scriptPath, "utf8");
const i18n = JSON.parse(fs.readFileSync(i18nPath, "utf8"));

const ids = Array.from(script.matchAll(/id:\s*"([a-z0-9-]+)"/g)).map((m) => m[1]);
if (ids.length !== 20) {
  throw new Error(`Expected 20 game modules, found ${ids.length}`);
}

const unique = new Set(ids);
if (unique.size !== 20) {
  throw new Error("Duplicate game ids detected");
}

for (const id of unique) {
  const fileMatch = new RegExp(`id:\\s*"${id}"[\\s\\S]*?file:\\s*"([^"]+)"`).exec(script);
  if (!fileMatch) {
    throw new Error(`Missing file mapping for ${id}`);
  }
  const full = path.join(www, fileMatch[1]);
  if (!fs.existsSync(full)) {
    throw new Error(`Missing module file: ${fileMatch[1]}`);
  }

  const item = i18n.games[id];
  if (!item) throw new Error(`Missing translation entry for ${id}`);
  ["title", "desc", "tag"].forEach((k) => {
    ["uz", "ru", "en"].forEach((lang) => {
      if (!item[k]?.[lang]) {
        throw new Error(`Missing ${k}.${lang} for ${id}`);
      }
    });
  });
}

console.log("Sanity OK: 20 modules + translations are valid.");

