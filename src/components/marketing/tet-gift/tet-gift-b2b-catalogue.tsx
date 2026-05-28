import Link from "next/link";

import { TetGiftProductImage } from "@/components/marketing/tet-gift/tet-gift-product-image";
import { Button } from "@/components/ui/button";
import {
  TET_GIFT_SETS,
  TRA_QUAN_COLLECTION_NAME,
  formatVnd,
} from "@/lib/tet-gift-sets";

/**
 * B2B catalogue section — clean table + product thumbs for wholesale buyers.
 */
export function TetGiftB2bCatalogue() {
  return (
    <section
      id="catalogue-b2b"
      className="scroll-mt-24 border-t border-tea-gold/15 bg-white py-16 md:py-24"
    >
      <div className="container mx-auto px-4 md:px-6">
        <header className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-tea-olive">
            Catalogue B2B
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-tea-deep-brown md:text-4xl">
            {TRA_QUAN_COLLECTION_NAME} — đặt hàng sỉ &amp; quà doanh nghiệp
          </h2>
          <p className="mt-4 text-tea-muted md:text-lg">
            Bảng giá tham khảo từ bảng sản phẩm nội bộ. Liên hệ để nhận chính
            sách chiết khấu theo số lượng, in ấn thiệp chúc và giao hàng toàn
            quốc.
          </p>
        </header>

        <div className="mt-10 overflow-x-auto rounded-sm border border-tea-gold/20">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-tea-gold/20 bg-tea-ivory">
                <th className="px-4 py-3 font-semibold text-tea-deep-brown">
                  Set quà
                </th>
                <th className="px-4 py-3 font-semibold text-tea-deep-brown">
                  Trà trong set
                </th>
                <th className="px-4 py-3 font-semibold text-tea-deep-brown">
                  Định lượng
                </th>
                <th className="px-4 py-3 font-semibold text-tea-deep-brown">
                  Giá bán
                </th>
                <th className="px-4 py-3 font-semibold text-tea-deep-brown" />
              </tr>
            </thead>
            <tbody>
              {TET_GIFT_SETS.map((set, i) => {
                const soldOut = set.stockNote?.toLowerCase() === "hết";
                return (
                  <tr
                    key={set.slug}
                    id={set.slug}
                    className={
                      i % 2 === 0
                        ? "border-b border-tea-gold/10 bg-white"
                        : "border-b border-tea-gold/10 bg-tea-ivory/40"
                    }
                  >
                    <td className="px-4 py-4 align-top">
                      <div className="flex items-start gap-3">
                        <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-sm border border-tea-gold/15 bg-black">
                          <TetGiftProductImage
                            slug={set.slug}
                            name={set.name}
                            className="absolute inset-0"
                            sizes="56px"
                            gallery={false}
                          />
                        </div>
                        <div>
                          <p className="font-display font-semibold text-tea-deep-brown">
                            {set.name}
                          </p>
                          <p className="mt-1 text-xs text-tea-muted line-clamp-2">
                            {set.tagline}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top text-tea-ink">
                      <ul className="space-y-1">
                        {set.teas.map((t) => (
                          <li key={t.name}>{t.name}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-4 align-top text-tea-muted">
                      <ul className="space-y-1">
                        {set.teas.map((t) => (
                          <li key={t.weight}>{t.weight}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-4 align-top font-display font-semibold text-tea-dark-green">
                      {formatVnd(set.priceVnd) ?? "—"}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <Button
                        asChild
                        size="sm"
                        variant={soldOut ? "outline" : "default"}
                        className={
                          soldOut
                            ? undefined
                            : "bg-tea-dark-green hover:bg-tea-moss"
                        }
                      >
                        <Link
                          href={`/lien-he?product=${set.slug}&campaign=tet-gift#rfq`}
                        >
                          Báo giá
                        </Link>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-sm border border-tea-gold/25 bg-tea-ivory px-6 py-5">
          <div>
            <p className="font-display text-lg font-semibold text-tea-deep-brown">
              Đăng ký đại lý &amp; đối tác phân phối
            </p>
            <p className="mt-1 text-sm text-tea-muted">
              Hỗ trợ POSM, mẫu thử, đào tạo pha chế — phản hồi trong 24h làm
              việc.
            </p>
          </div>
          <Button asChild className="bg-tea-deep-brown hover:bg-tea-dark-green">
            <Link href="/dang-ky-dai-ly">Đăng ký đại lý</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
