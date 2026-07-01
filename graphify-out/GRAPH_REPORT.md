# Graph Report - c:\Users\minhmice\Documents\projects\NamDuongTea  (2026-07-01)

## Corpus Check
- 128 files · ~5,077,418 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 242 nodes · 424 edges · 15 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## God Nodes (most connected - your core abstractions)
1. `getProductLineContentBySlug()` - 6 edges
2. `canonicalTeaLineSlug()` - 3 edges
3. `getProductLineBySlug()` - 3 edges
4. `loadCatalogProductsByCategorySlug()` - 3 edges
5. `canonicalCategoryForProductSlug()` - 3 edges
6. `pickCuratedCatalogProducts()` - 3 edges
7. `toSitemapEntry()` - 2 edges
8. `sitemap()` - 2 edges
9. `hasFullBleedHero()` - 2 edges
10. `FrontendMain()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Communities

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (0): 

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (0): 

### Community 2 - "Community 2"
Cohesion: 0.1
Nodes (5): categorySlugToProductTab(), loadCatalogProducts(), loadCatalogProductsByCategorySlug(), sitemap(), toSitemapEntry()

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (2): FrontendMain(), hasFullBleedHero()

### Community 4 - "Community 4"
Cohesion: 0.11
Nodes (0): 

### Community 5 - "Community 5"
Cohesion: 0.15
Nodes (8): canonicalDetailTabsSlug(), canonicalTeaLineSlug(), getCuratedTeaImages(), getProductDetailTabsForSlug(), getProductLineBySlug(), getProductLineContentBySlug(), isProductLineSlug(), toProductLine()

### Community 6 - "Community 6"
Cohesion: 0.14
Nodes (0): 

### Community 7 - "Community 7"
Cohesion: 0.2
Nodes (8): applyCanonicalProductCategory(), applyCanonicalProductName(), canonicalCategoryForProductSlug(), canonicalNameForProductSlug(), isOolongSlug(), pickCuratedCatalogProducts(), pickFirstProduct(), prepareCatalogProducts()

### Community 8 - "Community 8"
Cohesion: 0.2
Nodes (4): getCatalogProductsForTab(), getPostBySlug(), getPosts(), staticTeaProductsForTab()

### Community 9 - "Community 9"
Cohesion: 0.22
Nodes (0): 

### Community 10 - "Community 10"
Cohesion: 0.25
Nodes (0): 

### Community 11 - "Community 11"
Cohesion: 1.0
Nodes (0): 

### Community 12 - "Community 12"
Cohesion: 1.0
Nodes (0): 

### Community 13 - "Community 13"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Community 14"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **Thin community `Community 11`** (2 nodes): `slug.ts`, `slug.test.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 12`** (1 nodes): `next-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (1 nodes): `tailwind.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (1 nodes): `vitest.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `Community 6` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._