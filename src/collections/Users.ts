import type { CollectionConfig } from "payload";

import { adminOnly, adminOrSelf, hasRole, ROLES } from "@/access";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "role"],
    description: "Tài khoản quản trị website.",
  },
  auth: true,
  access: {
    read: adminOrSelf,
    create: adminOnly,
    update: adminOrSelf,
    delete: adminOnly,
    admin: ({ req: { user } }) =>
      Boolean(user) &&
      hasRole(user, ROLES.ADMIN, ROLES.MANAGER, ROLES.EDITOR),
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Họ tên",
    },
    {
      name: "role",
      type: "select",
      defaultValue: "editor",
      required: true,
      label: "Vai trò",
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
