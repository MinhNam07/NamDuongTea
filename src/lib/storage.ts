import { s3Storage } from "@payloadcms/storage-s3";
import type { Plugin } from "payload";

export function isS3StorageEnabled(): boolean {
  return Boolean(
    process.env.S3_ENDPOINT &&
      process.env.S3_BUCKET &&
      process.env.S3_ACCESS_KEY_ID &&
      process.env.S3_SECRET_ACCESS_KEY,
  );
}

export function buildS3StoragePlugin(): Plugin | null {
  if (!isS3StorageEnabled()) return null;

  const endpoint = process.env.S3_ENDPOINT!;
  const bucket = process.env.S3_BUCKET!;
  const region = process.env.S3_REGION ?? "auto";

  return s3Storage({
    collections: {
      media: {
        prefix: "media",
        generateFileURL: ({ filename, prefix }) => {
          const publicBase = process.env.S3_PUBLIC_BASE_URL?.replace(/\/$/, "");
          if (publicBase) {
            return `${publicBase}/${prefix ? `${prefix}/` : ""}${filename}`;
          }
          return `${endpoint.replace(/\/$/, "")}/${bucket}/${prefix ? `${prefix}/` : ""}${filename}`;
        },
      },
    },
    bucket,
    config: {
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
      endpoint,
      region,
      forcePathStyle: true,
    },
  });
}
