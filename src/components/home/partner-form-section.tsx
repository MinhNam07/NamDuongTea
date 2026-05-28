"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Handshake, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WEBSITE_DATA } from "@/lib/website-data";
import { cn } from "@/lib/utils";

const Schema = z.object({
  companyName: z.string().min(2, "Vui lòng nhập tên doanh nghiệp."),
  email: z.string().email("Email không hợp lệ."),
});

type FormValues = z.infer<typeof Schema>;

export function PartnerFormSection() {
  const copy = WEBSITE_DATA.pages.home.partnerForm;
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(Schema),
    defaultValues: { companyName: "", email: "" },
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "agent",
          name: values.companyName,
          company: values.companyName,
          email: values.email,
          phone: "00000000",
          message: "Tư vấn hợp tác phân phối",
        }),
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

  return (
    <section className="relative flex min-h-[calc(100svh-6rem)] items-center justify-center overflow-hidden py-16 md:py-24">
      <BackgroundLayer />

      <div className="relative z-10 w-full px-4 md:px-6">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <div className="flex flex-col items-center">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-tea-yellow-green/90 shadow-sm backdrop-blur-md md:h-14 md:w-14">
              <Handshake className="h-6 w-6 md:h-7 md:w-7" aria-hidden />
            </div>

            <h2 className="text-balance font-display text-4xl font-light leading-[1.08] tracking-tight text-white md:text-6xl">
              Kiến tạo{" "}
              <span className="italic text-tea-yellow-green">
                thành công
              </span>{" "}
              cùng <span className="whitespace-nowrap">đối tác</span>
            </h2>

            <p className="mt-6 max-w-2xl text-pretty text-base font-light leading-relaxed text-white/80 md:text-xl">
              {copy.subtitle}
            </p>
          </div>

          <div className="mt-10 w-full max-w-2xl rounded-[32px] border border-white/15 bg-white/10 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-md md:mt-12 md:p-9">
            <h3 className="text-center font-display text-2xl font-light text-white">
              {copy.panelTitle}
            </h3>

            {success ? (
              <div
                className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-6 text-center text-white"
                role="status"
                aria-live="polite"
              >
                <p className="font-semibold">Đã nhận thông tin.</p>
                <p className="mt-1 text-sm text-white/80 md:text-base">
                  Đội ngũ Nam Dương Tea sẽ phản hồi trong vòng 24h.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 space-y-4"
                noValidate
                aria-describedby={serverError ? "partner-form-error" : undefined}
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field
                    label="Doanh nghiệp"
                    required
                    error={errors.companyName?.message}
                  >
                    <Input
                      {...register("companyName")}
                      placeholder={copy.fields.companyNamePlaceholder}
                      className="h-12 rounded-xl border-white/20 bg-white/5 px-4 text-white placeholder:text-white/55 focus-visible:ring-tea-yellow-green/40"
                    />
                  </Field>

                  <Field
                    label="Email"
                    required
                    error={errors.email?.message}
                  >
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder={copy.fields.emailPlaceholder}
                      className="h-12 rounded-xl border-white/20 bg-white/5 px-4 text-white placeholder:text-white/55 focus-visible:ring-tea-yellow-green/40"
                    />
                  </Field>
                </div>

                {serverError ? (
                  <p
                    id="partner-form-error"
                    className="text-sm text-white/90"
                    role="alert"
                    aria-live="polite"
                  >
                    {serverError}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  size="lg"
                  variant="accent"
                  className="mt-2 h-12 w-full rounded-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  {copy.submitLabel}
                </Button>

                <p className="text-center text-xs text-white/70 md:text-left">
                  Bấm gửi là bạn đồng ý để Nam Dương Tea liên hệ tư vấn.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function BackgroundLayer() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-tea-green-900 via-tea-dark-green to-tea-green-900" />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(820px 340px at 20% 20%, rgba(204,193,58,0.10), transparent 60%), radial-gradient(860px 380px at 78% 42%, rgba(255,255,255,0.08), transparent 62%), radial-gradient(620px 300px at 55% 90%, rgba(204,193,58,0.08), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-tea-dark-green/95 via-tea-dark-green/60 to-tea-dark-green/25" />
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold uppercase tracking-[0.14em] text-white/85">
        {label}
        {required ? <span className="ml-1 text-tea-yellow-green">*</span> : null}
      </Label>
      {children}
      {error ? <p className={cn("text-xs text-white/85")}>{error}</p> : null}
    </div>
  );
}

