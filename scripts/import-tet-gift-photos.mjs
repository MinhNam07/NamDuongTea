#!/usr/bin/env node
/**
 * Copy product photos into public/images/products/tet-gift-sets/
 *
 * Usage:
 *   node scripts/import-tet-gift-photos.mjs
 *   node scripts/import-tet-gift-photos.mjs /path/to/photo-folder
 *
 * Source layouts:
 * 1. Flat files named by slug: nam-moc-tra-quan.png
 * 2. Subfolders by product name: "Nam mộc trà quán/DSC_....png"
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

/** Folder / filename keywords → slug (normalized, no diacritics) */
const NAME_TO_SLUG = [
  ["nam moc tra quan", "nam-moc-tra-quan"],
  ["son moc tra quan", "son-moc-tra-quan"],
  ["thanh nhien tra quan", "thanh-nhien-tra-quan"],
  ["bach nhien tra quan", "bach-nhien-tra-quan"],
  ["van lo tra quan", "van-lo-tra-quan"],
  ["van loi tra quan", "van-lo-tra-quan"],
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const defaultSrc = path.join(root, "public/images");
const srcDir = process.argv[2] ? path.resolve(process.argv[2]) : defaultSrc;
const destDir = path.join(root, "public/images/products/tet-gift-sets");

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".heic"]);
const SKIP_DIRS = new Set(["products", "tet-gift-sets"]);

function isImage(file) {
  return IMAGE_EXT.has(path.extname(file).toLowerCase());
}

function stripDiacritics(s) {
  return s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/đ/gi, "d");
}

function normalizeKey(s) {
  return stripDiacritics(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function slugFromName(name) {
  const key = normalizeKey(name);
  if (SLUGS.includes(key.replace(/\s+/g, "-"))) {
    return key.replace(/\s+/g, "-");
  }
  for (const [pattern, slug] of NAME_TO_SLUG) {
    if (key.includes(pattern) || pattern.includes(key)) return slug;
  }
  const compact = key.replace(/\s+/g, "");
  for (const slug of SLUGS) {
    const slugCompact = slug.replace(/-/g, "");
    if (compact.includes(slugCompact) || slugCompact.includes(compact)) {
      return slug;
    }
  }
  return null;
}

function collectImages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const images = [];
  const folders = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isFile() && isImage(entry.name)) {
      images.push({ file: full, label: entry.name });
    } else if (
      entry.isDirectory() &&
      !entry.name.startsWith(".") &&
      !SKIP_DIRS.has(entry.name.toLowerCase())
    ) {
      folders.push(full);
    }
  }

  if (folders.length > 0) {
    const fromFolders = [];
    for (const folder of folders.sort((a, b) => a.localeCompare(b, "vi"))) {
      const folderName = path.basename(folder);
      const slug = slugFromName(folderName);
      const folderImages = fs
        .readdirSync(folder)
        .filter(isImage)
        .sort((a, b) => a.localeCompare(b, "vi"))
        .map((f) => path.join(folder, f));
      if (folderImages.length === 0) continue;
      if (!slug) {
        console.warn(`⚠ Không map được thư mục: ${folderName}`);
        continue;
      }
      fromFolders.push({
        slug,
        primary: folderImages[0],
        extras: folderImages.slice(1),
        folderName,
      });
    }
    return { mode: "folders", items: fromFolders };
  }

  const flat = images
    .sort((a, b) => a.label.localeCompare(b.label, "vi"))
    .map(({ file, label }) => ({
      slug: slugFromName(label) ?? slugFromName(path.basename(file)),
      file,
      label,
    }));

  return { mode: "flat", items: flat };
}

if (!fs.existsSync(srcDir)) {
  console.error(`Source folder not found: ${srcDir}`);
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });
const collected = collectImages(srcDir);

if (collected.items.length === 0) {
  console.error(`No product images found in ${srcDir}`);
  process.exit(1);
}

let count = 0;

if (collected.mode === "folders") {
  for (const { slug, primary, extras, folderName } of collected.items) {
    const ext = path.extname(primary).toLowerCase();
    const outExt = ext === ".jpeg" ? ".jpg" : ext;
    const dest = path.join(destDir, `${slug}${outExt}`);
    fs.copyFileSync(primary, dest);
    console.log(`✓ ${folderName} → ${slug}${outExt} (${path.basename(primary)})`);
    count += 1;

    extras.forEach((extra, i) => {
      const extraExt = path.extname(extra).toLowerCase();
      const outExtraExt = extraExt === ".jpeg" ? ".jpg" : extraExt;
      const extraDest = path.join(destDir, `${slug}-${i + 2}${outExtraExt}`);
      fs.copyFileSync(extra, extraDest);
      console.log(`  + ${path.basename(extra)} → ${slug}-${i + 2}${outExtraExt}`);
      count += 1;
    });
  }
} else {
  let orderIndex = 0;
  for (const item of collected.items) {
    const slug = item.slug ?? SLUGS[orderIndex++];
    if (!item.slug) orderIndex += 1;
    const ext = path.extname(item.file).toLowerCase();
    const outExt = ext === ".jpeg" ? ".jpg" : ext;
    const dest = path.join(destDir, `${slug}${outExt}`);
    fs.copyFileSync(item.file, dest);
    console.log(`✓ ${item.label} → ${slug}${outExt}`);
    count += 1;
  }
}

console.log(`\nImported ${count} file(s) to ${destDir}`);
