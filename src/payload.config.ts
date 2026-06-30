import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Categories } from "@/collections/Categories";
import { Contacts } from "@/collections/Contacts";
import { Media } from "@/collections/Media";
import { Posts } from "@/collections/Posts";
import { ProductLines } from "@/collections/ProductLines";
import { Products } from "@/collections/Products";
import { QuoteRequests } from "@/collections/QuoteRequests";
import { Users } from "@/collections/Users";
import { HomePage } from "@/globals/HomePage";
import { SiteSettings } from "@/globals/SiteSettings";
import { getAllowedOrigins, getServerURL } from "@/lib/payload-urls";
import { buildS3StoragePlugin } from "@/lib/storage";
import { migrations } from "@/migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const serverURL = getServerURL();
const allowedOrigins = getAllowedOrigins();

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " · Nam Dương Tea Admin",
    },
    livePreview: {
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  collections: [
    Users,
    Media,
    Categories,
    ProductLines,
    Products,
    Posts,
    Contacts,
    QuoteRequests,
  ],
  globals: [SiteSettings, HomePage],
  plugins: [buildS3StoragePlugin()].filter(Boolean) as NonNullable<
    Parameters<typeof buildConfig>[0]["plugins"]
  >,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
    push: false,
    prodMigrations: migrations,
  }),
  sharp,
  graphQL: {
    schemaOutputFile: path.resolve(dirname, "../generated-schema.graphql"),
  },
  cors: allowedOrigins,
  csrf: allowedOrigins,
});
