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
import { Products } from "@/collections/Products";
import { QuoteRequests } from "@/collections/QuoteRequests";
import { Users } from "@/collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " · Nam Dương Tea Admin",
    },
  },
  collections: [
    Users,
    Media,
    Categories,
    Products,
    Posts,
    Contacts,
    QuoteRequests,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  sharp,
  graphQL: {
    schemaOutputFile: path.resolve(dirname, "../generated-schema.graphql"),
  },
});
