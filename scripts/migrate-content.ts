import { getPayload } from "payload";

import config from "../src/payload.config";
import { writeBackupSnapshot } from "./migrate/backup";
import { inventoryCounts } from "./migrate/inventory";
import { migrateCategories, migrateProducts } from "./migrate/map-products";
import { migrateProductLines } from "./migrate/map-product-lines";
import { migrateGlobals } from "./migrate/map-globals";
import { addEntry, createReport, printReport } from "./migrate/report";

async function main() {
  const dryRun =
    process.argv.includes("--dry-run") ||
    process.env.MIGRATION_DRY_RUN === "true";

  const report = createReport(dryRun);
  console.log(`Migration starting (dryRun=${dryRun})`);
  const inventory = inventoryCounts();
  console.log("Inventory:", inventory);

  const backupPath = await writeBackupSnapshot("pre-migration-inventory", {
    inventory,
    dryRun,
  });
  console.log(`Backup snapshot: ${backupPath}`);

  let payload;
  try {
    payload = await getPayload({ config });
  } catch {
    if (!dryRun) {
      console.error("[migrate:content] Database connection failed.");
      process.exit(1);
    }
    console.warn(
      "[migrate:content] Database unavailable — running inventory-only dry-run.",
    );
    for (const slug of ["tra-xanh", "tra-den", "nam-duong-tra-quan"]) {
      addEntry(report, {
        collection: "categories",
        key: slug,
        status: "dry-run",
        message: "inventory only (no DB)",
      });
    }
    printReport(report);
    process.exit(0);
  }

  const categoryIds = await migrateCategories(payload, report, dryRun);
  await migrateProductLines(payload, report, dryRun);
  await migrateProducts(payload, report, dryRun, categoryIds);
  await migrateGlobals(payload, report, dryRun);

  printReport(report);

  await payload.db.destroy();

  process.exit(report.failed > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
