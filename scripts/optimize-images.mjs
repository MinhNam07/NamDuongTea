#!/usr/bin/env node
/**
 * Convert public/images raster assets to WebP, archive originals outside public/.
 *
 * Usage:
 *   node scripts/optimize-images.mjs
 *   node scripts/optimize-images.mjs --dry-run
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const publicImages = path.join(root, "public/images");
const archiveRoot = path.join(root, "assets/image-originals");
const manifestPath = path.join(root, "scripts/image-manifest.json");

const dryRun = process.argv.includes("--dry-run");

const WEBP = { quality: 85, effort: 4 };
const MAX_HERO = 1920;
const MAX_GALLERY = 1600;

/** @type {Array<{ src: string; dest: string; maxWidth: number }>} */
const JOBS = [
  // bach-tra-shan-tuyet
  {
    src: "bach-tra-shan-tuyet/bach-tra-shan-tuyet.png",
    dest: "bach-tra-shan-tuyet/bo-am-tra.webp",
    maxWidth: MAX_HERO,
  },
  {
    src: "bach-tra-shan-tuyet/DSC_3139 copy 2.png",
    dest: "bach-tra-shan-tuyet/la-tra-kho.webp",
    maxWidth: MAX_GALLERY,
  },
  // hong-tra
  {
    src: "hong-tra/DSC_3117 copy 2.png",
    dest: "hong-tra/bo-am-tra.webp",
    maxWidth: MAX_HERO,
  },
  {
    src: "hong-tra/DSC_3134 copy 2.png",
    dest: "hong-tra/la-tra-kho.webp",
    maxWidth: MAX_GALLERY,
  },
  // tra-o-long
  {
    src: "tra-o-long/DSC_3126 copy 2.png",
    dest: "tra-o-long/bo-am-tra.webp",
    maxWidth: MAX_HERO,
  },
  {
    src: "tra-o-long/DSC_3132 copy 2.png",
    dest: "tra-o-long/la-tra-kho.webp",
    maxWidth: MAX_GALLERY,
  },
  // tra-dinh-ngoc
  {
    src: "tra-dinh-ngoc/DSC_3112 copy 2.png",
    dest: "tra-dinh-ngoc/bo-am-tra.webp",
    maxWidth: MAX_HERO,
  },
  {
    src: "tra-dinh-ngoc/DSC_3137 copy 2.png",
    dest: "tra-dinh-ngoc/la-tra-kho.webp",
    maxWidth: MAX_GALLERY,
  },
  // tet-gift-sets (same slug names, webp only)
  {
    src: "products/tet-gift-sets/nam-moc-tra-quan.png",
    dest: "products/tet-gift-sets/nam-moc-tra-quan.webp",
    maxWidth: MAX_GALLERY,
  },
  {
    src: "products/tet-gift-sets/nam-moc-tra-quan-2.png",
    dest: "products/tet-gift-sets/nam-moc-tra-quan-2.webp",
    maxWidth: MAX_GALLERY,
  },
  {
    src: "products/tet-gift-sets/nam-moc-tra-quan-hero.JPG",
    dest: "products/tet-gift-sets/nam-moc-tra-quan-hero.webp",
    maxWidth: MAX_HERO,
  },
  {
    src: "products/tet-gift-sets/son-moc-tra-quan.png",
    dest: "products/tet-gift-sets/son-moc-tra-quan.webp",
    maxWidth: MAX_GALLERY,
  },
  {
    src: "products/tet-gift-sets/son-moc-tra-quan-2.png",
    dest: "products/tet-gift-sets/son-moc-tra-quan-2.webp",
    maxWidth: MAX_GALLERY,
  },
  {
    src: "products/tet-gift-sets/thanh-nhien-tra-quan.png",
    dest: "products/tet-gift-sets/thanh-nhien-tra-quan.webp",
    maxWidth: MAX_GALLERY,
  },
  {
    src: "products/tet-gift-sets/thanh-nhien-tra-quan-2.png",
    dest: "products/tet-gift-sets/thanh-nhien-tra-quan-2.webp",
    maxWidth: MAX_GALLERY,
  },
  {
    src: "products/tet-gift-sets/bach-nhien-tra-quan.png",
    dest: "products/tet-gift-sets/bach-nhien-tra-quan.webp",
    maxWidth: MAX_GALLERY,
  },
  {
    src: "products/tet-gift-sets/bach-nhien-tra-quan-2.png",
    dest: "products/tet-gift-sets/bach-nhien-tra-quan-2.webp",
    maxWidth: MAX_GALLERY,
  },
  {
    src: "products/tet-gift-sets/van-lo-tra-quan.png",
    dest: "products/tet-gift-sets/van-lo-tra-quan.webp",
    maxWidth: MAX_GALLERY,
  },
  {
    src: "products/tet-gift-sets/van-lo-tra-quan-2.png",
    dest: "products/tet-gift-sets/van-lo-tra-quan-2.webp",
    maxWidth: MAX_GALLERY,
  },
  // marketing root
  { src: "hero.JPG", dest: "hero.webp", maxWidth: MAX_HERO },
  { src: "tea-hill-header.JPG", dest: "tea-hill-header.webp", maxWidth: MAX_HERO },
  { src: "tea-hill-footer.JPG", dest: "tea-hill-footer.webp", maxWidth: MAX_HERO },
  { src: "IMG_6478.JPG", dest: "che-tac-nen.webp", maxWidth: MAX_HERO },
  { src: "IMG_6547.JPG", dest: "cau-chuyen-1.webp", maxWidth: MAX_HERO },
  { src: "IMG_6548.JPG", dest: "cau-chuyen-2.webp", maxWidth: MAX_HERO },
  { src: "IMG_6559.JPG", dest: "cau-chuyen-3.webp", maxWidth: MAX_HERO },
  { src: "IMG_6570.JPG", dest: "cau-chuyen-4.webp", maxWidth: MAX_HERO },
  { src: "IMG_6437.png", dest: "cau-chuyen-5.webp", maxWidth: MAX_HERO },
  { src: "tra-quan-hero-bg.jpg", dest: "tra-quan-hero-bg.webp", maxWidth: MAX_HERO },
];

const TRA_QUAN_SOURCE_DIRS = [
  "Nam mộc trà quán",
  "Sơn mộc trà quán",
  "Thanh nhiên trà quán",
  "Bạch nhiên trà quán",
  "Vân Lộ trà quán",
];

function formatKb(bytes) {
  return `${Math.round(bytes / 1024)} KB`;
}

async function optimizeOne({ src, dest, maxWidth }) {
  const inputPath = path.join(publicImages, src);
  const outputPath = path.join(publicImages, dest);
  const archivePath = path.join(archiveRoot, src);

  if (!fs.existsSync(inputPath)) {
    console.warn(`⚠ Skip (missing): ${src}`);
    return null;
  }

  const publicUrl = `/images/${dest.replace(/\\/g, "/")}`;
  const oldPublicUrl = `/images/${src.replace(/\\/g, "/")}`;

  if (dryRun) {
    const stat = fs.statSync(inputPath);
    console.log(`[dry-run] ${src} (${formatKb(stat.size)}) → ${dest}`);
    return { from: oldPublicUrl, to: publicUrl, src, dest };
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.mkdirSync(path.dirname(archivePath), { recursive: true });

  const image = sharp(inputPath);
  const meta = await image.metadata();
  const width = meta.width ?? maxWidth;
  const pipeline =
    width > maxWidth
      ? image.resize({ width: maxWidth, withoutEnlargement: true })
      : image;

  await pipeline.webp(WEBP).toFile(outputPath);

  fs.renameSync(inputPath, archivePath);

  const inStat = fs.statSync(archivePath);
  const outStat = fs.statSync(outputPath);
  console.log(
    `✓ ${src} (${formatKb(inStat.size)}) → ${dest} (${formatKb(outStat.size)})`,
  );

  return { from: oldPublicUrl, to: publicUrl, src, dest };
}

function moveTraQuanSources() {
  const destBase = path.join(archiveRoot, "sources/tra-quan");
  for (const dirName of TRA_QUAN_SOURCE_DIRS) {
    const srcDir = path.join(publicImages, dirName);
    if (!fs.existsSync(srcDir)) continue;

    const destDir = path.join(destBase, dirName);
    if (dryRun) {
      console.log(`[dry-run] move folder ${dirName} → assets/image-originals/sources/tra-quan/`);
      continue;
    }

    fs.mkdirSync(destBase, { recursive: true });
    if (fs.existsSync(destDir)) {
      fs.rmSync(destDir, { recursive: true, force: true });
    }
    fs.renameSync(srcDir, destDir);
    console.log(`✓ archived source folder: ${dirName}`);
  }
}

async function main() {
  console.log(dryRun ? "Dry run — no files written\n" : "Optimizing images…\n");

  const manifest = [];
  for (const job of JOBS) {
    const entry = await optimizeOne(job);
    if (entry) manifest.push(entry);
  }

  moveTraQuanSources();

  if (!dryRun) {
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`\nManifest: ${path.relative(root, manifestPath)}`);
  }

  console.log(`\nDone. ${manifest.length} image(s) processed.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
