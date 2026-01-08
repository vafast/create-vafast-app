#!/usr/bin/env node

import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import promptsPkg from "prompts";
const { prompt } = promptsPkg;
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const templatesDir = join(__dirname, "..", "templates");

const { targetDir } = await prompt({
  type: "text",
  name: "targetDir",
  message: "Project folder:",
  initial: "my-vafast-app"
});

const source = join(templatesDir, "node-vafast");
const dest = join(process.cwd(), targetDir);

function copyRecursive(srcDir, destDir) {
  mkdirSync(destDir, { recursive: true });
  for (const file of readdirSync(srcDir)) {
    const srcFile = join(srcDir, file);
    const destFile = join(destDir, file);
    if (statSync(srcFile).isDirectory()) {
      copyRecursive(srcFile, destFile);
    } else {
      copyFileSync(srcFile, destFile);
    }
  }
}

if (!existsSync(source)) {
  console.error("Template not found");
  process.exit(1);
}

copyRecursive(source, dest);

console.log(`\n✅ Vafast app created in '${targetDir}'\n`);

console.log(`✨ Next steps:`);
console.log(`  cd ${targetDir}`);
console.log(`  npm install`);
console.log(`  npm run dev`);

console.log(`\n🚀 Vafast - 高性能、类型安全的 TypeScript Web 框架`);
console.log(`⭐️ Star: https://github.com/vafast/vafast\n`);
