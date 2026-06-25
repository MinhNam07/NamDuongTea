import type { Payload } from "payload";

import { PRODUCT_LINES } from "../../src/lib/product-lines";
import type { MigrationReport } from "./report";
import { addEntry } from "./report";

export async function migrateProductLines(
  payload: Payload,
  report: MigrationReport,
  dryRun: boolean,
): Promise<void> {
  for (const [index, line] of PRODUCT_LINES.entries()) {
    const existing = await payload.find({
      collection: "product-lines",
      where: { slug: { equals: line.slug } },
      limit: 1,
    });

    if (existing.docs[0]) {
      addEntry(report, {
        collection: "product-lines",
        key: line.slug,
        status: "skipped",
        message: "already exists",
      });
      report.duplicate += 1;
      continue;
    }

    if (dryRun) {
      addEntry(report, {
        collection: "product-lines",
        key: line.slug,
        status: "dry-run",
      });
      continue;
    }

    await payload.create({
      collection: "product-lines",
      data: {
        title: line.name,
        slug: line.slug,
        shortDescription: line.description,
        href: line.href,
        hasDetailPage: line.hasDetailPage,
        order: index,
        active: true,
        legacyImagePath: line.image,
        status: "published",
        _status: "published",
      },
    });

    addEntry(report, {
      collection: "product-lines",
      key: line.slug,
      status: "imported",
    });
  }
}
