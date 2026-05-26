import type { CollectionConfig } from "payload";

export const QuoteRequests: CollectionConfig = {
  slug: "quote-requests",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "company", "product", "quantity", "createdAt"],
    description: "Yêu cầu báo giá B2B (RFQ) từ khách hàng.",
  },
  access: {
    read: ({ req: { user } }) => !!user,
    create: () => true,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    { name: "name", type: "text", required: true, label: "Họ tên" },
    { name: "phone", type: "text", required: true, label: "Số điện thoại" },
    { name: "email", type: "email", label: "Email" },
    { name: "company", type: "text", label: "Công ty / Đơn vị" },
    {
      name: "product",
      type: "relationship",
      relationTo: "products",
      label: "Sản phẩm quan tâm",
    },
    {
      name: "quantity",
      type: "text",
      required: true,
      label: "Số lượng dự kiến",
      admin: { description: "Ví dụ: 500kg, 1 container 40ft" },
    },
    { name: "note", type: "textarea", label: "Ghi chú" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "Mới", value: "new" },
        { label: "Đang báo giá", value: "quoting" },
        { label: "Đã chốt", value: "won" },
        { label: "Hủy", value: "lost" },
      ],
    },
  ],
};
