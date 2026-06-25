export type MigrationReportEntry = {
  collection: string;
  key: string;
  status: "imported" | "skipped" | "failed" | "dry-run";
  message?: string;
};

export type MigrationReport = {
  startedAt: string;
  finishedAt?: string;
  dryRun: boolean;
  total: number;
  imported: number;
  skipped: number;
  failed: number;
  invalid: number;
  duplicate: number;
  missingImage: number;
  relationUnresolved: number;
  entries: MigrationReportEntry[];
};

export function createReport(dryRun: boolean): MigrationReport {
  return {
    startedAt: new Date().toISOString(),
    dryRun,
    total: 0,
    imported: 0,
    skipped: 0,
    failed: 0,
    invalid: 0,
    duplicate: 0,
    missingImage: 0,
    relationUnresolved: 0,
    entries: [],
  };
}

export function addEntry(
  report: MigrationReport,
  entry: MigrationReportEntry,
): void {
  report.entries.push(entry);
  report.total += 1;
  if (entry.status === "imported" || entry.status === "dry-run") {
    report.imported += 1;
  } else if (entry.status === "skipped") {
    report.skipped += 1;
  } else if (entry.status === "failed") {
    report.failed += 1;
  }
}

export function finalizeReport(report: MigrationReport): MigrationReport {
  report.finishedAt = new Date().toISOString();
  return report;
}

export function printReport(report: MigrationReport): void {
  console.log(JSON.stringify(finalizeReport(report), null, 2));
  console.log(
    `\nSummary: total=${report.total} imported=${report.imported} skipped=${report.skipped} failed=${report.failed} dryRun=${report.dryRun}`,
  );
}
