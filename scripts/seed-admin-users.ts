import { getPayload } from "payload";

import config from "../src/payload.config";
import { FIXED_ADMIN_COUNT, getSeedAdminUsers } from "../src/lib/admin-users";

async function main() {
  const seedUsers = getSeedAdminUsers();
  const payload = await getPayload({ config });

  const existing = await payload.find({
    collection: "users",
    limit: FIXED_ADMIN_COUNT + 1,
    pagination: false,
    depth: 0,
  });

  if (existing.totalDocs > FIXED_ADMIN_COUNT) {
    console.error(
      `[seed:admins] Database có ${existing.totalDocs} user (tối đa ${FIXED_ADMIN_COUNT}). ` +
        "Xóa user thừa thủ công trước khi chạy lại.",
    );
    process.exit(1);
  }

  const existingByEmail = new Map(
    existing.docs.map((doc) => [doc.email.toLowerCase(), doc]),
  );

  let created = 0;
  let skipped = 0;
  let upgraded = 0;

  for (const seedUser of seedUsers) {
    const emailKey = seedUser.email.toLowerCase();
    const existingUser = existingByEmail.get(emailKey);
    if (existingUser) {
      if (existingUser.role !== "admin") {
        await payload.update({
          collection: "users",
          id: existingUser.id,
          data: { role: "admin" },
          overrideAccess: true,
        });
        console.log(`[seed:admins] Đã nâng quyền admin: ${seedUser.email}`);
        upgraded += 1;
      } else {
        console.log(`[seed:admins] Đã tồn tại: ${seedUser.email}`);
        skipped += 1;
      }
      continue;
    }

    await payload.create({
      collection: "users",
      data: {
        email: seedUser.email,
        password: seedUser.password,
        name: seedUser.name,
        role: "admin",
      },
      overrideAccess: true,
    });

    console.log(`[seed:admins] Đã tạo: ${seedUser.email}`);
    created += 1;
  }

  const finalCount = await payload.count({ collection: "users" });
  console.log(
    `[seed:admins] Xong — tạo mới: ${created}, nâng quyền: ${upgraded}, bỏ qua: ${skipped}, tổng: ${finalCount.totalDocs}/${FIXED_ADMIN_COUNT}`,
  );

  if (payload.db.destroy) {
    await payload.db.destroy();
  }

  if (finalCount.totalDocs !== FIXED_ADMIN_COUNT) {
    console.error(
      `[seed:admins] Cảnh báo: database có ${finalCount.totalDocs} user, mong đợi ${FIXED_ADMIN_COUNT}.`,
    );
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("[seed:admins]", error instanceof Error ? error.message : error);
  process.exit(1);
});
