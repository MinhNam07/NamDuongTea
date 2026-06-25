import type { CollectionConfig } from "payload";

import { adminOrSelf, hasRole, ROLES } from "@/access";
import { FIXED_ADMIN_COUNT } from "@/lib/admin-users";

/** Không cho tạo/xóa user qua CMS — chỉ 3 tài khoản cố định từ `pnpm seed:admins`. */
const lockUserMutation = () => false;

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "role"],
    description: `Chỉ ${FIXED_ADMIN_COUNT} tài khoản quản trị cố định. Không thể tạo hoặc xóa user qua giao diện admin.`,
  },
  auth: {
    cookies: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    },
  },
  access: {
    read: adminOrSelf,
    create: lockUserMutation,
    update: adminOrSelf,
    delete: lockUserMutation,
    admin: ({ req: { user } }) =>
      Boolean(user) &&
      hasRole(user, ROLES.ADMIN, ROLES.MANAGER, ROLES.EDITOR),
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Họ tên",
      saveToJWT: true,
    },
    {
      name: "role",
      type: "select",
      defaultValue: "editor",
      required: true,
      label: "Vai trò",
      saveToJWT: true,
      access: {
        update: ({ req: { user } }) => hasRole(user, ROLES.ADMIN),
      },
      options: [
        { label: "Quản trị viên", value: "admin" },
        { label: "Quản lý nội dung", value: "manager" },
        { label: "Biên tập viên", value: "editor" },
      ],
      admin: {
        description:
          "Admin: toàn quyền. Manager: CRUD/publish nội dung. Editor: tạo/sửa nháp, không publish.",
      },
    },
  ],
};
