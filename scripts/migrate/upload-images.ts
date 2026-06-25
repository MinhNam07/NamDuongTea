import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import type { Payload } from "payload";

import type { MigrationReport } from "./report";
import { addEntry } from "./report";

async function fileChecksum(filePath: string): Promise<string> {
  const buffer = await readFile(filePath);
  return createHash("sha256").update(buffer).digest("hex");
}

export async function uploadLegacyImages(
  payload: Payload,
  report: MigrationReport,
  dryRun: boolean,
  imagePaths: string[],
): Promise<Map<string, number>> {
  const mediaByChecksum = new Map<string, number>();

  for (const relativePath of imagePaths) {
    const absolutePath = path.join(process.cwd(), "public", relativePath.replace(/^\//, ""));
    try {
      await stat(absolutePath);
    } catch {
      addEntry(report, {
        collection: "media",
        key: relativePath,
        status: "failed",
        message: "file not found",
      });
      report.missingImage += 1;
      continue;
    }

    const checksum = await fileChecksum(absolutePath);
    if (mediaByChecksum.has(checksum)) {
      addEntry(report, {
        collection: "media",
        key: relativePath,
        status: "skipped",
        message: "duplicate checksum",
      });
      report.duplicate += 1;
      continue;
    }

    if (dryRun) {
      addEntry(report, {
        collection: "media",
        key: relativePath,
        status: "dry-run",
      });
      continue;
    }

    const buffer = await readFile(absolutePath);
    const filename = path.basename(absolutePath);
    const created = await payload.create({
      collection: "media",
      data: {
        alt: filename,
      },
      file: {
        data: buffer,
        mimetype: filename.endsWith(".webp")
          ? "image/webp"
          : filename.endsWith(".png")
            ? "image/png"
            : "image/jpeg",
        name: filename,
        size: buffer.length,
      },
    });

    mediaByChecksum.set(checksum, Number(created.id));
    addEntry(report, {
      collection: "media",
      key: relativePath,
      status: "imported",
    });
  }

  return mediaByChecksum;
}
