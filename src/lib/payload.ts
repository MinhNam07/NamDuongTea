import { getPayload, type Payload } from "payload";
import config from "@payload-config";

let cached: Promise<Payload> | null = null;

/**
 * Singleton wrapper quanh getPayload() — tránh khởi tạo Payload nhiều lần
 * trong cùng 1 process Next.js (đặc biệt với HMR ở dev mode).
 */
export async function getPayloadClient(): Promise<Payload> {
  if (!cached) {
    cached = getPayload({ config });
  }
  return cached;
}
