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

const Schema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên."),
  phone: z.string().min(8, "Số điện thoại không hợp lệ."),
  email: z.string().email("Email không hợp lệ.").optional().or(z.literal("")),
  company: z.string().min(2, "Vui lòng nhập tên đơn vị."),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof Schema>;

export function AgentRegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { name: "", phone: "", email: "", company: "", message: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, type: "agent" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Có lỗi xảy ra.");
      }
      setSuccess(true);
      reset();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Có lỗi xảy ra.");
    }
  };

  if (success) {
    return (
      <div className="rounded-2xl border border-tea-green/20 bg-tea-green-50 p-6 text-center">
        <h3 className="font-display text-xl font-semibold text-tea-green">
          Cảm ơn bạn!
        </h3>
        <p className="mt-2 text-sm text-tea-muted">
          Đội ngũ Nam Dương Tea sẽ liên hệ trong vòng 24h.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Field label="Họ tên *" error={errors.name?.message}>
        <Input {...register("name")} placeholder="Nguyễn Văn A" />
      </Field>
      <Field label="Số điện thoại *" error={errors.phone?.message}>
        <Input {...register("phone")} type="tel" placeholder="0901 234 567" />
      </Field>
      <Field label="Email" error={errors.email?.message}>
        <Input {...register("email")} type="email" placeholder="ban@congty.vn" />
      </Field>
      <Field label="Công ty / Cửa hàng *" error={errors.company?.message}>
        <Input {...register("company")} placeholder="Công ty TNHH ..." />
      </Field>
      <Field label="Khu vực mong muốn phân phối" error={errors.message?.message}>
        <Textarea
          {...register("message")}
          rows={3}
          placeholder="VD: Hà Nội, miền Bắc..."
        />
      </Field>

      {serverError ? (
        <p className="text-sm text-destructive">{serverError}</p>
      ) : null}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Gửi đăng ký
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
