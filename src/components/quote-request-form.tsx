"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const Schema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên."),
  phone: z.string().min(8, "Số điện thoại không hợp lệ."),
  email: z
    .string()
    .email("Email không hợp lệ.")
    .optional()
    .or(z.literal("")),
  company: z.string().optional(),
  quantity: z.string().min(1, "Vui lòng nhập số lượng dự kiến."),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof Schema>;

export function QuoteRequestForm({
  productSlug,
  productName,
  className,
  onSuccess,
}: {
  productSlug?: string;
  productName?: string;
  className?: string;
  onSuccess?: () => void;
}) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { name: "", phone: "", email: "", company: "", quantity: "", note: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/public/quote-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, productSlug }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Có lỗi xảy ra.");
      }
      setSuccess(true);
      reset();
      onSuccess?.();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Có lỗi xảy ra.");
    }
  };

  if (success) {
    return (
      <div className={cn("rounded-2xl border border-tea-green/20 bg-tea-green-50 p-6 text-center", className)}>
        <h3 className="font-display text-xl font-semibold text-tea-green">
          Đã nhận yêu cầu báo giá
        </h3>
        <p className="mt-2 text-sm text-tea-muted">
          Đội ngũ Nam Dương Tea sẽ liên hệ trong vòng 24h.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-4", className)}
      noValidate
    >
      {productName ? (
        <div className="rounded-xl bg-tea-green-50 px-4 py-2 text-sm">
          <span className="text-tea-muted">Sản phẩm: </span>
          <span className="font-medium text-tea-green-dark">{productName}</span>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Họ tên *" error={errors.name?.message}>
          <Input {...register("name")} placeholder="Nguyễn Văn A" />
        </Field>
        <Field label="Số điện thoại *" error={errors.phone?.message}>
          <Input {...register("phone")} type="tel" placeholder="0901 234 567" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <Input {...register("email")} type="email" placeholder="ban@congty.vn" />
        </Field>
        <Field label="Công ty / Đơn vị" error={errors.company?.message}>
          <Input {...register("company")} placeholder="Công ty TNHH ..." />
        </Field>
      </div>

      <Field label="Số lượng dự kiến *" error={errors.quantity?.message}>
        <Input {...register("quantity")} placeholder="VD: 500kg, 1 container 40ft" />
      </Field>

      <Field label="Ghi chú" error={errors.note?.message}>
        <Textarea
          {...register("note")}
          rows={4}
          placeholder="Yêu cầu đóng gói, thời gian giao hàng, thị trường..."
        />
      </Field>

      {serverError ? (
        <p className="text-sm text-destructive">{serverError}</p>
      ) : null}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Gửi yêu cầu báo giá
      </Button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
