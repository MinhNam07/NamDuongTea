# Deployment Runbook — Nam Dương Tea

## Required environment variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URI` | Yes | Neon/PostgreSQL connection string |
| `PAYLOAD_SECRET` | Yes | Payload encryption secret (32+ chars) |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site URL for SEO/preview |
| `S3_ENDPOINT` | Production | Cloudflare R2 endpoint |
| `S3_BUCKET` | Production | R2 bucket name |
| `S3_ACCESS_KEY_ID` | Production | R2 access key |
| `S3_SECRET_ACCESS_KEY` | Production | R2 secret key |
| `S3_PUBLIC_BASE_URL` | Production | Public CDN URL for media |
| `REVALIDATION_SECRET` | Yes | Webhook secret for `/api/revalidate` |
| `CONTENT_SOURCE` | Optional | `payload` (default) or `legacy` rollback |

See [`.env.example`](../.env.example) for full list.

## Bootstrap admin user

1. Start app: `pnpm dev`
2. Open `/admin` and create first user (must be done when no users exist)
3. Set role to **Quản trị viên** (`admin`) in admin UI
4. Create manager/editor accounts as needed

## Deploy sequence

1. **Schema** — deploy app; Payload runs DB migrations on build/start
2. **Content** — `pnpm migrate:content --dry-run` then `pnpm migrate:content`
3. **Verify** — smoke test `/`, `/san-pham`, `/admin`, publish flow
4. **Cache** — confirm `/api/revalidate` works with `REVALIDATION_SECRET`

## Rollback

| Scenario | Action |
|---|---|
| Storefront broken, CMS OK | `CONTENT_SOURCE=legacy` + redeploy |
| Bad migration data | Restore DB snapshot + re-run dry-run |
| Media issues | Keep `legacyImagePath` fields; static `public/images` still served |

## Verification gate

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm migrate:content --dry-run
```

## On-demand revalidation

```bash
curl -X POST https://your-domain/api/revalidate \
  -H "Content-Type: application/json" \
  -H "x-revalidation-secret: $REVALIDATION_SECRET" \
  -d '{"collection":"products","slug":"tra-dinh-ngoc"}'
```

Payload hooks also call `revalidateTag` directly on publish/update.
