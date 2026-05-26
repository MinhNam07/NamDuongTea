#!/usr/bin/env node
/**
 * Copy product photos from Downloads into public/images/products/tet-gift-sets/
 *
 * Usage:
 *   node scripts/import-tet-gift-photos.mjs
 *   node scripts/import-tet-gift-photos.mjs /path/to/photo-folder
 *
 * Naming (preferred):
 *   nam-moc-tra-quan.jpg | .png | .webp
 * Or drop files in import order — script maps alphabetically to slugs below.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SLUGS = [
  "nam-moc-tra-quan",
  "son-moc-tra-quan",
  "thanh-nhien-tra-quan",
  "bach-nhien-tra-quan",
  "van-lo-tra-quan",
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const defaultSrc = path.join(
  process.env.HOME ?? "",
  "Downloads",
  "Set trà tết",
);
const srcDir = process.argv[2] ? path.resolve(process.argv[2]) : defaultSrc;
const destDir = path.join(
  root,
  "public/images/products/tet-gift-sets",
);

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic"]);

function isImage(file) {
  return IMAGE_EXT.has(path.extname(file).toLowerCase());
}

function slugFromName(filename) {
  const base = path.basename(filename, path.extname(filename)).toLowerCase();
  const hit = SLUGS.find((s) => base.includes(s.replace(/-/g, "")) || base === s);
  if (hit) return hit;
  for (const slug of SLUGS) {
    const key = slug.split("-").slice(0, 2).join("");
    if (base.replace(/[^a-z0-9]/g, "").includes(key)) return slug;
  }
  return null;
}

if (!fs.existsSync(srcDir)) {
  console.error(`Source folder not found: ${srcDir}`);
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });
const files = fs
  .readdirSync(srcDir)
  .filter((f) => isImage(f))
  .sort((a, b) => a.localeCompare(b, "vi"));

if (files.length === 0) {
  console.error(`No images in ${srcDir}`);
  process.exit(1);
}

const unmapped = [];
let orderIndex = 0;

for (const file of files) {
  const slug = slugFromName(file) ?? SLUGS[orderIndex];
  if (!slugFromName(file)) orderIndex += 1;
  const ext = path.extname(file).toLowerCase();
  const outName = `${slug}${ext === ".jpeg" ? ".jpg" : ext}`;
  const dest = path.join(destDir, outName);
  fs.copyFileSync(path.join(srcDir, file), dest);
  console.log(`✓ ${file} → ${outName}`);
}

console.log(`\nImported ${files.length} file(s) to ${destDir}`);
console.log(
  "Tip: rename files to slug (e.g. nam-moc-tra-quan.png) before re-running if order is wrong.",
);
