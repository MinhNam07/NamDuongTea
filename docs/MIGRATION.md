# Content Migration Runbook

## Prerequisites

- PostgreSQL running (`pnpm db:up`)
- `DATABASE_URI` and `PAYLOAD_SECRET` set (see `.env.example`)
- Backup database snapshot before production import

## Commands

```bash
# Dry run (no writes)
pnpm migrate:content --dry-run

# Real import (idempotent upsert by slug)
pnpm migrate:content
```

## What gets migrated

| Source | Destination |
|---|---|
| `src/lib/product-lines.ts` | `product-lines` collection |
| Seed tea + trà quán products | `products` collection |
| Categories (3) | `categories` collection |
| `data/website-data.json` | `site-settings`, `home-page` globals |
| `src/lib/product-detail-tabs.ts` | `products.detailTabs` |

Legacy files are **not deleted**. Storefront keeps fallback via `CONTENT_SOURCE=legacy`.

## Reports

- JSON report printed to stdout
- Backup snapshot written to `data/backups/pre-migration-inventory-*.json`

## Rollback

1. Set `CONTENT_SOURCE=legacy` in environment
2. Redeploy (no code change required)
3. Restore PostgreSQL snapshot if schema/data must be reverted

## Parity checklist

- [ ] Product count matches seed inventory (5 tea + 5 trà quán)
- [ ] `/dong-tra/*` routes render
- [ ] `/san-pham/[slug]` routes render
- [ ] Admin can publish and storefront updates after revalidation
