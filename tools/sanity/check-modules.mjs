import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const www = path.join(root, "app", "src", "main", "assets", "www");
const scriptPath = path.join(www, "script.js");

const script = fs.readFileSync(scriptPath, "utf8");

const ids = Array.from(script.matchAll(/id:\s*"([a-z0-9-]+)"/g)).map((m) => m[1]);
if (ids.length !== 23) {
  throw new Error(`Expected 23 game modules, found ${ids.length}`);
}

const unique = new Set(ids);
if (unique.size !== 23) {
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

  // Verify game translation entry exists in TRANSLATIONS_DATA in script.js
  const hasEntry = new RegExp(`"${id}":\\s*\\{`).test(script);
  if (!hasEntry) {
    throw new Error(`Missing TRANSLATIONS_DATA entry for ${id}`);
  }

  // Verify title/desc/tag keys are present for each language
  const sectionMatch = new RegExp(`"${id}":\\s*\\{([\\s\\S]*?)(?=\\n\\s{6}"[a-z]|\\n\\s{4}\\})`).exec(script);
  if (sectionMatch) {
    const section = sectionMatch[1];
    ["title", "desc", "tag"].forEach((k) => {
      if (!section.includes(`"${k}"`)) {
        throw new Error(`Missing "${k}" in TRANSLATIONS_DATA for ${id}`);
      }
    });
  }
}

console.log("Sanity OK: 23 modules + translations are valid.");
