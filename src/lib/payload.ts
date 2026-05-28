import { getPayload, type Payload } from "payload";
import config from "@payload-config";

let cached: Promise<Payload> | null = null;

/**
 * Singleton wrapper quanh getPayload() — tránh khởi tạo Payload nhiều lần
 * trong cùng 1 process Next.js (đặc biệt với HMR ở dev mode).
 */
export async function getPayloadClient(): Promise<Payload> {
  if (!cached) {
    const p = getPayload({ config });
    // Nếu init thất bại (ví dụ DB chưa chạy), tránh unhandledRejection
    // và cho phép retry ở lần gọi sau.
    p.catch(() => {});
    cached = p.catch((err) => {
      cached = null;
      throw err;
    });
  }
  return cached;
}
