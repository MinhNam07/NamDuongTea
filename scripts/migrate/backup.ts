import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export async function writeBackupSnapshot(
  label: string,
  data: unknown,
): Promise<string> {
  const dir = path.join(process.cwd(), "data", "backups");
  await mkdir(dir, { recursive: true });
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const filePath = path.join(dir, `${label}-${timestamp}.json`);
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
  return filePath;
}
